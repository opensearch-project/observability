/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { EuiGlobalToastList, EuiLink } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';
import React, { ReactChild, useState } from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { CoreStart } from '../../../../../src/core/public';
import {
  CUSTOM_PANELS_API_PREFIX,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';
import { renderPageWithSidebar } from '../common/side_nav';
import { CustomPanelTable } from './custom_panel_table';
import { CustomPanelView } from './custom_panel_view';
import { isNameValid } from './helpers/utils';

/*
* "Home" module is initial page for Operantional Panels
* http: http core service;
* chrome: chrome core service;
* parentBreadcrumb: parent breadcrumb name and link
* pplService: ppl requestor service
* renderProps: Props from router 
*/

type Props = {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: { text: string; href: string }[];
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
};

export type CustomPanelListType = {
  name: string;
  id: string;
  dateCreated: string;
  dateModified: string;
};

export const Home = ({ http, chrome, parentBreadcrumb, pplService, renderProps }: Props) => {
  const [customPanelData, setcustomPanelData] = useState<Array<CustomPanelListType>>([]);
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [loading, setLoading] = useState(false);

  const setToast = (title: string, color = 'success', text?: ReactChild) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  // Fetches all saved Custom Panels
  const fetchCustomPanels = () => {
    return http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels`)
      .then((res) => setcustomPanelData(res.panels))
      .catch((err) => {
        console.error('Issue in fetching the operational panels', err.body.message);
      });
  };

  // Creates a new CustomPanel
  const createCustomPanel = (newCustomPanelName: string) => {
    if (!isNameValid(newCustomPanelName)) {
      setToast('Invalid Operational Panel name', 'danger');
      return;
    }

    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panel`, {
        body: JSON.stringify({
          name: newCustomPanelName,
        }),
      })
      .then(async (res) => {
        setToast(`Operational Panel "${newCustomPanelName}" successfully created!`);
        window.location.assign(`${_.last(parentBreadcrumb).href}${res}`);
      })
      .catch((err) => {
        setToast(
          'Please ask your administrator to enable Operational Panels for you.',
          'danger',
          <EuiLink href={CUSTOM_PANELS_DOCUMENTATION_URL} target="_blank">
            Documentation
          </EuiLink>
        );
        console.error(err);
      });
  };

  // Renames an existing CustomPanel
  const renameCustomPanel = (editedCustomPanelName: string, editedCustomPanelID: string) => {
    if (!isNameValid(editedCustomPanelName)) {
      setToast('Invalid Custom Panel name', 'danger');
      return;
    }
    const renamePanelObject = {
      name: editedCustomPanelName,
      panelId: editedCustomPanelID,
    };

    return http
      .put(`${CUSTOM_PANELS_API_PREFIX}/panel/rename`, {
        body: JSON.stringify(renamePanelObject),
      })
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          const newCustomPanelData = [...prevCustomPanelData];
          const renamedCustomPanel = newCustomPanelData.find(
            (customPanel) => customPanel.id === editedCustomPanelID
          );
          if (renamedCustomPanel) renamedCustomPanel.name = editedCustomPanelName;
          return newCustomPanelData;
        });
        setToast(`Operational Panel successfully renamed into "${editedCustomPanelName}"`);
      })
      .catch((err) => {
        setToast(
          'Error renaming Operational Panel, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  // Clones an existing Custom Panel, return new Custom Panel id
  const cloneCustomPanel = (
    clonedCustomPanelName: string,
    clonedCustomPanelID: string
  ): Promise<string> => {
    if (!isNameValid(clonedCustomPanelName)) {
      setToast('Invalid Operational Panel name', 'danger');
      return Promise.reject();
    }
    const clonePanelObject = {
      name: clonedCustomPanelName,
      panelId: clonedCustomPanelID,
    };

    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panel/clone`, {
        body: JSON.stringify(clonePanelObject),
      })
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          return [
            ...prevCustomPanelData,
            {
              name: clonedCustomPanelName,
              id: res.body.id,
              dateCreated: res.body.dateCreated,
              dateModified: res.body.dateModified,
            },
          ];
        });
        setToast(`Operational Panel "${clonedCustomPanelName}" successfully created!`);
        return res.body.id;
      })
      .catch((err) => {
        setToast(
          'Error cloning Operational Panel, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  // Deletes an existing Operational Panel
  const deleteCustomPanel = (customPanelId: string, customPanelName?: string, showToast = true) => {
    return http
      .delete(`${CUSTOM_PANELS_API_PREFIX}/panel/` + customPanelId)
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          return prevCustomPanelData.filter((customPanel) => customPanel.id !== customPanelId);
        });
        if (showToast) setToast(`Operational Panel "${customPanelName}" successfully deleted!`);
        return res;
      })
      .catch((err) => {
        setToast(
          'Error deleting Operational Panel, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        toastLifeTimeMs={6000}
      />
      <Route
        exact
        path={renderProps.match.path}
        render={(props) => {
          return renderPageWithSidebar(
            <CustomPanelTable
              loading={loading}
              fetchCustomPanels={fetchCustomPanels}
              customPanels={customPanelData}
              createCustomPanel={createCustomPanel}
              setBreadcrumbs={chrome.setBreadcrumbs}
              parentBreadcrumb={parentBreadcrumb}
              renameCustomPanel={renameCustomPanel}
              cloneCustomPanel={cloneCustomPanel}
              deleteCustomPanel={deleteCustomPanel}
              setToast={setToast}
            />,
            4
          );
        }}
      />
      <Route
        path={`${renderProps.match.path}/:id`}
        render={(props) => {
          return (
            <CustomPanelView
              panelId={props.match.params.id}
              http={http}
              pplService={pplService}
              chrome={chrome}
              parentBreadcrumb={parentBreadcrumb}
              renameCustomPanel={renameCustomPanel}
              deleteCustomPanel={deleteCustomPanel}
              setToast={setToast}
            />
          );
        }}
      />
    </div>
  );
};
