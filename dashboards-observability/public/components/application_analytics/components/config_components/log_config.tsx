/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiFormRow,
  EuiFlexItem,
  EuiBadge,
  EuiOverlayMask,
  EuiCallOut,
  EuiFlexGroup,
} from '@elastic/eui';
import DSLService from 'public/services/requests/dsl';
import React, { useState } from 'react';
import {
  getFullSuggestions,
  onItemSelect,
} from '../../../../../public/components/common/search/autocomplete_logic';
import { uiSettingsService } from '../../../../../common/utils';
import { Autocomplete } from '../../../common/search/autocomplete';
import { AppAnalyticsComponentDeps } from '../../home';
import { getClearModal } from '../../helpers/modal_containers';
import '../../app_analytics.scss';

interface LogConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  setIsFlyoutVisible: any;
  editMode: boolean;
}

export const LogConfig = (props: LogConfigProps) => {
  const { dslService, query, setQueryWithStorage, setIsFlyoutVisible, editMode } = props;
  const [logOpen, setLogOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask />);
  const [tempQuery, setTempQuery] = useState<string>('');

  const handleQueryChange = async (newQuery: string) => {
    setTempQuery(newQuery);
    setQueryWithStorage(newQuery);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onConfirm = () => {
    handleQueryChange('');
    closeModal();
  };

  const clearAllModal = () => {
    setModalLayout(
      getClearModal(
        onCancel,
        onConfirm,
        'Clear log source?',
        'This will clear all information in log source configuration.',
        'Clear'
      )
    );
    showModal();
  };

  const allowedCommands = [
    { label: 'dedup' },
    { label: 'eval' },
    { label: 'fields' },
    { label: 'parse' },
    { label: 'rename' },
    { label: 'sort' },
    { label: 'where' },
  ];

  return (
    <div>
      <EuiAccordion
        id="logSource"
        buttonContent={
          <>
            <EuiText size="s">
              <h3>Log source</h3>
            </EuiText>
            <EuiSpacer size="s" />
            <EuiText size="s" color="subdued">
              Configure your application base query
            </EuiText>
          </>
        }
        extraAction={
          <EuiButton
            size="s"
            disabled={!logOpen || !query.length || editMode}
            onClick={clearAllModal}
          >
            Clear
          </EuiButton>
        }
        onToggle={(isOpen) => {
          setLogOpen(isOpen);
        }}
        paddingSize="l"
      >
        <EuiFlexGroup direction="column" gutterSize="s">
          <EuiFlexItem>
            <EuiCallOut id="baseQueryCallout" iconType={'iInCircle'} size="s">
              You can&apos;t change the base query after the application is created.
            </EuiCallOut>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              label="Base Query"
              helpText="The default logs view in the application will be filtered by this query."
            >
              <EuiFlexItem grow={false} key="query-bar" className="query-area">
                <Autocomplete
                  key={'autocomplete-bar'}
                  query={query}
                  tempQuery={tempQuery}
                  baseQuery=""
                  handleQueryChange={handleQueryChange}
                  handleQuerySearch={() => {}}
                  dslService={dslService}
                  getSuggestions={getFullSuggestions}
                  onItemSelect={onItemSelect}
                  isDisabled={editMode}
                  tabId={'application-analytics-tab'}
                  possibleCommands={allowedCommands}
                />
                <EuiBadge
                  className={`ppl-link ${
                    uiSettingsService.get('theme:darkMode') ? 'ppl-link-dark' : 'ppl-link-light'
                  }`}
                  color="hollow"
                  onClick={() => showFlyout()}
                  onClickAriaLabel={'pplLinkShowFlyout'}
                >
                  PPL
                </EuiBadge>
              </EuiFlexItem>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiAccordion>
      {isModalVisible && modalLayout}
    </div>
  );
};
