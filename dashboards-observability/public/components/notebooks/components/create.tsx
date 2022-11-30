/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
    EuiButton,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiHorizontalRule,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiSpacer,
    EuiTitle,
    EuiToolTip,
  } from '@elastic/eui';
  import DSLService from 'public/services/requests/dsl';
  import React, { ReactChild, useEffect, useState } from 'react';
  import PPLService from 'public/services/requests/ppl';
  import { last } from 'lodash';
  import { AppAnalyticsComponentDeps } from '../home';
  import { PPLReferenceFlyout } from '../../../components/common/helpers';
  import {
    ApplicationRequestType,
  } from '../../../../common/types/application_analytics';
  import { fetchAppById } from '../helpers/utils';
  import "../../../../public/components/application_analytics/app_analytics.scss"
import { ChromeBreadcrumb } from '../../../../../../src/core/public';

  interface CreateNotebookProps {
    // dslService: DSLService;
    // pplService: PPLService;
    existingNotebookId: string;
    parentBreadcrumb: ChromeBreadcrumb;
    setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  }
  
  export const CreateNotebook = (props: CreateNotebookProps) => {
    const {
        existingNotebookId,
        parentBreadcrumb,
        setBreadcrumbs,
    } = props;
    // const {
    //   parentBreadcrumbs,
    //   chrome,
    //   http,
    //   query,
    //   name,
    //   description,
    //   pplService,
    //   createApp,
    //   updateApp,
    //   setToasts,
    //   setNameWithStorage,
    //   setDescriptionWithStorage,
    //   setQueryWithStorage,
    //   setFilters,
    //   clearStorage,
    //   existingAppId,
    // } = props;
    // const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    // const [selectedServices, setSelectedServices] = useState<OptionType[]>([]);
    // const [selectedTraces, setSelectedTraces] = useState<OptionType[]>([]);
  
    const editMode = existingNotebookId !== 'undefined';
    // const [existingApp, setExistingApp] = useState<ApplicationType>({
    //   id: existingAppId,
    //   dateCreated: '',
    //   dateModified: '',
    //   name: '',
    //   description: '',
    //   baseQuery: '',
    //   servicesEntities: [],
    //   traceGroups: [],
    //   panelId: '',
    //   availability: { name: '', color: '', availabilityVisId: '' },
    // });
  
    useEffect(() => {
      setBreadcrumbs([
        parentBreadcrumb,
        {
          text: 'Notebooks',
          href: '#/notebooks',
        },
        {
          text: editMode ? 'Edit' : 'Create',
          href: `#/notebooks/${editMode ? 'edit' : 'create'}`,
        },
      ]);
    }, []);
  
    // useEffect(() => {
    //   if (editMode && existingNotebookId) {
    //     fetchAppById(
    //       http,
    //       pplService,
    //       existingAppId,
    //       setExistingApp,
    //       setFilters,
    //       () => {},
    //       setToasts
    //     );
    //   }
    // }, [existingNotebookId]);
  
    // useEffect(() => {
    //   if (editMode) {
    //     setNameWithStorage(existingApp.name);
    //     setDescriptionWithStorage(existingApp.description);
    //     setQueryWithStorage(existingApp.baseQuery);
    //   }
    // }, [existingApp]);
  
    // const closeFlyout = () => {
    //   setIsFlyoutVisible(false);
    // };
  
    // let flyout;
    // if (isFlyoutVisible) {
    //   flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
    // }
  
    // const isDisabled = !name || (!query && !selectedTraces.length && !selectedServices.length);
  
    // const missingField = (needLog: boolean) => {
    //   let popoverContent = '';
    //   if (isDisabled || (needLog && !query)) {
    //     if (!name) {
    //       popoverContent = 'Name is required.';
    //     } else if (!query && !selectedServices.length && !selectedTraces.length) {
    //       popoverContent = 'Provide at least one log source, service, entity or trace group.';
    //     } else if (needLog && !query) {
    //       popoverContent = 'Log source is required to set availability.';
    //     }
    //     return <p>{popoverContent}</p>;
    //   }
    // };
  
    // const onCreate = (type: string) => {
    //   const appData = {
    //     name,
    //     description,
    //     baseQuery: query,
    //     servicesEntities: selectedServices.map((option) => option.label),
    //     traceGroups: selectedTraces.map((option) => option.label),
    //     panelId: '',
    //     availabilityVisId: '',
    //   };
    //   createApp(appData, type);
    // };
  
    // const onUpdate = () => {
    //   const appData = {
    //     name,
    //     description,
    //     servicesEntities: selectedServices.map((option) => option.label),
    //     traceGroups: selectedTraces.map((option) => option.label),
    //   };
    //   updateApp(existingAppId, appData, 'update');
    // };
  
    // const onCancel = () => {
    //   clearStorage();
    //   window.location.assign(`${last(parentBreadcrumbs)!.href}application_analytics`);
    // };
  
    return (
      <div style={{ maxWidth: '1130px' }}>
        <EuiPage /*style={{flexDirection: 'column'}}*/>
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle data-test-subj="createPageTitle" size="l">
                    <h1>{editMode ? 'Edit' : 'Create'} Notebook</h1>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            
            
            <EuiPageContent id="notebookInfo">
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                  <EuiTitle size="m">
                    <h2>Notebook information</h2>
                  </EuiTitle>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiHorizontalRule />
               <EuiForm component="form">
                <EuiFormRow label="Name" data-test-subj="nameFormRow">
                  <EuiFieldText
                    name="name"
                    value={"RANDOM FOR NOW"}
                    // onChange={(e) => setNameWithStorage(e.target.value)}
                  />
                </EuiFormRow>
              </EuiForm>
            </EuiPageContent>
            </EuiPageBody>
            {/* </div> */}
            {/* <EuiSpacer />
            <EuiPageContent id="composition">
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                  <EuiTitle size="m">
                    <h2>Composition</h2>
                  </EuiTitle>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiHorizontalRule />
              <LogConfig editMode={editMode} setIsFlyoutVisible={setIsFlyoutVisible} {...props} />
              <EuiHorizontalRule />
              <ServiceConfig
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                {...props}
              />
              <EuiHorizontalRule />
              <TraceConfig
                selectedTraces={selectedTraces}
                setSelectedTraces={setSelectedTraces}
                {...props}
              />
            </EuiPageContent>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiButton data-test-subj="cancelCreateButton" onClick={onCancel}>
                  Cancel
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiToolTip position="top" content={missingField(false)}>
                  <EuiButton
                    data-test-subj="createButton"
                    isDisabled={isDisabled}
                    onClick={editMode ? onUpdate : () => onCreate('create')}
                    fill={editMode ? true : false}
                  >
                    {editMode ? 'Save' : 'Create'}
                  </EuiButton>
                </EuiToolTip>
              </EuiFlexItem>
              {editMode || (
                <EuiFlexItem grow={false}>
                  <EuiToolTip position="top" content={missingField(true)}>
                    <EuiButton
                      data-test-subj="createAndSetButton"
                      fill
                      isDisabled={isDisabled || !query}
                      onClick={() => onCreate('createSetAvailability')}
                    >
                      Create and Set Availability
                    </EuiButton>
                  </EuiToolTip>
                </EuiFlexItem>
              )} */} 
            {/* </EuiFlexGroup>
          </EuiPageBody> */}
              </EuiPage>
      </div>
    );
  };
  