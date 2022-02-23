/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './docView.scss';
import { FlyoutContainers } from '../../common/flyout_containers';
import React, { useState } from 'react';
import { IDocType } from './docViewRow';
import { DocViewer } from './docViewer';
import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
} from '@elastic/eui';
import { uiSettingsService } from '../../../../common/utils';
import moment from 'moment';
import { IExplorerFields } from '../../../../common/types/explorer';
import { getHeaders, populateDataGrid } from '../utils';
import { DEFAULT_COLUMNS } from '../../../../common/constants/explorer';
import { HttpSetup } from '../../../../../../src/core/public';

type Props = {
  http: HttpSetup;
  detailsOpen: boolean;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doc: IDocType;
  timeStampField: string;
  memorizedTds: JSX.Element[];
  explorerFields: IExplorerFields;
  openTraces: boolean;
  setOpenTraces: React.Dispatch<React.SetStateAction<boolean>>;
  setSurroundingEventsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DocFlyout = ({
  http,
  detailsOpen,
  setDetailsOpen,
  doc,
  timeStampField,
  memorizedTds,
  explorerFields,
  openTraces,
  setOpenTraces,
  setSurroundingEventsOpen,
}: Props) => {
  const [toggleSize, setToggleSize] = useState(true);

  const closeFlyout = () => {
    setDetailsOpen(false);
    setOpenTraces(false);
  };

  const openSurroundingFlyout = () => {
    setSurroundingEventsOpen(true);
    closeFlyout();
  };

  const flyoutHeader = (
    <EuiFlyoutHeader hasBorder>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h2 id="eventsDocFyout">
              Time: {moment(doc[timeStampField]).format(uiSettingsService.get('dateFormat'))}
            </h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon
            className="events-flyout-resize"
            color="text"
            size="m"
            aria-label="Resize"
            title="Resize"
            iconType={toggleSize ? 'menuLeft' : 'menuRight'}
            aria-pressed={toggleSize}
            onClick={() => {
              setToggleSize((isOn) => !isOn);
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={openSurroundingFlyout} className="header-button">
            View surrounding events
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlyoutHeader>
  );

  const flyoutBody = (
    <EuiFlyoutBody>
      {populateDataGrid(
        explorerFields,
        getHeaders(explorerFields.queriedFields, DEFAULT_COLUMNS.slice(1), true),
        <tr className="osdDocTable__row">{memorizedTds}</tr>,
        getHeaders(explorerFields.selectedFields, DEFAULT_COLUMNS.slice(1), true),
        <tr className="osdDocTable__row">{memorizedTds}</tr>
      )}
      <DocViewer http={http} hit={doc} openTraces={openTraces} />
    </EuiFlyoutBody>
  );

  const flyoutFooter = <></>;

  return (
    <FlyoutContainers
      closeFlyout={closeFlyout}
      flyoutHeader={flyoutHeader}
      flyoutBody={flyoutBody}
      flyoutFooter={flyoutFooter}
      ariaLabel={'eventsDocFyout'}
      size={toggleSize ? 'm' : 'l'}
    ></FlyoutContainers>
  );
};
