import React from 'react';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
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