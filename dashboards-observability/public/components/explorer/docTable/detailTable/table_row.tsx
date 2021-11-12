/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from 'classnames';
import React, { ReactNode } from 'react';
// import { FieldMapping, DocViewFilterFn } from '../../doc_views/doc_views_types';
import { DocViewTableRowBtnFilterAdd } from './table_row_btn_filter_add';
import { DocViewTableRowBtnFilterRemove } from './table_row_btn_filter_remove';
import { DocViewTableRowBtnToggleColumn } from './table_row_btn_toggle_column';
import { DocViewTableRowBtnCollapse } from './table_row_btn_collapse';
import { DocViewTableRowBtnFilterExists } from './table_row_btn_filter_exists';
import { DocViewTableRowIconNoMapping } from './table_row_icon_no_mapping';
import { DocViewTableRowIconUnderscore } from './table_row_icon_underscore';
import { FieldName } from '../../../common/field_name/field_name';

export interface FieldMapping {
  filterable?: boolean;
  scripted?: boolean;
  rowCount?: number;
  type: string;
  name: string;
}

export type DocViewFilterFn = (
  mapping: FieldMapping | string | undefined,
  value: unknown,
  mode: '+' | '-'
) => void;

export interface Props {
  field: string;
  fieldMapping?: FieldMapping;
  fieldType: string;
  displayNoMappingWarning: boolean;
  displayUnderscoreWarning: boolean;
  isCollapsible: boolean;
  isColumnActive: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onFilter?: DocViewFilterFn;
  onToggleColumn?: () => void;
  value: string | ReactNode;
  valueRaw: unknown;
}

export function DocViewTableRow({
  field,
  fieldMapping,
  fieldType,
  displayNoMappingWarning,
  displayUnderscoreWarning,
  isCollapsible,
  isCollapsed,
  isColumnActive,
  onFilter,
  onToggleCollapse,
  onToggleColumn,
  value,
  valueRaw,
}: Props) {
  const valueClassName = classNames({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    osdDocViewer__value: true,
    'truncate-by-height': isCollapsible && isCollapsed,
  });

  return (
    <tr key={field} data-test-subj={`tableDocViewRow-${field}`}>
      {typeof onFilter === 'function' && (
        <td className="osdDocViewer__buttons">
          <DocViewTableRowBtnFilterAdd
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter(fieldMapping, valueRaw, '+')}
          />
          <DocViewTableRowBtnFilterRemove
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter(fieldMapping, valueRaw, '-')}
          />
          {typeof onToggleColumn === 'function' && (
            <DocViewTableRowBtnToggleColumn active={isColumnActive} onClick={onToggleColumn} />
          )}
          <DocViewTableRowBtnFilterExists
            disabled={!fieldMapping || !fieldMapping.filterable}
            onClick={() => onFilter('_exists_', field, '+')}
            scripted={fieldMapping && fieldMapping.scripted}
          />
        </td>
      )}
      <td className="osdDocViewer__field">
        <FieldName
          fieldName={field}
          fieldType={fieldType}
          // fieldIconProps={{ fill: 'none', color: 'gray' }}
          scripted={Boolean(fieldMapping?.scripted)}
        />
      </td>
      <td>
        {isCollapsible && (
          <DocViewTableRowBtnCollapse onClick={onToggleCollapse} isCollapsed={isCollapsed} />
        )}
        {displayUnderscoreWarning && <DocViewTableRowIconUnderscore />}
        {displayNoMappingWarning && <DocViewTableRowIconNoMapping />}
        <div
          className={valueClassName}
          data-test-subj={`tableDocViewRow-${field}-value`}
          /*
           * Justification for dangerouslySetInnerHTML:
           * We just use values encoded by our field formatters
           */
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: value as string }}
        />
      </td>
    </tr>
  );
}
