/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiAccordion, EuiText, EuiSpacer, EuiButton, EuiFormRow, EuiFlexItem, EuiBadge, EuiOverlayMask } from "@elastic/eui";
import { uiSettingsService } from "../../../../../common/utils";
import { Autocomplete } from "../../../common/search/autocomplete";
import DSLService from "public/services/requests/dsl";
import React, { useState } from "react";
import { AppAnalyticsComponentDeps } from "../../home";
import{ getClearModal } from "../helpers/modal_containers";

interface LogConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  setIsFlyoutVisible: any;
}

export const LogConfig = (props: LogConfigProps) => {
  const { dslService, query, setQuery, setIsFlyoutVisible } = props;
  const [logOpen, setLogOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask></EuiOverlayMask>);
  const tempQuery ='';

  const handleQueryChange = async (query: string) => setQuery(query);

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const onConfirm = () => {
    handleQueryChange('');
    closeModal();
  }

  const clearAllModal = () => {
    setModalLayout(
      getClearModal(
        onCancel, 
        onConfirm, 
        'Clear log source', 
        'Are you sure you would like to clear the log source?', 
        'Clear'
      )
    );
    showModal();
  };

  return (
    <div>
    <EuiAccordion
      id="logSource"
      buttonContent={
        <>
        <EuiText size="s">
        <h3>Log Source</h3>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
        Configure your application base query
        </EuiText>
        </>
      }
      extraAction={<EuiButton size="s" disabled={!logOpen || !query.length} onClick={clearAllModal}>Clear</EuiButton>}
      onToggle={(isOpen) => {setLogOpen(isOpen)}}
      paddingSize="l"
    >
      <EuiFormRow
      label="PPL Base Query"
      helpText="The default logs view in the application will be filtered by this query."
      >
        <EuiFlexItem grow={false} key="query-bar" className="query-area">
          <Autocomplete
            key={'autocomplete-bar'}
            query={query}
            tempQuery={tempQuery}
            handleQueryChange={handleQueryChange}
            handleQuerySearch={() => {}}
            dslService={dslService}
          />
          <EuiBadge 
            className={`ppl-link ${uiSettingsService.get('theme:darkMode') ? "ppl-link-dark" : "ppl-link-light"}`}
            color="hollow"
            onClick={() => showFlyout()}
            onClickAriaLabel={"pplLinkShowFlyout"}
          >
            PPL
          </EuiBadge>
        </EuiFlexItem>
      </EuiFormRow>
    </EuiAccordion>
    {isModalVisible && modalLayout}
    </div>
  );
}