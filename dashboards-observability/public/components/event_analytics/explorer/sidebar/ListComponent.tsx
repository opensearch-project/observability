import { EuiButtonIcon, EuiFieldText, EuiFormControlLayout, EuiIcon } from '@elastic/eui';
import React from 'react'; 

const ListComponent = (props) => { 
  return (
    <div style={{width:"100%", margin:"10px 2px", backgroundColor:"#fff", color:"#006BB4"}}> 
      {/* <h1>{props.text}</h1>  */}
      <EuiFormControlLayout clear={{ onClick: () => {} }}>
        <EuiFieldText
          type="text"
          controlOnly
          aria-label="Use aria labels when no actual label is in use"
          value={props.text}
        />
      </EuiFormControlLayout>
    </div> 
  );
}; 

export {ListComponent};