/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './sidebar.scss';

import React, { useState } from 'react';
import { EuiTitle, EuiSpacer, EuiButtonIcon, EuiFieldSearch, EuiAccordion, EuiFieldText, EuiForm, EuiFormRow, EuiTextArea, EuiHealth, EuiSuperSelect, EuiButton, EuiContextMenuItem, EuiCopy, EuiContextMenuPanel, EuiPopover, EuiFlexGroup, EuiFormControlLayout } from '@elastic/eui';
// import { i18n } from '@osd/i18n';
import { FormattedMessage} from '@osd/i18n/react';
import { IExplorerFields, IField } from '../../../../../common/types/explorer';

interface ISidebarProps {
  query: string;
  explorerFields: IExplorerFields;
  explorerData: any;
  selectedTimestamp: string;
  isOverridingTimestamp: boolean;
  isFieldToggleButtonDisabled: boolean;
  handleOverrideTimestamp: (timestamp: { name: string; type: string }) => void;
  handleAddField: (field: IField) => void;
  handleRemoveField: (field: IField) => void;
}

export const DataConfigPanel = (props: ISidebarProps) => {
  const [components, setComponents] = useState(['']);

  const [isPopoverOpen, setPopover] = useState(false);
  const textInput = React.useRef(null);
  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const onMetricsButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };


  const addComponent = (e:any) => {
    setComponents(prevState => [...prevState, e.target.innerText])
  }

  const items = [
    <>
    <EuiContextMenuItem key="record-1" style={{borderRadius:'2px !important', border:'1px solid black !important' ,color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record1
      </EuiContextMenuItem>
      <EuiContextMenuItem key="record-2" style={{borderRadius:'2px !important', border:'1px solid black !important', color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record2
      </EuiContextMenuItem>
      <EuiContextMenuItem key="record-3" style={{borderRadius:'2px !important', border:'1px solid black !important', color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record3
      </EuiContextMenuItem>
    </>
  ];

  const itemsMetrics = [
    <>
    <EuiContextMenuItem key="record-1" style={{borderRadius:'2px !important', border:'1px solid black !important' ,color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record1
      </EuiContextMenuItem>
      <EuiContextMenuItem key="record-2" style={{borderRadius:'2px !important', border:'1px solid black !important', color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record2
      </EuiContextMenuItem>
      <EuiContextMenuItem key="record-3" style={{borderRadius:'2px !important', border:'1px solid black !important', color:"#006BB4"}} onClick={(e) => addComponent(e)}>
        #record3
      </EuiContextMenuItem>
    </>
  ];


  const button = (
    <EuiButton iconType="plusInCircle" iconSide="right" fullWidth size="s" style={{"color":"black", "borderColor":"#D3DAE6", backgroundColor:"#fff", padding:"19px"}} onClick={onButtonClick}>
      Click or drop to add
    </EuiButton>
  );

  const buttonMetrics = (
    <EuiButton iconType="plusInCircle" iconSide="right" fullWidth size="s" style={{"color":"black", "borderColor":"#D3DAE6", backgroundColor:"#fff", padding:"19px"}} onClick={onMetricsButtonClick}>
      Click or drop to add
    </EuiButton>
  );

  const removeListItem = () => {
console.log('e.target.innerText ',textInput.current.value)
  }

  const renderListItem = (listItem) => { 
    return (
      <div style={{width:"100%", margin:"10px 2px", color:"#006BB4"}}> 
        <EuiFormControlLayout clear={{ onClick: (e) => {removeListItem(e)} }}>
          <EuiFieldText
          style={{color:'#006BB4', backgroundColor:"#fff"}}
            type="text"
            controlOnly
            aria-label="Use aria labels when no actual label is in use"
            value={listItem}
            inputRef={textInput}
          />
        </EuiFormControlLayout>
      </div> 
    );
  }; 
  
  return (
    <>
    <EuiFlexGroup style={{width:"100%"}}>
    <section className="sidebar-list" style={{width:"inherit"}}>
        <EuiTitle size="xxxs" id="selected_fields">
          <h3>
            <FormattedMessage
              id="discover.fieldChooser.filter.selectedFieldsTitle"
              defaultMessage="Data Configurations"
            />
          </h3>
        </EuiTitle>
        <div>
          <EuiTitle size="xxxs" id="selected_fields">
            <h3>
              <FormattedMessage
                id="discover.fieldChooser.filter.selectedFieldsTitle"
                defaultMessage="Dimensions"
              />
            </h3>
          </EuiTitle>
        </div>
        {components.length > 1 ? components.map((item, i) => ( item!== '' ? renderListItem(item) : '' )) : ''} 
        <EuiPopover
          id={'test_id'}
          button={button}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="downLeft"
          style={{width:"100%", display: "grid" }}
        >
          <EuiContextMenuPanel style={{ width: 250 }} items={items} />
        </EuiPopover>

        <div style={{marginTop:'10px'}}>
          <EuiTitle size="xxxs" id="selected_fields">
            <h3>
              <FormattedMessage
                id="discover.fieldChooser.filter.selectedFieldsTitle"
                defaultMessage="Metrics"
              />
            </h3>
          </EuiTitle>
        </div>
        {components.length > 1 ? components.map((item, i) => ( item!== '' ? renderListItem(item) : '' )) : ''} 
        <EuiPopover
          id={'test_id_a'}
          button={buttonMetrics}
          isOpen={false}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="downLeft"
          style={{width:"100%", display: "grid" }}
        >
          <EuiContextMenuPanel style={{ width: 250 }} items={itemsMetrics} />
        </EuiPopover>

      </section>
  </EuiFlexGroup>
  </>
  );
};
