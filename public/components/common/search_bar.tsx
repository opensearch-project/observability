import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenu,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiPopoverTitle,
  EuiSuperDatePicker,
} from '@elastic/eui';
import React, { useState } from 'react';

export const renderDatePicker = () => {
  return <EuiSuperDatePicker showUpdateButton={false} onTimeChange={(e) => console.log(e)} />;
};

export function SearchBar(props) {
  const [query, setQuery] = useState<string>('');
  return (
    <>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem>
          <EuiFieldSearch
            fullWidth
            placeholder="Trace ID, trace group name, user ID, service name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearch={(e) => console.log(e)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>{renderDatePicker()}</EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill iconType="refresh">
            Refresh
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiFlexGroup gutterSize="none" alignItems="flexEnd" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            isOpen={false}
            closePopover={() => {}}
            button={
              <EuiButtonIcon onClick={() => {}} iconType="filter" title="Change all filters" />
            }
            anchorPosition="rightUp"
            panelPaddingSize="none"
            withTitle
          >
            <EuiPopoverTitle>Change all filters</EuiPopoverTitle>
            <EuiContextMenu initialPanelId={0} panels={[]} />
          </EuiPopover>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty style={{ marginTop: 10 }} size="xs" onClick={() => {}}>
            + Add filter
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
