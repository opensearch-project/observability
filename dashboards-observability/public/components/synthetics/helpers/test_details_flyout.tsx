/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    EuiButton,
    EuiComboBox,
    EuiComboBoxOptionOption,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFlyoutBody,
    EuiFlyoutFooter,
    EuiFlyoutHeader,
    EuiLink,
    EuiMarkdownFormat,
    EuiSpacer,
    EuiText,
    EuiTitle,
  } from '@elastic/eui';
  import { PPL_DOCUMENTATION_URL } from '../../../../common/constants/shared';
  import _ from 'lodash';
  import React, { useState } from 'react';
  import { FlyoutContainers } from '../../common/flyout_containers';
  import { Group1, Group2, Group3 } from '../../common/helpers/ppl_docs/groups';
  import { overview } from '../../common/helpers/ppl_docs/overview';
import { Plt } from '../../visualizations/plotly/plot';
import { CONTENT_SIZE_FIELD, DOWNLOAD_SPEED_FIELD, DOWNLOAD_TIME_FIELD, REDIRECT_TIMING_FIELD, STARTTRANSFER_TIMING_FIELD, TEST_SUITE_NAME_FIELD, TIMING_FIELDS, URL_FIELD } from '../../../../common/constants/synthetics';
  
  type Props = {
    testSuiteObject: Object | undefined;
    closeFlyout: () => void;
  };
  
  export const TestDetailsFlyout = ({ testSuiteObject, closeFlyout }: Props) => {
    
    // contains all the timing fields being shown
    const allTimingFields = () => {
      var retval = []
      retval = TIMING_FIELDS.slice()
      retval.push(DOWNLOAD_TIME_FIELD)
      retval.unshift('Content Download')
      return retval
    }

    // contains just the timing fields listed in TIMING_FIELDS
    const allTimingValues = () => {
      var retval = [];
      for (var i = 0; i < TIMING_FIELDS.length; i++) {
        retval.push(testSuiteObject[TIMING_FIELDS[i]]);
      }
      if (testSuiteObject[REDIRECT_TIMING_FIELD] == 0) {
        var redirIndex = TIMING_FIELDS.indexOf(REDIRECT_TIMING_FIELD);
        retval[redirIndex] = retval[redirIndex+1];
      }
      return retval;
    }

    // calculates every field's base and length to display
    const bases_values = () => {
      let bases = [];
      let values = [];
      let timingVals = allTimingValues();
      let downloadTime = testSuiteObject[DOWNLOAD_TIME_FIELD]
      let contentDownload = downloadTime - timingVals[0];
      // content download bar
      bases.push(timingVals[0])
      values.push(contentDownload)
      for (var i = 0; i < timingVals.length-1; i++) {
        // have it shown as ttfb
        if (TIMING_FIELDS[i] == STARTTRANSFER_TIMING_FIELD) {
          bases.push(timingVals[i+2])
        } else {
          bases.push(timingVals[i+1])
        }
        values.push(timingVals[i] - timingVals[i+1]);
      }
      // dns time bar
      bases.push(0)
      values.push(timingVals[timingVals.length-1]);

      // download time bar
      bases.push(0)
      values.push(downloadTime);
      return [bases, values];
    }

    // store values as to not recompute
    let timingFields = allTimingFields();
    let base_value = bases_values();
    let base = base_value[0];
    let value = base_value[1];
  
    const flyoutHeader = (
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>Test Details</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
    );
  
    const flyoutBody = (
      <EuiFlyoutBody>
          {testSuiteObject === undefined ? 'nothing' : 
            <>
              <EuiFlexItem>
                <EuiFlexItem>
                  Test-Suite: {testSuiteObject[TEST_SUITE_NAME_FIELD]}
                </EuiFlexItem>
                <EuiFlexItem>
                  URL: {testSuiteObject[URL_FIELD]}
                </EuiFlexItem>
              </EuiFlexItem>
              <EuiSpacer size="xl" />
              <EuiFlexGroup>
                <EuiFlexItem style={{ justifyContent: 'right' }}>
                  <Plt
                    // data stacks two traces together, the first one is invisible an acts 
                    // as a 'base' to give a gantt chart appearance
                    data={[{
                      // invisible base
                      y: timingFields,
                      x: base,
                      marker: {
                        color: 'rgba(1,1,1,0.0)'
                      },
                      hovertemplate: '<b>Start time:<b> %{x}',
                      type: 'bar',
                      orientation: 'h'
                    },{
                      // sizes
                      y: timingFields,
                      x: value,
                      hovertemplate: '<b>Duration:<b> %{x}',
                      type: 'bar',
                      orientation: 'h'
                    }]}
                    layout={{
                      title: 'Request/Response timings',
                      margin: {
                        l: 150,
                      },
                    }}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
              <EuiFlexItem>
                <EuiFlexItem>
                  Content Size KB: {testSuiteObject[CONTENT_SIZE_FIELD]}
                </EuiFlexItem>
                <EuiFlexItem>
                  Download Speed bytes/sec: {testSuiteObject[DOWNLOAD_SPEED_FIELD]}
                </EuiFlexItem>
                <EuiFlexItem>
                  Primary IP: {testSuiteObject['primaryIP']}
                </EuiFlexItem>
              </EuiFlexItem>
            </>
          }
      </EuiFlyoutBody>
    );
  
    const flyoutFooter = (
      <EuiFlyoutFooter>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButton onClick={closeFlyout}>Close</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    );
  
    return (
      <FlyoutContainers
        closeFlyout={closeFlyout}
        flyoutHeader={flyoutHeader}
        flyoutBody={flyoutBody}
        flyoutFooter={flyoutFooter}
        ariaLabel="testDetailsFlyout"
      />
    );
  };
  