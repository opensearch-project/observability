/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiBreadcrumb, EuiGlobalToastList, EuiLink } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';
import React, { ReactChild, useState } from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import { CoreStart } from '../../../../../src/core/public';
import {
  CUSTOM_PANELS_API_PREFIX,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';
import {
  EVENT_ANALYTICS,
  OBSERVABILITY_BASE,
  SAVED_OBJECTS,
} from '../../../common/constants/shared';
import { CustomPanelListType } from '../../../common/types/custom_panels';
import { ObservabilitySideBar } from '../common/side_nav';
import { CustomPanelTable } from './custom_panel_table';
import { CustomPanelView } from './custom_panel_view';
import { isNameValid } from './helpers/utils';

/*
 * "Home" module is initial page for Operantional Panels
 *
 * Props taken in as params are:
 * http: http core service;
 * chrome: chrome core service;
 * parentBreadcrumb: parent breadcrumb name and link
 * pplService: ppl requestor service
 * renderProps: Props from router
 */

type Props = {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: EuiBreadcrumb[];
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
};

export const Home = ({ http, chrome, parentBreadcrumb, pplService, renderProps }: Props) => {
  const [customPanelData, setcustomPanelData] = useState<Array<CustomPanelListType>>([]);
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [loading, setLoading] = useState(false);
  const [toastRightSide, setToastRightSide] = useState<boolean>(true);

  const setToast = (title: string, color = 'success', text?: ReactChild, side?: string) => {
    if (!text) text = '';
    setToastRightSide(!side ? true : false);
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  // Fetches all saved Custom Panels
  const fetchCustomPanels = () => {
    setLoading(true);
    http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels`)
      .then((res) => {
        setcustomPanelData(res.panels);
      })
      .catch((err) => {
        console.error('Issue in fetching the operational panels', err.body.message);
      });
    setLoading(false);
  };

  // Creates a new CustomPanel
  const createCustomPanel = (newCustomPanelName: string) => {
    if (!isNameValid(newCustomPanelName)) {
      setToast('Invalid Operational Panel name', 'danger');
      return;
    }

    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panels`, {
        body: JSON.stringify({
          panelName: newCustomPanelName,
        }),
      })
      .then(async (res) => {
        setToast(`Operational Panel "${newCustomPanelName}" successfully created!`);
        window.location.assign(`${_.last(parentBreadcrumb).href}${res.newPanelId}`);
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
  const renameCustomPanel = (editedCustomPanelName: string, editedCustomPanelId: string) => {
    if (!isNameValid(editedCustomPanelName)) {
      setToast('Invalid Custom Panel name', 'danger');
      return;
    }
    const renamePanelObject = {
      panelId: editedCustomPanelId,
      panelName: editedCustomPanelName,
    };

    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panels/rename`, {
        body: JSON.stringify(renamePanelObject),
      })
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          const newCustomPanelData = [...prevCustomPanelData];
          const renamedCustomPanel = newCustomPanelData.find(
            (customPanel) => customPanel.id === editedCustomPanelId
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
    clonedCustomPanelId: string
  ): Promise<string> => {
    if (!isNameValid(clonedCustomPanelName)) {
      setToast('Invalid Operational Panel name', 'danger');
      return Promise.reject();
    }
    const clonePanelObject = {
      panelId: clonedCustomPanelId,
      panelName: clonedCustomPanelName,
    };

    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panels/clone`, {
        body: JSON.stringify(clonePanelObject),
      })
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          return [
            ...prevCustomPanelData,
            {
              name: clonedCustomPanelName,
              id: res.clonePanelId,
              dateCreated: res.dateCreated,
              dateModified: res.dateModified,
            },
          ];
        });
        setToast(`Operational Panel "${clonedCustomPanelName}" successfully created!`);
        return res.clonePanelId;
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
  const deleteCustomPanelList = (customPanelIdList: string[], toastMessage: string) => {
    const concatList = customPanelIdList.toString();
    return http
      .delete(`${CUSTOM_PANELS_API_PREFIX}/panelList/` + concatList)
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          return prevCustomPanelData.filter(
            (customPanel) => !customPanelIdList.includes(customPanel.id)
          );
        });
        setToast(toastMessage);
        return res;
      })
      .catch((err) => {
        setToast(
          'Error deleting Operational Panels, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  // Deletes an existing Operational Panel
  const deleteCustomPanel = (customPanelId: string, customPanelName: string) => {
    return http
      .delete(`${CUSTOM_PANELS_API_PREFIX}/panels/` + customPanelId)
      .then((res) => {
        setcustomPanelData((prevCustomPanelData) => {
          return prevCustomPanelData.filter((customPanel) => customPanel.id !== customPanelId);
        });
        setToast(`Operational Panel "${customPanelName}" successfully deleted!`);
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

  const addSamplePanels = async () => {
    try {
      setLoading(true);
      const flights = await http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_flights',
          },
        })
        .then((resp) => resp.total === 0);
      const logs = await http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_logs',
          },
        })
        .then((resp) => resp.total === 0);
      if (flights || logs) setToast('Adding sample data. This can take some time.');
      await Promise.all([
        flights ? http.post('../api/sample_data/flights') : Promise.resolve(),
        logs ? http.post('../api/sample_data/logs') : Promise.resolve(),
      ]);

      let savedVisualizationIds = [];
      await http
        .get(`${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/addSampleSavedObjects/panels`)
        .then((resp) => (savedVisualizationIds = [...resp.savedVizIds]));

      await http
        .post(`${CUSTOM_PANELS_API_PREFIX}/panels/addSamplePanels`, {
          body: JSON.stringify({
            savedVisualizationIds: savedVisualizationIds,
          }),
        })
        .then((res) => {
          setcustomPanelData([...customPanelData, ...res.demoPanelsData]);
        });
      setToast(`Sample panels successfully added.`);
    } catch (err) {
      setToast('Error adding sample panels.', 'danger');
      console.error(err.body.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        side={toastRightSide ? 'right' : 'left'}
        toastLifeTimeMs={6000}
      />
      <Route
        exact
        path={renderProps.match.path}
        render={(props) => {
          return (
            <ObservabilitySideBar>
              <CustomPanelTable
                loading={loading}
                fetchCustomPanels={fetchCustomPanels}
                customPanels={customPanelData}
                createCustomPanel={createCustomPanel}
                setBreadcrumbs={chrome.setBreadcrumbs}
                parentBreadcrumb={parentBreadcrumb}
                renameCustomPanel={renameCustomPanel}
                cloneCustomPanel={cloneCustomPanel}
                deleteCustomPanelList={deleteCustomPanelList}
                addSamplePanels={addSamplePanels}
              />
            </ObservabilitySideBar>
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
              cloneCustomPanel={cloneCustomPanel}
              deleteCustomPanel={deleteCustomPanel}
              setToast={setToast}
            />
          );
        }}
      />
    </div>
  );
};
