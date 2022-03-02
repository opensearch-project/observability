/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DocViewTableRow } from './table_row';

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

export interface DocViewRenderProps {
  columns?: string[];
  filter?: DocViewFilterFn;
  hit: any;
  onAddColumn?: (columnName: string) => void;
  onRemoveColumn?: (columnName: string) => void;
}

const fieldType = 'string';
const displayUnderscoreWarning = false;
const displayNoMappingWarning = false;
const isCollapsed = false;
const isCollapsible = false;
const isColumnActive = false;

export function DocViewTable({
  hit,
  filter,
  columns,
  onAddColumn,
  onRemoveColumn,
}: DocViewRenderProps) {
  const [fieldRowOpen, setFieldRowOpen] = useState({} as Record<string, boolean>);

  function toggleValueCollapse(field: string) {
    fieldRowOpen[field] = fieldRowOpen[field] !== true;
    setFieldRowOpen({ ...fieldRowOpen });
  }

  return (
    <table className="table table-condensed osdDocViewerTable">
      <tbody>
        {Object.keys(hit)
          .sort((preKey, nextKey) => {
            return preKey.toLowerCase().localeCompare(nextKey.toLowerCase());
          })
          .map((field) => {
            const value = hit[field];
            const toggleColumn =
              onRemoveColumn && onAddColumn && Array.isArray(columns)
                ? () => {
                    if (columns.includes(field)) {
                      onRemoveColumn(field);
                    } else {
                      onAddColumn(field);
                    }
                  }
                : undefined;

            return (
              <DocViewTableRow
                key={field}
                field={field}
                fieldType={String(fieldType)}
                displayUnderscoreWarning={displayUnderscoreWarning}
                displayNoMappingWarning={displayNoMappingWarning}
                isCollapsed={isCollapsed}
                isCollapsible={isCollapsible}
                isColumnActive={isColumnActive}
                onFilter={filter}
                onToggleCollapse={() => toggleValueCollapse(field)}
                onToggleColumn={toggleColumn}
                value={value}
                valueRaw={value}
              />
            );
          })}
      </tbody>
    </table>
  );
}
