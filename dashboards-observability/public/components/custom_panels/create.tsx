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
import React, { useEffect, useState } from 'react';
import "../../../public/components/application_analytics/app_analytics.scss"
import { ChromeBreadcrumb } from '../../../../../src/core/public';
import { last } from 'lodash';

  interface CreateCustomPanelProps {
    existingPanelId: string;
    parentBreadcrumb: ChromeBreadcrumb;
    setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
    createPanel: (name: string) => void;
    renamePanel: (name: string, id: string) => void
  }

  export const CreateCustomPanel = (props: CreateCustomPanelProps) => {
    const {
        existingPanelId,
        parentBreadcrumb,
        setBreadcrumbs,
        createPanel,
        renamePanel,
    } = props;

    const editMode = existingPanelId !== 'undefined';

    const [name, setName] = useState('');
    const isDisabled = !name;

    const onCreate = (name: string) => {
      createPanel(name);
      sessionStorage.setItem('PanelsName', '');
    }

    const onUpdate = (name: string, id: string) => {
      sessionStorage.setItem('PanelsName', '');
      window.location.assign(`${last(parentBreadcrumb)!.href}${id}`);
      console.log("name onUpdate: ", name);
      renamePanel(name, id);
    }

    const onCancel = () => {
      setName("");
      sessionStorage.setItem('PanelsName', '');
      console.log('parent breadcrumb',parentBreadcrumb!.href);
      // window.location.assign(`${parentBreadcrumb!.href}operational_panels/`);
      window.location.assign(`${last(parentBreadcrumb)!.href}`);

    };

    const updateName = (name: string) => {
      setName(name);
      sessionStorage.setItem("PanelsName", name);
    }

    const generateToolTipText = () => {
      if (!name) {
        return <p>{'Name is required.'}</p>;
      }
    };

    useEffect(() => {
      setBreadcrumbs([
        parentBreadcrumb,
        {
          text: 'Operational Panels',
          href: '#/operational_panels',
        },
        {
          text: editMode ? 'Edit' : 'Create',
          href: `#/operational_panels/${editMode ? 'edit' : 'create'}`,
        },
      ]);
    }, []);

    return (
      <div style={{ maxWidth: '1130px' }}>
        <EuiPage>
          <EuiPageBody component="div">
            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle data-test-subj="createPageTitle" size="l">
                    <h1>{editMode ? 'Edit' : 'Create'} Operational Panel</h1>
                </EuiTitle>
              </EuiPageHeaderSection>
            </EuiPageHeader>
            <EuiPageContent id="panelInfo">
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                  <EuiTitle size="m">
                    <h2>Panel information</h2>
                  </EuiTitle>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiHorizontalRule />
               <EuiForm component="form">
                <EuiFormRow label="Name" data-test-subj="nameFormRow">
                  <EuiFieldText
                    name="name"
                    value={name}
                    onChange={(e) => updateName(e.target.value)}
                  />
                </EuiFormRow>
              </EuiForm>
            </EuiPageContent>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem grow={false}>
                <EuiButton data-test-subj="cancelCreateButton" onClick={onCancel}>
                  Cancel
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiToolTip position="top" content={generateToolTipText()}>
                  <EuiButton
                    data-test-subj="createButton"
                    isDisabled={isDisabled}
                    onClick={editMode ? () => onUpdate(name, existingPanelId) : () => onCreate(name)}
                    fill={editMode ? true : false}
                  >
                    {editMode ? 'Save' : 'Create'}
                  </EuiButton>
                </EuiToolTip>
              </EuiFlexItem>
            </EuiFlexGroup>
            </EuiPageBody>
          </EuiPage>
      </div>
    );
  };