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
import { getHeaders } from '../utils';
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
};

export const DocFlyout = ({
  http,
  detailsOpen,
  setDetailsOpen,
  doc,
  timeStampField,
  memorizedTds,
  explorerFields,
}: Props) => {
  const [toggleSize, setToggleSize] = useState(true);

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
    <EuiFlyoutBody>
      <div className="dscTable dscTableFixedScroll">
        {explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 && (
          <table className="osd-table table doc-flyout">
            <thead>
              {getHeaders(explorerFields.queriedFields, DEFAULT_COLUMNS.slice(1), true)}
            </thead>
            <tbody>{memorizedTds}</tbody>
          </table>
        )}
        {explorerFields?.queriedFields &&
        explorerFields?.queriedFields?.length > 0 &&
        explorerFields.selectedFields?.length === 0 ? null : (
          <table className="osd-table table doc-flyout">
            <thead>
              {getHeaders(explorerFields.selectedFields, DEFAULT_COLUMNS.slice(1), true)}
            </thead>
            <tbody>{memorizedTds}</tbody>
          </table>
        )}
      </div>
      <DocViewer http={http} hit={doc} />
    </EuiFlyoutBody>
  );

  const flyoutFooter = (
    <EuiFlyoutFooter>
      <EuiButton onClick={closeFlyout}>Close</EuiButton>
    </EuiFlyoutFooter>
  );

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
