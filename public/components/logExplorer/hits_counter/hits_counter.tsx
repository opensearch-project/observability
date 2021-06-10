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
import { EuiButtonEmpty, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { i18n } from '@osd/i18n';
import { formatNumWithCommas } from '../../common/helpers';

export interface HitsCounterProps {
  /**
   * the number of query hits
   */
  hits: number;
  /**
   * displays the reset button
   */
  showResetButton: boolean;
  /**
   * resets the query
   */
  onResetQuery: () => void;
}

export function HitsCounter({ hits, showResetButton, onResetQuery }: HitsCounterProps) {
  return (
    <I18nProvider>
      <EuiFlexGroup
        gutterSize="s"
        className="dscResultCount"
        responsive={false}
        justifyContent="center"
        alignItems="center"
      >
        <EuiFlexItem grow={false}>
          <EuiText>
            <strong data-test-subj="discoverQueryHits">{formatNumWithCommas(hits)}</strong>{' '}
            <FormattedMessage
              id="discover.hitsPluralTitle"
              defaultMessage="{hits, plural, one {hit} other {hits}}"
              values={{
                hits,
              }}
            />
          </EuiText>
        </EuiFlexItem>
        {showResetButton && (
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              iconType="refresh"
              data-test-subj="resetSavedSearch"
              onClick={onResetQuery}
              size="s"
              aria-label={i18n.translate('discover.reloadSavedSearchButton', {
                defaultMessage: 'Reset search',
              })}
            >
              <FormattedMessage
                id="discover.reloadSavedSearchButton"
                defaultMessage="Reset search"
              />
            </EuiButtonEmpty>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </I18nProvider>
  );
}
