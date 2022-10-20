/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { EuiTitle, EuiSpacer, EuiFieldSearch, EuiAccordion } from '@elastic/eui';
import { I18nProvider } from '@osd/i18n/react';

interface ISidebarProps {
  // recentlyCreatedFields: any;
  // selectedFields: any;
  // availableFields: any;
}

export const Sidebar = (props: ISidebarProps) => {
  const [showFields, setShowFields] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <I18nProvider>
      <section className="sidebar-list">
        <EuiAccordion
          initialIsOpen
          id="recentlyCreatedMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Recently Created Fields</span>
            </EuiTitle>
          }
          paddingSize="xs"
        />
        <EuiSpacer size="s" />
        <EuiAccordion
          initialIsOpen
          id="selectedMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Selected Metrics</span>
            </EuiTitle>
          }
        /><EuiSpacer size="s" />
        <EuiAccordion
          initialIsOpen
          id="selectedMetricsSelector"
          buttonContent={
            <EuiTitle size="xxxs">
              <span>Available Metrics</span>
            </EuiTitle>
          }
        />
      </section>
    </I18nProvider>
  );
};
