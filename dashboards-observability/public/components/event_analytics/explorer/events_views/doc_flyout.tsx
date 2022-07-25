/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './docView.scss';
import React from 'react';
import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiTitle,
  EuiToolTip,
} from '@elastic/eui';
import moment from 'moment';
import { FlyoutContainers } from '../../../common/flyout_containers';
import { IDocType } from './docViewRow';
import { DocViewer } from './docViewer';
import { uiSettingsService } from '../../../../../common/utils';
import { IExplorerFields } from '../../../../../common/types/explorer';
import { getHeaders, populateDataGrid } from '../../utils';
import { DEFAULT_COLUMNS } from '../../../../../common/constants/explorer';
import { HttpSetup } from '../../../../../../../src/core/public';
import { PPL_STATS_REGEX } from '../../../../../common/constants/shared';

interface Props {
  http: HttpSetup;
  detailsOpen: boolean;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doc: IDocType;
  timeStampField: string;
  memorizedTds: JSX.Element[];
  explorerFields: IExplorerFields;
  openTraces: boolean;
  rawQuery: string;
  toggleSize: boolean;
  backButtonExists: boolean;
  onBackButtonClick: () => any;
  setToggleSize: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTraces: React.Dispatch<React.SetStateAction<boolean>>;
  setSurroundingEventsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DocFlyout = ({
  http,
  detailsOpen,
  setDetailsOpen,
  doc,
  timeStampField,
  memorizedTds,
  explorerFields,
  openTraces,
  rawQuery,
  toggleSize,
  backButtonExists,
  onBackButtonClick,
  setToggleSize,
  setOpenTraces,
  setSurroundingEventsOpen,
}: Props) => {
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
      <EuiFlexGroup alignItems="center" gutterSize="xs">
        {backButtonExists && (
          <EuiFlexItem grow={false}>
            {/* <EuiToolTip content={<EuiText>Back</EuiText>} position="top"> */}
            <EuiButtonIcon iconType="sortLeft" onClick={onBackButtonClick} />
            {/* </EuiToolTip> */}
          </EuiFlexItem>
        )}

        <EuiFlexItem>
          <EuiTitle size="s">
            <h2 id="eventsDocFyout" className="vertical-center">
              {doc.hasOwnProperty(timeStampField)
                ? `Event: ${moment(doc[timeStampField]).format(
                    uiSettingsService.get('dateFormat')
                  )}`
                : `Event Details`}
            </h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiToolTip
            position="bottom"
            content={
              rawQuery.match(PPL_STATS_REGEX) ? (
                <p>Cannot view surrounding events with `stats` command in PPL query</p>
              ) : !doc.hasOwnProperty(timeStampField) ? (
                <p>Cannot view surrounding events without time field in query response</p>
              ) : (
                <p>View surrounding events based on timestamp</p>
              )
            }
          >
            <EuiButton
              onClick={openSurroundingFlyout}
              className="header-button"
              isDisabled={rawQuery.match(PPL_STATS_REGEX) || !doc.hasOwnProperty(timeStampField)}
            >
              View surrounding events
            </EuiButton>
          </EuiToolTip>
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
    />
  );
};
