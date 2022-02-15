/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlyoutContainers } from '../../common/flyout_containers';
import React, { useEffect, useState } from 'react';
import { IDocType } from './docViewRow';
import { DocViewer } from './docViewer';
import {
  EuiButtonIcon,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiPanel,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { uiSettingsService } from '../../../../common/utils';
import moment from 'moment';
import { IExplorerFields, IField } from '../../../../common/types/explorer';
import { getHeaders, getTrs } from '../utils';
import { PAGE_SIZE } from '../../../../common/constants/explorer';

type Props = {
  detailsOpen: boolean;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doc: IDocType;
  timeStampField: string;
  memorizedTds: JSX.Element[];
  explorerFields: IExplorerFields;
};

export const DocFlyout = ({
  detailsOpen,
  setDetailsOpen,
  doc,
  timeStampField,
  memorizedTds,
  explorerFields,
}: Props) => {
  const [toggleSize, setToggleSize] = useState(false);

  const closeFlyout = () => {
    setDetailsOpen(false);
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
            color="text"
            style={{ position: 'absolute', right: '50px', top: '17px', zIndex: 3 }}
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
    <div>
      {explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 && (
        <table className="osd-table table" data-test-subj="docTable">
          <thead>{getHeaders(explorerFields.selectedFields)}</thead>
          <tbody>{memorizedTds}</tbody>
        </table>
      )}
      {explorerFields?.queriedFields &&
      explorerFields?.queriedFields?.length > 0 &&
      explorerFields.selectedFields?.length === 0 ? null : (
        <table className="osd-table table" data-test-subj="docTable">
          <thead>{getHeaders(explorerFields.selectedFields)}</thead>
          <tbody>{memorizedTds}</tbody>
        </table>
      )}
      <EuiHorizontalRule margin="s" />
      <DocViewer hit={doc} />
    </div>
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
