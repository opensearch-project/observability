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
import "../../../../public/components/application_analytics/app_analytics.scss"
import { ChromeBreadcrumb } from '../../../../../../src/core/public';

  interface CreateNotebookProps {
    existingNotebookId: string;
    parentBreadcrumb: ChromeBreadcrumb;
    setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
    createNotebook: (name: string) => void;
    renameNotebook: (name: string, id: string) => void
    cloneNotebook: (name: string, id: string) => void
  }
  
  export const CreateNotebook = (props: CreateNotebookProps) => {
    const {
        existingNotebookId,
        parentBreadcrumb,
        setBreadcrumbs,
        createNotebook,
        renameNotebook,
        cloneNotebook,
    } = props;
  
    const editMode = existingNotebookId !== 'undefined';

    const [name, setName] = useState(sessionStorage.getItem('NotebooksName') || '');
    const isDisabled = !name;

    const onCreate = (name: string) => {
      createNotebook(name);
      sessionStorage.setItem('NotebooksName', '');
    }

    const onUpdate = (name: string, id: string) => {
      renameNotebook(name, id);
      sessionStorage.setItem('NotebooksName', '');
      window.location.assign(`${parentBreadcrumb!.href}notebooks/${id}`);
    }

    const onCancel = () => {
      setName("");
      sessionStorage.setItem('NotebooksName', '');
      window.location.assign(`${parentBreadcrumb!.href}notebooks`);
    };

    const updateName = (name: string) => {
      setName(name);
      sessionStorage.setItem("NotebooksName", name);
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
          text: 'Notebooks',
          href: '#/notebooks',
        },
        {
          text: editMode ? 'Edit' : 'Create',
          href: `#/notebooks/${editMode ? 'edit' : 'create'}`,
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
                    onClick={editMode ? () => onUpdate(name, existingNotebookId) : () => onCreate(name)}
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
  