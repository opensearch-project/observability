/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

export const NoResults = () => {
  return (
    <I18nProvider>
      <>
        <EuiSpacer size="xl" />

        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false} className="dscNoResults">
            <EuiCallOut
              title={
                <FormattedMessage
                  id="discover.noResults.searchExamples.noResultsMatchSearchCriteriaTitle"
                  defaultMessage="No results match your search criteria"
                />
              }
              color="warning"
              iconType="help"
              data-test-subj="discoverNoResults"
            />
            <>
            <EuiSpacer size="xl" />
            <EuiText>
              <h2 data-test-subj="discoverNoResultsTimefilter">
                <FormattedMessage
                  id="discover.noResults.expandYourTimeRangeTitle"
                  defaultMessage="Expand your time range or modify your query"
                />
              </h2>
              <p>
                <FormattedMessage
                  id="discover.noResults.queryMayNotMatchTitle"
                  defaultMessage="Your query may not match anything in the current time range, or there may not be any data at all in
                    the currently selected time range. Try change time range, query filters or choose different time fields"
                />
              </p>
            </EuiText>
            </>
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    </I18nProvider>
  );
};