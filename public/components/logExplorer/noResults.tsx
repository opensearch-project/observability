/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React from 'react';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import {
  EuiCallOut,
  EuiCode,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
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
                  defaultMessage="Try expand your time range"
                />
              </h2>

              <p>
                <FormattedMessage
                  id="discover.noResults.queryMayNotMatchTitle"
                  defaultMessage="One or more of the indices you&rsquo;re looking at contains a date field. Your query may
                    not match anything in the current time range, or there may not be any data at all in
                    the currently selected time range. You can try changing the time range to one which contains data."
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