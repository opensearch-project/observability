/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiSpacer,
  EuiTableFieldDataColumnType,
  EuiText,
} from '@elastic/eui';
import { ApplicationType } from 'common/types/app_analytics';
import React from 'react';

interface ConfigProps {
  application: ApplicationType;
}

export const Configuration = (props: ConfigProps) => {
  const { application } = props;
  return (
    <div>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection />
              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="s">
                  <EuiFlexItem>
                    <EuiButton fill onClick={() => {}}>
                      Edit application
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            <EuiFlexGroup direction="column">
              <EuiFlexItem>
                <EuiText>
                  <h4>Log source</h4>
                </EuiText>
                <EuiSpacer size="m" />
                <EuiText>{application.baseQuery}</EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText>
                  <h4>Services & Entities</h4>
                </EuiText>
                <EuiSpacer size="m" />
                {application.servicesEntities.join(', ')}
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText>
                  <h4>Trace groups</h4>
                </EuiText>
                <EuiSpacer size="m" />
                {application.traceGroups.join(', ')}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};
