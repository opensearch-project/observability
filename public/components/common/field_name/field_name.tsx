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
import { EuiFlexGroup, EuiFlexItem, EuiToolTip } from '@elastic/eui';

// import { FieldIcon, FieldIconProps } from '../../../../../kibana_react/public';
// import { shortenDottedString } from '../../helpers';
import { getFieldTypeName } from './field_type_name';

// properties fieldType and fieldName are provided in osd_doc_view
// this should be changed when both components are deangularized
interface Props {
  fieldName: string;
  fieldType: string;
  useShortDots?: boolean;
  // fieldIconProps?: Omit<FieldIconProps, 'type'>;
  scripted?: boolean;
}

export function FieldName({
  fieldName,
  fieldType,
  useShortDots,
  // fieldIconProps,
  scripted = false,
}: Props) {
  const typeName = getFieldTypeName(fieldType);
  // const displayName = useShortDots ? shortenDottedString(fieldName) : fieldName;
  const displayName = fieldName;

  return (
    <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
      {/* <EuiFlexItem grow={false}>
        <FieldIcon type={fieldType} label={typeName} scripted={scripted} {...fieldIconProps} />
      </EuiFlexItem> */}
      <EuiFlexItem className="eui-textTruncate">
        <EuiToolTip
          position="top"
          content={displayName}
          delay="long"
          anchorClassName="eui-textTruncate"
        >
          <span>{displayName}</span>
        </EuiToolTip>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
