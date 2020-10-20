(window["opendistro-notebooks-kibana_bundle_jsonpfunction"] = window["opendistro-notebooks-kibana_bundle_jsonpfunction"] || []).push([[1],{

/***/ "./public/application.tsx":
/*!********************************!*\
  !*** ./public/application.tsx ***!
  \********************************/
/*! exports provided: renderApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderApp", function() { return renderApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app */ "./public/components/app.tsx");
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */



const renderApp = ({
  notifications,
  http,
  chrome
}, {
  navigation,
  dashboard
}, {
  appBasePath,
  element
}) => {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_2__["KibanaNotebooksApp"], {
    basename: appBasePath,
    notifications: notifications,
    http: http,
    chrome: chrome,
    navigation: navigation,
    DashboardContainerByValueRenderer: dashboard.DashboardContainerByValueRenderer
  }), element);
  return () => react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(element);
};

/***/ }),

/***/ "./public/components/app.tsx":
/*!***********************************!*\
  !*** ./public/components/app.tsx ***!
  \***********************************/
/*! exports provided: KibanaNotebooksApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KibanaNotebooksApp", function() { return KibanaNotebooksApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ "./public/components/main.tsx");
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */



const KibanaNotebooksApp = ({
  basename,
  notifications,
  http,
  chrome,
  navigation,
  DashboardContainerByValueRenderer
}) => {
  // Render the application DOM.
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["I18nProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_main__WEBPACK_IMPORTED_MODULE_2__["Main"], {
    basename: basename,
    DashboardContainerByValueRenderer: DashboardContainerByValueRenderer,
    http: http,
    setBreadcrumbs: chrome.setBreadcrumbs
  })));
};

/***/ }),

/***/ "./public/components/helpers/custom_modals/custom_input_modal.tsx":
/*!************************************************************************!*\
  !*** ./public/components/helpers/custom_modals/custom_input_modal.tsx ***!
  \************************************************************************/
/*! exports provided: CustomInputModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomInputModal", function() { return CustomInputModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */


/*
 * "CustomInputModalProps" component is used to create a modal with an input filed
 *
 * Props taken in as params are:
 * runModal - function to fetch input field value and trigger closing modal
 * closeModal - function to trigger closing modal
 * titletxt - string as header for title of modal
 * labelTxt - string as header for input field
 * btn1txt - string as content to fill "close button"
 * btn2txt - string as content to fill "confirm button"
 * openNoteName - Default input value for the field
 */

const CustomInputModal = props => {
  const {
    runModal,
    closeModal,
    labelTxt,
    titletxt,
    btn1txt,
    btn2txt,
    openNoteName,
    helpText
  } = props;
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(openNoteName || ''); // sets input value

  const onChange = e => {
    setValue(e.target.value);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModal"], {
    onClose: closeModal,
    initialFocus: "[name=input]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalHeaderTitle"], null, titletxt)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiForm"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
    label: labelTxt,
    helpText: helpText
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFieldText"], {
    name: "input",
    value: value,
    onChange: e => onChange(e)
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonEmpty"], {
    onClick: closeModal
  }, btn1txt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
    onClick: () => runModal(value),
    fill: true
  }, btn2txt))));
};

/***/ }),

/***/ "./public/components/helpers/default_parser.tsx":
/*!******************************************************!*\
  !*** ./public/components/helpers/default_parser.tsx ***!
  \******************************************************/
/*! exports provided: defaultParagraphParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultParagraphParser", function() { return defaultParagraphParser; });
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
// Get the type of output and result in a default notebook paragraph
// Param: Default Backend Paragraph
const parseOutput = paraObject => {
  try {
    let outputType = [];
    let result = [];
    paraObject.output.map(output => {
      outputType.push(output.outputType);
      result.push(output.result);
    });
    return {
      outputType: outputType,
      outputData: result
    };
  } catch (error) {
    return {
      outputType: [],
      outputData: []
    };
  }
}; // Get the coding language by type of paragraph
// Param: Default Backend Paragraph


const parseInputType = paraObject => {
  try {
    if (paraObject.input.inputType === 'MARKDOWN') {
      return 'md';
    } else {
      return '';
    }
  } catch (error) {
    throw new Error('Parsing Input Issue ' + error);
  }
}; // Get the visualization by type of paragraph
// Param: Default Backend Paragraph


const parseVisualization = paraObject => {
  try {
    if (paraObject.input.inputType === 'VISUALIZATION') {
      let vizContent = paraObject.input.inputText;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      let visStartTime = startDate.toISOString();
      let visEndTime = new Date().toISOString();
      let visSavedObjId = '';

      if (vizContent !== '') {
        const {
          panels,
          timeRange
        } = JSON.parse(vizContent);
        visStartTime = timeRange.from;
        visEndTime = timeRange.to;
        visSavedObjId = panels['1'].explicitInput.savedObjectId;
      }

      return {
        isViz: true,
        VizObject: vizContent,
        visStartTime,
        visEndTime,
        visSavedObjId
      };
    } else {
      return {
        isViz: false,
        VizObject: ''
      };
    }
  } catch (error) {
    throw new Error('Parsing Input Issue ' + error);
  }
}; // Placeholder for default parser
// Param: Default Backend Paragraph


const defaultParagraphParser = defaultBackendParagraphs => {
  let parsedPara = [];

  try {
    defaultBackendParagraphs.map((paraObject, index) => {
      const codeLanguage = parseInputType(paraObject);
      const vizParams = parseVisualization(paraObject);
      const message = parseOutput(paraObject);
      let tempPara = {
        uniqueId: paraObject.id,
        isRunning: false,
        inQueue: false,
        isSelected: false,
        isInputHidden: false,
        isOutputHidden: false,
        showAddPara: false,
        isVizualisation: vizParams.isViz,
        vizObjectInput: vizParams.VizObject,
        id: index + 1,
        inp: paraObject.input.inputText || '',
        lang: 'text/x-' + codeLanguage,
        editorLanguage: codeLanguage,
        typeOut: message.outputType,
        out: message.outputData,
        isInputExpanded: false,
        isOutputStale: false,
        paraRef: undefined,
        paraDivRef: undefined,
        visStartTime: vizParams.visStartTime,
        visEndTime: vizParams.visEndTime,
        visSavedObjId: vizParams.visSavedObjId
      };
      parsedPara.push(tempPara);
    });
    return parsedPara;
  } catch (error) {
    throw new Error('Parsing Paragraph Issue ' + error);
  }
};

/***/ }),

/***/ "./public/components/helpers/modal_containers.tsx":
/*!********************************************************!*\
  !*** ./public/components/helpers/modal_containers.tsx ***!
  \********************************************************/
/*! exports provided: getCustomModal, getCloneModal, getDeleteModal, DeleteNotebookModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCustomModal", function() { return getCustomModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCloneModal", function() { return getCloneModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeleteModal", function() { return getDeleteModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteNotebookModal", function() { return DeleteNotebookModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_modals_custom_input_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom_modals/custom_input_modal */ "./public/components/helpers/custom_modals/custom_input_modal.tsx");
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */



/* The file contains helper functions for modal layouts
 * getCustomModal - returns modal with input field
 * getCloneModal - returns a confirm-modal with clone option
 * getDeleteModal - returns a confirm-modal with delete option
 */

const getCustomModal = (runModal, closeModal, labelTxt, titletxt, btn1txt, btn2txt, openNoteName, helpText) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_custom_modals_custom_input_modal__WEBPACK_IMPORTED_MODULE_2__["CustomInputModal"], {
    runModal: runModal,
    closeModal: closeModal,
    labelTxt: labelTxt,
    titletxt: titletxt,
    btn1txt: btn1txt,
    btn2txt: btn2txt,
    openNoteName: openNoteName,
    helpText: helpText
  });
};
const getCloneModal = (onCancel, onConfirm) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiConfirmModal"], {
    title: "Clone Notebook",
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: "Cancel",
    confirmButtonText: "Yes",
    defaultFocusedButton: "confirm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Do you want to clone this notebook?")));
};
const getDeleteModal = (onCancel, onConfirm, title, message, confirmMessage) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiConfirmModal"], {
    title: title,
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: "Cancel",
    confirmButtonText: confirmMessage || "Delete",
    buttonColor: "danger",
    defaultFocusedButton: "confirm"
  }, message));
};
const DeleteNotebookModal = ({
  onCancel,
  onConfirm,
  title,
  message
}) => {
  const [value, setValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');

  const onChange = e => {
    setValue(e.target.value);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModal"], {
    onClose: onCancel,
    initialFocus: "[name=input]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalHeaderTitle"], null, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiText"], null, message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiText"], null, "The action cannot be undone."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiForm"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
    label: "To confirm deletion, enter \"delete\" in the text field"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFieldText"], {
    name: "input",
    placeholder: "delete",
    value: value,
    onChange: e => onChange(e)
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonEmpty"], {
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
    onClick: () => onConfirm(),
    color: "danger",
    fill: true,
    disabled: value !== 'delete'
  }, "Delete"))));
};

/***/ }),

/***/ "./public/components/helpers/panel_wrapper.tsx":
/*!*****************************************************!*\
  !*** ./public/components/helpers/panel_wrapper.tsx ***!
  \*****************************************************/
/*! exports provided: PanelWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelWrapper", function() { return PanelWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */


function PanelWrapper({
  shouldWrap,
  children
}) {
  return shouldWrap ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPanel"], null, children) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children);
}

/***/ }),

/***/ "./public/components/helpers/zeppelin_parser.tsx":
/*!*******************************************************!*\
  !*** ./public/components/helpers/zeppelin_parser.tsx ***!
  \*******************************************************/
/*! exports provided: zeppelinParagraphParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zeppelinParagraphParser", function() { return zeppelinParagraphParser; });
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/* This file contains parsing functions
 * These functions have to be changed based on backend configuration
 * If backend changes the incoming paragraph structures may change, so parsing adapts to it
 */
const visualizationPrefix = '%sh #vizobject:';
const langSupport = {
  '%sh': 'shell',
  '%md': 'md',
  '%python': 'python',
  '%odfesql': 'sql',
  '%elasticsearch': 'json'
}; // Get the coding language from a Zeppelin paragraph input
// Param: textHeader-> header on a Zeppelin paragraph example "%md"

const parseCodeLanguage = textHeader => {
  const codeLanguage = langSupport[textHeader];
  return codeLanguage || '';
}; // Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph


const parseMessage = paraObject => {
  try {
    let mtype = [];
    let mdata = [];
    paraObject.results.msg.map(msg => {
      mtype.push(msg.type);
      mdata.push(msg.data);
    });
    return {
      outputType: mtype,
      outputData: mdata
    };
  } catch (error) {
    return {
      outputType: [],
      outputData: []
    };
  }
}; // Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph


const parseText = paraObject => {
  if ('text' in paraObject) {
    return paraObject.text;
  } else {
    throw new Error('Input text parse issue');
  }
}; // Get the visualization from a Zeppelin Paragraph input
// All Visualizations in Zeppelin are stored as shell comment -> "%sh #vizobject:"
// TODO: This is a workaround need to look for better solutions
// Param: Zeppelin Paragraph


const parseVisualization = paraObject => {
  let vizContent = '';

  if ('text' in paraObject && paraObject.text.substring(0, 15) === visualizationPrefix) {
    if (paraObject.title !== 'VISUALIZATION') {
      throw new Error('Visualization parse issue');
    }

    vizContent = paraObject.text.substring(15);
    return {
      isViz: true,
      VizObject: vizContent
    };
  } else {
    return {
      isViz: false,
      VizObject: vizContent
    };
  }
}; // This parser is used to get paragraph id
// Param: Zeppelin Paragraph


const parseId = paraObject => {
  if ('id' in paraObject) {
    return paraObject.id;
  } else {
    throw new Error('Id not found in paragraph');
  }
}; // This parser helps to convert Zeppelin paragraphs to a common ParaType format
// This parsing makes any backend notebook compatible with notebooks plugin


const zeppelinParagraphParser = zeppelinBackendParagraphs => {
  let parsedPara = [];

  try {
    zeppelinBackendParagraphs.map((paraObject, index) => {
      const paragraphId = parseId(paraObject);
      const vizParams = parseVisualization(paraObject);
      const inputParam = parseText(paraObject);
      const codeLanguage = parseCodeLanguage(inputParam.split('\n')[0].split('.')[0]);
      const message = parseMessage(paraObject);
      let tempPara = {
        uniqueId: paragraphId,
        isRunning: false,
        inQueue: false,
        ishovered: false,
        isSelected: false,
        isInputHidden: false,
        isOutputHidden: false,
        showAddPara: false,
        isVizualisation: vizParams.isViz,
        vizObjectInput: vizParams.VizObject,
        id: index + 1,
        inp: inputParam,
        lang: 'text/x-' + codeLanguage,
        editorLanguage: codeLanguage,
        typeOut: message.outputType,
        out: message.outputData
      };
      parsedPara.push(tempPara);
    });
    return parsedPara;
  } catch (error) {
    throw new Error('Parsing Paragraph Issue ' + error);
  }
};

/***/ }),

/***/ "./public/components/main.tsx":
/*!************************************!*\
  !*** ./public/components/main.tsx ***!
  \************************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notebook */ "./public/components/notebook.tsx");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common */ "./common/index.ts");
/* harmony import */ var _note_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./note_table */ "./public/components/note_table.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ "react-router");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_6__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */







class Main extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "setToast", (title, color = 'success', text = '') => {
      this.setState({
        toasts: [{
          id: new Date().toISOString(),
          title,
          text,
          color
        }]
      });
    });

    _defineProperty(this, "fetchNotebooks", () => {
      return this.props.http.get(`${_common__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"]}/`).then(res => this.setState(res)).catch(err => {
        console.error('Issue in fetching the notebooks', err.body.message);
      });
    });

    _defineProperty(this, "createNotebook", newNoteName => {
      if (newNoteName.length >= 50 || newNoteName.length === 0) {
        this.setToast('Invalid notebook name', 'danger');
        return;
      }

      const newNoteObject = {
        name: newNoteName
      };
      return this.props.http.post(`${_common__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"]}/note`, {
        body: JSON.stringify(newNoteObject)
      }).then(async res => {
        this.setToast(`Notebook "${newNoteName}" successfully created!`);
        window.location.assign(`${this.props.basename}#${res.body}`);
      }).catch(err => this.setToast('Issue in creating a notebook ' + err.body.message, 'danger'));
    });

    _defineProperty(this, "renameNotebook", (editedNoteName, editedNoteID) => {
      if (editedNoteName.length >= 50 || editedNoteName.length === 0) {
        this.setToast('Invalid notebook name', 'danger');
        return;
      }

      const renameNoteObject = {
        name: editedNoteName,
        noteId: editedNoteID
      };
      return this.props.http.put(`${_common__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"]}/note/rename`, {
        body: JSON.stringify(renameNoteObject)
      }).then(res => {
        this.fetchNotebooks();
        this.setToast(`Notebook successfully renamed into "${editedNoteName}"`);
      }).catch(err => this.setToast('Issue in renaming the notebook ' + err.body.message, 'danger'));
    });

    _defineProperty(this, "cloneNotebook", (clonedNoteName, clonedNoteID) => {
      const cloneNoteObject = {
        name: clonedNoteName,
        noteId: clonedNoteID
      };
      return this.props.http.post(`${_common__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"]}/note/clone`, {
        body: JSON.stringify(cloneNoteObject)
      }).then(res => {
        this.fetchNotebooks();
        this.setToast(`Notebook "${clonedNoteName}" successfully created!`);
        return res.body;
      }).catch(err => this.setToast('Issue in cloning the notebook ' + err.body.message, 'danger'));
    });

    _defineProperty(this, "deleteNotebook", (notebookId, notebookName, showToast = true) => {
      return this.props.http.delete(`${_common__WEBPACK_IMPORTED_MODULE_2__["API_PREFIX"]}/note/` + notebookId).then(res => {
        this.fetchNotebooks();
        if (showToast) this.setToast(`Notebook "${notebookName}" successfully deleted!`);
      }).catch(err => this.setToast('Issue in deleting the notebook ' + err.body.message, 'danger'));
    });

    this.state = {
      data: [],
      openedNotebook: undefined,
      toasts: []
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["HashRouter"], {
      basename: this.props.basename
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_6__["EuiGlobalToastList"], {
      toasts: this.state.toasts,
      dismissToast: removedToast => {
        this.setState({
          toasts: this.state.toasts.filter(toast => toast.id !== removedToast.id)
        });
      },
      toastLifeTimeMs: 6000
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_5__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_5__["Route"], {
      path: "/:id",
      render: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_notebook__WEBPACK_IMPORTED_MODULE_1__["Notebook"], {
        basename: this.props.basename,
        openedNoteId: props.match.params.id,
        DashboardContainerByValueRenderer: this.props.DashboardContainerByValueRenderer,
        http: this.props.http,
        setBreadcrumbs: this.props.setBreadcrumbs,
        renameNotebook: this.renameNotebook,
        cloneNotebook: this.cloneNotebook,
        deleteNotebook: this.deleteNotebook,
        setToast: this.setToast
      })
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_5__["Route"], {
      path: "/",
      render: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_note_table__WEBPACK_IMPORTED_MODULE_3__["NoteTable"], {
        fetchNotebooks: this.fetchNotebooks,
        notebooks: this.state.data,
        createNotebook: this.createNotebook,
        renameNotebook: this.renameNotebook,
        cloneNotebook: this.cloneNotebook,
        deleteNotebook: this.deleteNotebook,
        setBreadcrumbs: this.props.setBreadcrumbs,
        setToast: this.setToast
      })
    }))));
  }

}

/***/ }),

/***/ "./public/components/note_table.tsx":
/*!******************************************!*\
  !*** ./public/components/note_table.tsx ***!
  \******************************************/
/*! exports provided: NoteTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteTable", function() { return NoteTable; });
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common */ "./common/index.ts");
/* harmony import */ var _helpers_modal_containers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/modal_containers */ "./public/components/helpers/modal_containers.tsx");
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */






function NoteTable(props) {
  const [isModalVisible, setIsModalVisible] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false); // Modal Toggle

  const [modalLayout, setModalLayout] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiOverlayMask"], null)); // Modal Layout

  const [isActionsPopoverOpen, setIsActionsPopoverOpen] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false);
  const [selectedNotebooks, setSelectedNotebooks] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])([]);
  const [searchQuery, setSearchQuery] = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])('');
  const {
    notebooks,
    createNotebook,
    renameNotebook,
    cloneNotebook,
    deleteNotebook
  } = props;
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(() => {
    props.setBreadcrumbs([{
      text: 'Notebooks',
      href: '#'
    }]);
    props.fetchNotebooks();
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCreate = async newNoteName => {
    createNotebook(newNoteName);
    closeModal();
  };

  const onRename = async newNoteName => {
    renameNotebook(newNoteName, selectedNotebooks[0].id);
    closeModal();
  };

  const onClone = async newName => {
    cloneNotebook(newName, selectedNotebooks[0].id);
    closeModal();
  };

  const onDelete = async () => {
    const toastMessage = `Notebook${selectedNotebooks.length > 1 ? 's' : ' ' + selectedNotebooks[0].path} successfully deleted!`;
    Promise.all(selectedNotebooks.map(notebook => deleteNotebook(notebook.id, undefined, false))).then(() => props.setToast(toastMessage)).catch(error => props.setToast('Issue in deleting notebooks' + error.body.message, 'danger'));
    closeModal();
  };

  const createNote = () => {
    setModalLayout(Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_5__["getCustomModal"])(onCreate, closeModal, 'Name', 'Create notebook', 'Cancel', 'Create', undefined, _common__WEBPACK_IMPORTED_MODULE_4__["CREATE_NOTE_MESSAGE"]));
    showModal();
  };

  const renameNote = () => {
    setModalLayout(Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_5__["getCustomModal"])(onRename, closeModal, 'Name', 'Rename notebook', 'Cancel', 'Rename', selectedNotebooks[0].path, _common__WEBPACK_IMPORTED_MODULE_4__["CREATE_NOTE_MESSAGE"]));
    showModal();
  };

  const cloneNote = () => {
    setModalLayout(Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_5__["getCustomModal"])(onClone, closeModal, 'Name', 'Duplicate notebook', 'Cancel', 'Duplicate', selectedNotebooks[0].path + ' (copy)', _common__WEBPACK_IMPORTED_MODULE_4__["CREATE_NOTE_MESSAGE"]));
    showModal();
  };

  const deleteNote = () => {
    const notebookString = `notebook${selectedNotebooks.length > 1 ? 's' : ''}`;
    setModalLayout( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_5__["DeleteNotebookModal"], {
      onConfirm: onDelete,
      onCancel: closeModal,
      title: `Delete ${selectedNotebooks.length} ${notebookString}`,
      message: `Are you sure you want to delete the selected ${selectedNotebooks.length} ${notebookString}?`
    }));
    showModal();
  };

  const popoverButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiButton"], {
    iconType: "arrowDown",
    iconSide: "right",
    onClick: () => setIsActionsPopoverOpen(!isActionsPopoverOpen)
  }, "Actions");
  const popoverItems = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiContextMenuItem"], {
    key: "rename",
    disabled: notebooks.length === 0 || selectedNotebooks.length !== 1,
    onClick: () => {
      setIsActionsPopoverOpen(false);
      renameNote();
    }
  }, "Rename"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiContextMenuItem"], {
    key: "duplicate",
    disabled: notebooks.length === 0 || selectedNotebooks.length !== 1,
    onClick: () => {
      setIsActionsPopoverOpen(false);
      cloneNote();
    }
  }, "Duplicate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiContextMenuItem"], {
    key: "delete",
    disabled: notebooks.length === 0 || selectedNotebooks.length === 0,
    onClick: () => {
      setIsActionsPopoverOpen(false);
      deleteNote();
    }
  }, "Delete")];
  const tableColumns = [{
    field: 'path',
    name: 'Name',
    sortable: true,
    truncateText: true,
    render: (value, record) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiLink"], {
      href: `#${record.id}`
    }, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.truncate(value, {
      'length': 100
    }))
  }, {
    field: 'dateModified',
    name: 'Last updated',
    sortable: true,
    render: value => moment__WEBPACK_IMPORTED_MODULE_2___default()(value).format(_common__WEBPACK_IMPORTED_MODULE_4__["DATE_FORMAT"])
  }, {
    field: 'dateCreated',
    name: 'Created',
    sortable: true,
    render: value => moment__WEBPACK_IMPORTED_MODULE_2___default()(value).format(_common__WEBPACK_IMPORTED_MODULE_4__["DATE_FORMAT"])
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPage"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageBody"], {
    component: "div"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageHeaderSection"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiTitle"], {
    size: "l"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h1", null, "Notebooks")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageContent"], {
    id: "notebookArea"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageContentHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageContentHeaderSection"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiTitle"], {
    size: "s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h3", null, "Notebooks", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "panel-header-count"
  }, " (", notebooks.length, ")"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiSpacer"], {
    size: "s"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiText"], {
    size: "s",
    color: "subdued"
  }, "Use Notebooks to interactively and collaboratively develop rich reports backed by live data. A notebook is a document made up of paragraphs that can combine markdown and visualizations with support for multi-timelines so that users can easily tell a story. Notebooks can be developed, shared and refreshed directly from Kibana to foster data driven exploration and collaboration among Elasticsearch users and their stakeholders. Common use cases for notebooks includes creating postmortem reports, designing run books, building live infrastructure reports, or even documentation.", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiLink"], {
    external: true,
    href: "https://opendistro.github.io/for-elasticsearch-docs/docs/notebooks/",
    target: "blank"
  }, "Learn more"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPageContentHeaderSection"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFlexGroup"], {
    gutterSize: "s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiPopover"], {
    panelPaddingSize: "none",
    button: popoverButton,
    isOpen: isActionsPopoverOpen,
    closePopover: () => setIsActionsPopoverOpen(false)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiContextMenuPanel"], {
    items: popoverItems
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiButton"], {
    fill: true,
    onClick: () => createNote()
  }, "Create notebook"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiHorizontalRule"], {
    margin: "m"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFieldSearch"], {
    fullWidth: true,
    placeholder: "Search notebooks",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiHorizontalRule"], {
    margin: "m"
  }), notebooks.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiInMemoryTable"], {
    items: searchQuery ? notebooks.filter(notebook => notebook.path.toLowerCase().includes(searchQuery.toLowerCase())) : notebooks,
    itemId: "id",
    columns: tableColumns,
    tableLayout: "auto",
    pagination: {
      initialPageSize: 10,
      pageSizeOptions: [8, 10, 13]
    },
    sorting: {
      sort: {
        field: 'dateModified',
        direction: 'desc'
      }
    },
    allowNeutralSort: false,
    isSelectable: true,
    selection: {
      onSelectionChange: items => setSelectedNotebooks(items)
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiSpacer"], {
    size: "xxl"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiText"], {
    textAlign: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", null, "No notebooks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiSpacer"], {
    size: "m"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiText"], {
    color: "subdued"
  }, "Use notebooks to create post-mortem reports, build live infrastructure", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("br", null), "reports, or foster explorative collaborations with data.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiSpacer"], {
    size: "m"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFlexGroup"], {
    justifyContent: "spaceAround"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiFlexItem"], {
    grow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiButton"], {
    fullWidth: false,
    onClick: () => createNote()
  }, "Create notebook"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_0__["EuiSpacer"], {
    size: "xxl"
  }))))), isModalVisible && modalLayout);
}
;

/***/ }),

/***/ "./public/components/notebook.tsx":
/*!****************************************!*\
  !*** ./public/components/notebook.tsx ***!
  \****************************************/
/*! exports provided: Notebook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notebook", function() { return Notebook; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nteract/presentational-components */ "./node_modules/@nteract/presentational-components/lib/index.js");
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _paragraph_components_paragraphs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paragraph_components/paragraphs */ "./public/components/paragraph_components/paragraphs.tsx");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common */ "./common/index.ts");
/* harmony import */ var _helpers_zeppelin_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/zeppelin_parser */ "./public/components/helpers/zeppelin_parser.tsx");
/* harmony import */ var _helpers_default_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/default_parser */ "./public/components/helpers/default_parser.tsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers_panel_wrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/panel_wrapper */ "./public/components/helpers/panel_wrapper.tsx");
/* harmony import */ var _helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/modal_containers */ "./public/components/helpers/modal_containers.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */











/*
 * "Notebook" component is used to display an open notebook
 *
 * Props taken in as params are:
 * basename - base url for kibana notebooks
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * http object - for making API requests
 * setBreadcrumbs - sets breadcrumbs on top
 */

class Notebook extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "parseAllParagraphs", () => {
      let parsedPara = this.parseParagraphs(this.state.paragraphs);
      this.setState({
        parsedPara
      });
    });

    _defineProperty(this, "parseParagraphs", paragraphs => {
      try {
        let parsedPara;

        if (_common__WEBPACK_IMPORTED_MODULE_4__["SELECTED_BACKEND"] === 'ZEPPELIN') {
          parsedPara = Object(_helpers_zeppelin_parser__WEBPACK_IMPORTED_MODULE_5__["zeppelinParagraphParser"])(paragraphs);
          this.setState({
            vizPrefix: '%sh #vizobject:'
          });
        } else {
          parsedPara = Object(_helpers_default_parser__WEBPACK_IMPORTED_MODULE_6__["defaultParagraphParser"])(paragraphs);
        }

        parsedPara.forEach(para => {
          para.isInputExpanded = this.state.selectedViewId === 'input_only';
          para.paraRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
          para.paraDivRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
        });
        return parsedPara;
      } catch (error) {
        console.error('Parsing paragraph has some issue', error);
        this.setState({
          parsedPara: []
        });
      }
    });

    _defineProperty(this, "showParagraphRunning", param => {
      let parsedPara = this.state.parsedPara;
      this.state.parsedPara.map((_, index) => {
        if (param === 'queue') {
          parsedPara[index].inQueue = true;
          parsedPara[index].isOutputHidden = true;
        } else if (param === 'loading') {
          parsedPara[index].isRunning = true;
          parsedPara[index].isOutputHidden = true;
        } else if (param === index) {
          parsedPara[index].isRunning = true;
          parsedPara[index].isOutputHidden = true;
        }
      });
      this.setState({
        parsedPara
      });
    });

    _defineProperty(this, "paragraphSelector", index => {
      let parsedPara = this.state.parsedPara;
      this.state.parsedPara.map((_, idx) => {
        if (index === idx) parsedPara[idx].isSelected = true;else parsedPara[idx].isSelected = false;
      });
      this.setState({
        parsedPara
      });
    });

    _defineProperty(this, "deleteParagraphButton", (para, index) => {
      if (index !== -1) {
        return this.props.http.delete(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/` + this.props.openedNoteId + '/' + para.uniqueId).then(res => {
          const paragraphs = [...this.state.paragraphs];
          paragraphs.splice(index, 1);
          const parsedPara = [...this.state.parsedPara];
          parsedPara.splice(index, 1);
          this.setState({
            paragraphs,
            parsedPara
          });
        }).catch(err => console.error('Delete paragraph issue: ', err.body.message));
      }
    });

    _defineProperty(this, "showDeleteParaModal", (para, index) => {
      this.setState({
        modalLayout: Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["getDeleteModal"])(() => this.setState({
          isModalVisible: false
        }), () => {
          this.deleteParagraphButton(para, index);
          this.setState({
            isModalVisible: false
          });
        }, 'Delete paragraph', 'Are you sure you want to delete the paragraph? The action cannot be undone.')
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "showDeleteAllParaModal", () => {
      this.setState({
        modalLayout: Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["getDeleteModal"])(() => this.setState({
          isModalVisible: false
        }), async () => {
          this.setState({
            isModalVisible: false
          });
          await this.runForAllParagraphs((para, index) => {
            return this.props.http.delete(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/${this.props.openedNoteId}/${para.uniqueId}`).then(res => {
              this.setState({
                paragraphs: res.paragraphs
              });
              this.parseAllParagraphs();
            }).catch(err => console.error('Delete paragraph issue: ', err.body.message));
          });
          this.props.setToast('Paragraphs successfully deleted!');
        }, 'Delete all paragraphs', 'Are you sure you want to delete all paragraphs? The action cannot be undone.')
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "showClearOutputsModal", () => {
      this.setState({
        modalLayout: Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["getDeleteModal"])(() => this.setState({
          isModalVisible: false
        }), () => {
          this.clearParagraphButton();
          this.setState({
            isModalVisible: false
          });
        }, 'Clear all outputs', 'Are you sure you want to clear all outputs? The action cannot be undone.', 'Clear')
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "showRenameModal", () => {
      this.setState({
        modalLayout: Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["getCustomModal"])(newName => {
          this.props.renameNotebook(newName, this.props.openedNoteId);
          this.setState({
            isModalVisible: false
          });
          this.loadNotebook();
        }, () => this.setState({
          isModalVisible: false
        }), 'Name', 'Rename notebook', 'Cancel', 'Rename', this.state.path, _common__WEBPACK_IMPORTED_MODULE_4__["CREATE_NOTE_MESSAGE"])
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "showCloneModal", () => {
      this.setState({
        modalLayout: Object(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["getCustomModal"])(newName => {
          this.props.cloneNotebook(newName, this.props.openedNoteId).then(id => {
            window.location.assign(`${this.props.basename}#${id}`);
            setTimeout(() => {
              this.loadNotebook();
            }, 100);
          });
          this.setState({
            isModalVisible: false
          });
        }, () => this.setState({
          isModalVisible: false
        }), 'Name', 'Duplicate notebook', 'Cancel', 'Duplicate', this.state.path + ' (copy)', _common__WEBPACK_IMPORTED_MODULE_4__["CREATE_NOTE_MESSAGE"])
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "showDeleteNotebookModal", () => {
      this.setState({
        modalLayout: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_modal_containers__WEBPACK_IMPORTED_MODULE_9__["DeleteNotebookModal"], {
          onConfirm: () => {
            this.props.deleteNotebook(this.props.openedNoteId, this.state.path);
            this.setState({
              isModalVisible: false
            });
            window.location.replace(`${this.props.basename}#`);
          },
          onCancel: () => this.setState({
            isModalVisible: false
          }),
          title: `Delete notebook "${this.state.path}"`,
          message: "Delete notebook will remove all contents in the paragraphs."
        })
      });
      this.setState({
        isModalVisible: true
      });
    });

    _defineProperty(this, "deleteVizualization", uniqueId => {
      this.props.http.delete(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/` + this.props.openedNoteId + '/' + uniqueId).then(res => {
        this.setState({
          paragraphs: res.paragraphs
        });
        this.parseAllParagraphs();
      }).catch(err => console.error('Delete vizualization issue: ', err.body.message));
    });

    _defineProperty(this, "addPara", (index, newParaContent, inpType) => {
      const addParaObj = {
        noteId: this.props.openedNoteId,
        paragraphIndex: index,
        paragraphInput: newParaContent,
        inputType: inpType
      };
      return this.props.http.post(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/`, {
        body: JSON.stringify(addParaObj)
      }).then(res => {
        const paragraphs = [...this.state.paragraphs];
        paragraphs.splice(index, 0, res);
        const newPara = this.parseParagraphs([res])[0];
        newPara.isInputExpanded = true;
        const parsedPara = [...this.state.parsedPara];
        parsedPara.splice(index, 0, newPara);
        this.setState({
          paragraphs,
          parsedPara
        });
        this.paragraphSelector(index);
      }).catch(err => console.error('Add paragraph issue: ', err.body.message));
    });

    _defineProperty(this, "cloneParaButton", (para, index) => {
      let inputType = 'CODE';

      if (para.isVizualisation === true) {
        inputType = 'VISUALIZATION';
      }

      if (index !== -1) {
        return this.addPara(index, para.inp, inputType);
      }
    });

    _defineProperty(this, "movePara", (index, targetIndex) => {
      const paragraphs = [...this.state.paragraphs];
      paragraphs.splice(targetIndex, 0, paragraphs.splice(index, 1)[0]);
      const parsedPara = [...this.state.parsedPara];
      parsedPara.splice(targetIndex, 0, parsedPara.splice(index, 1)[0]);
      const moveParaObj = {
        noteId: this.props.openedNoteId,
        paragraphs
      };
      return this.props.http.post(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/set_paragraphs/`, {
        body: JSON.stringify(moveParaObj)
      }).then(res => this.setState({
        paragraphs,
        parsedPara
      })).then(res => this.scrollToPara(targetIndex)).catch(err => console.error('Move paragraph issue: ', err.body.message));
    });

    _defineProperty(this, "clearParagraphButton", () => {
      this.showParagraphRunning('loading');
      const clearParaObj = {
        noteId: this.props.openedNoteId
      };
      this.props.http.put(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/clearall/`, {
        body: JSON.stringify(clearParaObj)
      }).then(res => {
        this.setState({
          paragraphs: res.paragraphs
        });
        this.parseAllParagraphs();
      }).catch(err => console.error('clear paragraph issue: ', err.body.message));
    });

    _defineProperty(this, "updateRunParagraph", (para, index, vizObjectInput) => {
      this.showParagraphRunning(index);

      if (vizObjectInput) {
        para.inp = this.state.vizPrefix + vizObjectInput; // "%sh check"
      }

      const paraUpdateObject = {
        noteId: this.props.openedNoteId,
        paragraphId: para.uniqueId,
        paragraphInput: para.inp
      };
      return this.props.http.post(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/paragraph/update/run/`, {
        body: JSON.stringify(paraUpdateObject)
      }).then(res => {
        const paragraphs = this.state.paragraphs;
        paragraphs[index] = res;
        const parsedPara = [...this.state.parsedPara];
        parsedPara[index] = this.parseParagraphs([res])[0];
        this.setState({
          paragraphs,
          parsedPara
        });
      }).catch(err => console.error('run paragraph issue: ', err.body.message));
    });

    _defineProperty(this, "runForAllParagraphs", reducer => {
      return this.state.parsedPara.map((para, index) => () => reducer(para, index)).reduce((chain, func) => chain.then(func), Promise.resolve());
    });

    _defineProperty(this, "textValueEditor", (evt, index) => {
      if (!(evt.key === 'Enter' && evt.shiftKey)) {
        let parsedPara = this.state.parsedPara;
        parsedPara[index].inp = evt.target.value;
        this.setState({
          parsedPara
        });
      }
    });

    _defineProperty(this, "handleKeyPress", (evt, para, index) => {
      if (evt.key === 'Enter' && evt.shiftKey) {
        this.updateRunParagraph(para, index);
      }
    });

    _defineProperty(this, "updateView", (selectedViewId, scrollToIndex) => {
      let parsedPara = [...this.state.parsedPara];
      this.state.parsedPara.map((para, index) => {
        parsedPara[index].isInputExpanded = selectedViewId === 'input_only';
      });

      if (scrollToIndex !== undefined) {
        parsedPara[scrollToIndex].isInputExpanded = true;
        this.scrollToPara(scrollToIndex);
      }

      this.setState({
        parsedPara,
        selectedViewId
      });
      this.paragraphSelector(scrollToIndex !== undefined ? scrollToIndex : -1);
    });

    _defineProperty(this, "loadNotebook", () => {
      this.showParagraphRunning('queue');
      this.props.http.get(`${_common__WEBPACK_IMPORTED_MODULE_4__["API_PREFIX"]}/note/` + this.props.openedNoteId).then(res => {
        this.setBreadcrumbs(res.path);
        this.setState(res, this.parseAllParagraphs);
      }).catch(err => console.error('Fetching notebook issue: ', err.body.message));
    });

    _defineProperty(this, "setPara", (para, index) => {
      const parsedPara = [...this.state.parsedPara];
      parsedPara.splice(index, 1, para);
      this.setState({
        parsedPara
      });
    });

    this.state = {
      selectedViewId: 'view_both',
      path: '',
      dateCreated: '',
      dateModified: '',
      paragraphs: [],
      parsedPara: [],
      vizPrefix: '',
      isAddParaPopoverOpen: false,
      isParaActionsPopoverOpen: false,
      isNoteActionsPopoverOpen: false,
      isModalVisible: false,
      modalLayout: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiOverlayMask"], null)
    };
  }

  scrollToPara(index) {
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: this.state.parsedPara[index].paraDivRef.current.offsetTop,
        behavior: 'smooth'
      });
    }, 0);
  } // Function for clearing outputs button


  setBreadcrumbs(path) {
    this.props.setBreadcrumbs([{
      text: 'Notebooks',
      href: '#'
    }, {
      text: path,
      href: `#${this.props.openedNoteId}`
    }]);
  }

  componentDidMount() {
    this.loadNotebook();
  }

  render() {
    const viewOptions = [{
      id: 'view_both',
      label: 'View both'
    }, {
      id: 'input_only',
      label: 'Input only'
    }, {
      id: 'output_only',
      label: 'Output only'
    }];
    const addParaPanels = [{
      id: 0,
      title: 'Input type',
      items: [{
        name: 'Markdown',
        onClick: () => {
          this.setState({
            isAddParaPopoverOpen: false
          });
          this.addPara(this.state.paragraphs.length, '', 'CODE');
        }
      }, {
        name: 'Kibana visualization',
        onClick: () => {
          this.setState({
            isAddParaPopoverOpen: false
          });
          this.addPara(this.state.paragraphs.length, '', 'VISUALIZATION');
        }
      }]
    }];
    const paraActionsPanels = [{
      id: 0,
      title: 'Paragraph actions',
      items: [{
        name: 'Add paragraph to top',
        panel: 1
      }, {
        name: 'Add paragraph to bottom',
        panel: 2
      }, {
        name: 'Run all paragraphs',
        disabled: this.state.parsedPara.length === 0,
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.runForAllParagraphs((para, index) => {
            return para.paraRef.current.runParagraph();
          });

          if (this.state.selectedViewId === 'input_only') {
            this.updateView('view_both');
          }
        }
      }, {
        name: 'Clear all outputs',
        disabled: this.state.parsedPara.length === 0,
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.showClearOutputsModal();
        }
      }, {
        name: 'Delete all paragraphs',
        disabled: this.state.parsedPara.length === 0,
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.showDeleteAllParaModal();
        }
      }]
    }, {
      id: 1,
      title: 'Add to top',
      items: [{
        name: 'Markdown',
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.addPara(0, '', 'CODE');
        }
      }, {
        name: 'Kibana visualization',
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.addPara(0, '', 'VISUALIZATION');
        }
      }]
    }, {
      id: 2,
      title: 'Add to bottom',
      items: [{
        name: 'Markdown',
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.addPara(this.state.paragraphs.length, '', 'CODE');
        }
      }, {
        name: 'Kibana visualization',
        onClick: () => {
          this.setState({
            isParaActionsPopoverOpen: false
          });
          this.addPara(this.state.paragraphs.length, '', 'VISUALIZATION');
        }
      }]
    }];
    const noteActionsPanels = [{
      id: 0,
      title: 'Notebook actions',
      items: [{
        name: 'Rename notebook',
        onClick: () => {
          this.setState({
            isNoteActionsPopoverOpen: false
          });
          this.showRenameModal();
        }
      }, {
        name: 'Duplicate notebook',
        onClick: () => {
          this.setState({
            isNoteActionsPopoverOpen: false
          });
          this.showCloneModal();
        }
      }, {
        name: 'Delete notebook',
        onClick: () => {
          this.setState({
            isNoteActionsPopoverOpen: false
          });
          this.showDeleteNotebookModal();
        }
      }]
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPage"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPageBody"], {
      component: "div"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPageHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPageHeaderSection"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiTitle"], {
      size: "l"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, this.state.path))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPageHeaderSection"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], {
      gutterSize: "s"
    }, this.state.parsedPara.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonGroup"], {
      buttonSize: "m",
      options: viewOptions,
      idSelected: this.state.selectedViewId,
      onChange: id => {
        this.updateView(id);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPopover"], {
      panelPaddingSize: "none",
      withTitle: true,
      button: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        iconType: "arrowDown",
        iconSide: "right",
        onClick: () => this.setState({
          isParaActionsPopoverOpen: true
        })
      }, "Paragraph actions"),
      isOpen: this.state.isParaActionsPopoverOpen,
      closePopover: () => this.setState({
        isParaActionsPopoverOpen: false
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiContextMenu"], {
      initialPanelId: 0,
      panels: paraActionsPanels
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPopover"], {
      panelPaddingSize: "none",
      withTitle: true,
      button: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        iconType: "arrowDown",
        iconSide: "right",
        onClick: () => this.setState({
          isNoteActionsPopoverOpen: true
        })
      }, "Notebook actions"),
      isOpen: this.state.isNoteActionsPopoverOpen,
      closePopover: () => this.setState({
        isNoteActionsPopoverOpen: false
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiContextMenu"], {
      initialPanelId: 0,
      panels: noteActionsPanels
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiText"], {
      color: "subdued"
    }, "Created: ", moment__WEBPACK_IMPORTED_MODULE_7___default()(this.state.dateCreated).format(_common__WEBPACK_IMPORTED_MODULE_4__["DATE_FORMAT"])), this.state.parsedPara.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__["Cells"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_helpers_panel_wrapper__WEBPACK_IMPORTED_MODULE_8__["PanelWrapper"], {
      shouldWrap: this.state.selectedViewId === 'output_only'
    }, this.state.parsedPara.map((para, index) => {
      var _this$state$paragraph;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: this.state.parsedPara[index].paraDivRef,
        key: `para_div_${para.uniqueId}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_paragraph_components_paragraphs__WEBPACK_IMPORTED_MODULE_3__["Paragraphs"], {
        ref: this.state.parsedPara[index].paraRef,
        para: para,
        setPara: para => this.setPara(para, index),
        dateModified: (_this$state$paragraph = this.state.paragraphs[index]) === null || _this$state$paragraph === void 0 ? void 0 : _this$state$paragraph.dateModified,
        index: index,
        paraCount: this.state.parsedPara.length,
        paragraphSelector: this.paragraphSelector,
        textValueEditor: this.textValueEditor,
        handleKeyPress: this.handleKeyPress,
        addPara: this.addPara,
        DashboardContainerByValueRenderer: this.props.DashboardContainerByValueRenderer,
        deleteVizualization: this.deleteVizualization,
        http: this.props.http,
        selectedViewId: this.state.selectedViewId,
        setSelectedViewId: this.updateView,
        deletePara: this.showDeleteParaModal,
        runPara: this.updateRunParagraph,
        clonePara: this.cloneParaButton,
        movePara: this.movePara
      }));
    }))), this.state.selectedViewId !== 'output_only' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPopover"], {
      panelPaddingSize: "none",
      withTitle: true,
      button: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        iconType: "arrowDown",
        iconSide: "right",
        onClick: () => this.setState({
          isAddParaPopoverOpen: true
        })
      }, "Add paragraph"),
      isOpen: this.state.isAddParaPopoverOpen,
      closePopover: () => this.setState({
        isAddParaPopoverOpen: false
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiContextMenu"], {
      initialPanelId: 0,
      panels: addParaPanels
    }))) :
    /*#__PURE__*/
    // show default paragraph if no paragraphs in this notebook
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        marginTop: 20
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], {
      size: "xxl"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiText"], {
      textAlign: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "No paragraphs"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiText"], null, "Add a paragraph to compose your document or story. Notebooks now support two types of input:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], {
      size: "xl"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], {
      justifyContent: "spaceEvenly"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiCard"], {
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiIcon"], {
        size: "xxl",
        type: "editorCodeBlock"
      }),
      title: "Markdown",
      description: "Create rich text with markup language",
      footer: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        onClick: () => this.addPara(0, '', 'CODE'),
        style: {
          marginBottom: 17
        }
      }, "Add markdown paragraph")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: 3
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiCard"], {
      icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiIcon"], {
        size: "xxl",
        type: "visArea"
      }),
      title: "Kibana visualization",
      description: "Import Kibana visualizations to the notes",
      footer: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        onClick: () => this.addPara(0, '', 'VISUALIZATION'),
        style: {
          marginBottom: 17
        }
      }, "Add Kibana visualization paragraph")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: 2
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], {
      size: "xxl"
    }))))), this.state.isModalVisible && this.state.modalLayout);
  }

}

/***/ }),

/***/ "./public/components/paragraph_components/para_input.tsx":
/*!***************************************************************!*\
  !*** ./public/components/paragraph_components/para_input.tsx ***!
  \***************************************************************/
/*! exports provided: ParaInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParaInput", function() { return ParaInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nteract/presentational-components */ "./node_modules/@nteract/presentational-components/lib/index.js");
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common */ "./common/index.ts");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__);
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */




/*
 * "ParaInput" component is used by notebook to populate paragraph inputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 * index - index of paragraph in the notebook
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 *
 * Input component of nteract used as a container for notebook UI.
 * https://components.nteract.io/#input
 */

const ParaInput = props => {
  const {
    para,
    index,
    runParaError,
    textValueEditor,
    handleKeyPress
  } = props;

  const renderParaInput = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__["Source"], {
      language: para.lang
    }, para.isSelected ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiTextArea"], {
      className: "editorArea",
      fullWidth: true,
      isInvalid: runParaError,
      onChange: evt => {
        textValueEditor(evt, index);
        props.setIsOutputStale(true);
      },
      onKeyPress: evt => handleKeyPress(evt, para, index),
      value: para.inp,
      autoFocus: true
    }) : para.inp);
  };

  const renderVisInput = () => {
    const [isModalOpen, setIsModalOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
    const [selectableOptions, setSelectableOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
    const [selectableError, setSelectableError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

    const onSelect = () => {
      const selectedOptions = selectableOptions.filter(opt => opt.checked === 'on');

      if (selectedOptions.length === 0) {
        setSelectableError(true);
        return;
      }

      props.setIsOutputStale(true);
      props.setSelectedVisOption(selectedOptions);
      setIsModalOpen(false);
    };

    const renderOption = (option, searchValue) => {
      const href = window.location.href;
      const visURL = `${href.substring(0, href.indexOf(_common__WEBPACK_IMPORTED_MODULE_2__["PLUGIN_ID"]))}visualize#/edit/${option.key}` + `?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'${props.startTime}',to:'${props.endTime}'))`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiLink"], {
        href: visURL,
        target: "_blank"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiHighlight"], {
        search: searchValue
      }, option.label));
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexGroup"], {
      alignItems: "flexEnd",
      gutterSize: "s"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
      grow: 6
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFormRow"], {
      label: "Title",
      fullWidth: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiComboBox"], {
      placeholder: "Find Kibana visualization",
      singleSelection: {
        asPlainText: true
      },
      options: props.visOptions,
      selectedOptions: props.selectedVisOption,
      onChange: newOption => {
        props.setSelectedVisOption(newOption);
        props.setIsOutputStale(true);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
      grow: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
      onClick: () => {
        setSelectableOptions(props.visOptions);
        setSelectableError(false);
        setIsModalOpen(true);
      }
    }, "Browse")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
      grow: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
      grow: 9
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFormRow"], {
      label: "Date range",
      fullWidth: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSuperDatePicker"], {
      start: props.startTime,
      end: props.endTime,
      showUpdateButton: false,
      dateFormat: "MM/DD/YYYY hh:mm:ss A",
      onTimeChange: e => {
        props.setStartTime(e.start);
        props.setEndTime(e.end);
        props.setIsOutputStale(true);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], null)), isModalOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiModal"], {
      onClose: () => setIsModalOpen(false),
      style: {
        width: 500
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiModalHeader"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiModalHeaderTitle"], null, "Browse Kibana visualizations")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSelectable"], {
      "aria-label": "Searchable Visualizations",
      searchable: true,
      options: selectableOptions,
      singleSelection: true,
      renderOption: renderOption,
      onChange: newOptions => {
        setSelectableOptions(newOptions);
        setSelectableError(false);
      }
    }, (list, search) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, search, list)), selectableError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
      size: "s"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], {
      color: "danger",
      size: "s"
    }, 'Visualization is required.'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButtonEmpty"], {
      onClick: () => setIsModalOpen(false)
    }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
      onClick: () => onSelect(),
      fill: true
    }, "Select")))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    hidden: para.isInputHidden
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__["Prompt"], {
    blank: true,
    running: para.isRunning,
    queued: para.inQueue
  }), para.isVizualisation ? renderVisInput() : renderParaInput());
};

/***/ }),

/***/ "./public/components/paragraph_components/para_output.tsx":
/*!****************************************************************!*\
  !*** ./public/components/paragraph_components/para_output.tsx ***!
  \****************************************************************/
/*! exports provided: ParaOutput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParaOutput", function() { return ParaOutput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nteract/presentational-components */ "./node_modules/@nteract/presentational-components/lib/index.js");
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nteract_outputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nteract/outputs */ "./node_modules/@nteract/outputs/lib/index.js");
/* harmony import */ var _nteract_outputs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nteract_outputs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nteract_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nteract/markdown */ "./node_modules/@nteract/markdown/lib/index.js");
/* harmony import */ var _nteract_markdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nteract_markdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common */ "./common/index.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */







/*
 * "ParaOutput" component is used by notebook to populate paragraph outputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 *
 * Outputs component of nteract used as a container for notebook UI.
 * https://components.nteract.io/#outputs
 */

const ParaOutput = props => {
  const outputBody = (key, typeOut, val) => {
    var _visInput$timeRange, _visInput$timeRange2;

    /* Returns a component to render paragraph outputs using the para.typeOut property
     * Currently supports HTML, TABLE, IMG
     * TODO: add table rendering
     */
    if (typeOut !== undefined) {
      switch (typeOut) {
        case 'MARKDOWN':
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiText"], {
            key: key,
            className: "markdown-output-text"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_markdown__WEBPACK_IMPORTED_MODULE_3___default.a, {
            source: val
          }));

        case 'VISUALIZATION':
          let from = moment__WEBPACK_IMPORTED_MODULE_6___default()(visInput === null || visInput === void 0 ? void 0 : (_visInput$timeRange = visInput.timeRange) === null || _visInput$timeRange === void 0 ? void 0 : _visInput$timeRange.from).format(_common__WEBPACK_IMPORTED_MODULE_5__["DATE_FORMAT"]);
          let to = moment__WEBPACK_IMPORTED_MODULE_6___default()(visInput === null || visInput === void 0 ? void 0 : (_visInput$timeRange2 = visInput.timeRange) === null || _visInput$timeRange2 === void 0 ? void 0 : _visInput$timeRange2.to).format(_common__WEBPACK_IMPORTED_MODULE_5__["DATE_FORMAT"]);
          from = from === 'Invalid date' ? visInput.timeRange.from : from;
          to = to === 'Invalid date' ? visInput.timeRange.to : to;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiText"], {
            size: "s",
            style: {
              marginLeft: 9
            }
          }, `${from} - ${to}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DashboardContainerByValueRenderer, {
            key: key,
            input: visInput,
            onInputUpdated: setVisInput
          }));

        case 'HTML':
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_4__["EuiText"], {
            key: key
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_outputs__WEBPACK_IMPORTED_MODULE_2__["Media"].HTML, {
            data: val
          }));

        case 'TABLE':
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
            key: key
          }, val);

        case 'IMG':
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
            alt: "",
            src: 'data:image/gif;base64,' + val,
            key: key
          });

        default:
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
            key: key
          }, val);
      }
    } else {
      console.log('output not supported', typeOut);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null);
    }
  };

  const {
    para,
    DashboardContainerByValueRenderer,
    visInput,
    setVisInput
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_1__["Outputs"], {
    hidden: para.isOutputHidden
  }, para.typeOut.map((typeOut, tIdx) => outputBody(para.uniqueId + '_paraOutputBody', typeOut, para.out[tIdx])));
};

/***/ }),

/***/ "./public/components/paragraph_components/paragraphs.tsx":
/*!***************************************************************!*\
  !*** ./public/components/paragraph_components/paragraphs.tsx ***!
  \***************************************************************/
/*! exports provided: Paragraphs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Paragraphs", function() { return Paragraphs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nteract/presentational-components */ "./node_modules/@nteract/presentational-components/lib/index.js");
/* harmony import */ var _nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _elastic_eui_lib_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @elastic/eui/lib/services */ "@elastic/eui/lib/services");
/* harmony import */ var _elastic_eui_lib_services__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui_lib_services__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_plugins_embeddable_public__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../src/plugins/embeddable/public */ "plugin/embeddable/public");
/* harmony import */ var _src_plugins_embeddable_public__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_src_plugins_embeddable_public__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _para_output__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./para_output */ "./public/components/paragraph_components/para_output.tsx");
/* harmony import */ var _para_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./para_input */ "./public/components/paragraph_components/para_input.tsx");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../common */ "./common/index.ts");
/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */









/*
 * "Paragraphs" component is used to render cells of the notebook open and "add para div" between paragraphs
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
 * dateModified - last modified time of paragraph
 * index - index of paragraph in the notebook
 * paragraphSelector - function used to select a para on click
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 * addPara - function to add a new para onclick - "Add Para" Div
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * deleteVizualization - function to delete a para
 * http object - for making API requests
 * selectedViewId - selected view: view_both, input_only, output_only
 * deletePara - function to delete the selected para
 * runPara - function to run the selected para
 * clonePara - function to clone the selected para
 * clearPara - function to clear output of all the paras
 * movePara - function to move a paragraph at an index to another index
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */

const Paragraphs = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])((props, ref) => {
  const {
    para,
    index,
    paragraphSelector,
    textValueEditor,
    handleKeyPress,
    addPara,
    DashboardContainerByValueRenderer,
    deleteVizualization,
    http
  } = props;
  const [visOptions, setVisOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]); // options for loading saved visualizations

  const [isPopoverOpen, setIsPopoverOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [runParaError, setRunParaError] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [selectedVisOption, setSelectedVisOption] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [visInput, setVisInput] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(undefined);
  const [toggleVisEdit, setToggleVisEdit] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false); // output is available if it's not cleared and vis paragraph has a selected visualization

  const isOutputAvailable = para.out.length > 0 && para.out[0] !== '' || para.isVizualisation && para.typeOut.length > 0 && visInput !== undefined;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, () => ({
    runParagraph() {
      return onRunPara();
    }

  }));
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (para.isVizualisation) {
      if (para.visSavedObjId !== '') setVisInput(JSON.parse(para.vizObjectInput));
      http.get(`${_common__WEBPACK_IMPORTED_MODULE_8__["API_PREFIX"]}/visualizations`).then(res => {
        const opt = res.savedVisualizations.map(vizObject => ({
          label: vizObject.label,
          key: vizObject.key
        }));
        setVisOptions(opt);
        setSelectedVisOption(opt.filter(o => o.key === para.visSavedObjId));
      }).catch(err => console.error('Fetching visualization issue', err.body.message));
    }
  }, []);

  const createNewVizObject = objectId => {
    const vizUniqueId = Object(_elastic_eui_lib_services__WEBPACK_IMPORTED_MODULE_4__["htmlIdGenerator"])()(); // a dashboard container object for new visualization

    const newVizObject = {
      viewMode: _src_plugins_embeddable_public__WEBPACK_IMPORTED_MODULE_5__["ViewMode"].VIEW,
      panels: {
        '1': {
          gridData: {
            x: 0,
            y: 0,
            w: 50,
            h: 20,
            i: '1'
          },
          type: 'visualization',
          explicitInput: {
            id: '1',
            savedObjectId: objectId
          }
        }
      },
      isFullScreenMode: false,
      filters: [],
      useMargins: false,
      id: vizUniqueId,
      timeRange: {
        to: para.visEndTime,
        from: para.visStartTime
      },
      title: 'embed_viz_' + vizUniqueId,
      query: {
        query: '',
        language: 'lucene'
      },
      refreshConfig: {
        pause: true,
        value: 15
      }
    };
    return newVizObject;
  };

  const onRunPara = () => {
    if (!para.isVizualisation && !para.inp || para.isVizualisation && selectedVisOption.length === 0) {
      setRunParaError(true);
      return;
    }

    let newVisObjectInput = undefined;

    if (para.isVizualisation) {
      const inputTemp = createNewVizObject(selectedVisOption[0].key);
      setVisInput(inputTemp);
      setRunParaError(false);
      newVisObjectInput = JSON.stringify(inputTemp);
    }

    setRunParaError(false);
    return props.runPara(para, index, newVisObjectInput);
  };

  const setStartTime = time => {
    const newPara = props.para;
    newPara.visStartTime = time;
    props.setPara(newPara);
  };

  const setEndTime = time => {
    const newPara = props.para;
    newPara.visEndTime = time;
    props.setPara(newPara);
  };

  const setIsOutputStale = isStale => {
    const newPara = props.para;
    newPara.isOutputStale = isStale;
    props.setPara(newPara);
  }; // do not show output if it is a visualization paragraph and visInput is not loaded yet


  const paraOutput = (!para.isVizualisation || visInput) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_para_output__WEBPACK_IMPORTED_MODULE_6__["ParaOutput"], {
    key: para.uniqueId,
    para: para,
    visInput: visInput,
    setVisInput: setVisInput,
    DashboardContainerByValueRenderer: DashboardContainerByValueRenderer
  }); // do not show input and EuiPanel if view mode is output_only

  if (props.selectedViewId === 'output_only') {
    return paraOutput;
  }

  const renderParaHeader = (type, index) => {
    const panels = [{
      id: 0,
      title: 'Paragraph actions',
      items: [{
        name: 'Insert paragraph above',
        panel: 1
      }, {
        name: 'Insert paragraph below',
        panel: 2
      }, {
        name: 'Run input',
        onClick: () => {
          setIsPopoverOpen(false);
          onRunPara();
        }
      }, {
        name: 'Move up',
        disabled: index === 0,
        onClick: () => {
          setIsPopoverOpen(false);
          props.movePara(index, index - 1);
        }
      }, {
        name: 'Move to top',
        disabled: index === 0,
        onClick: () => {
          setIsPopoverOpen(false);
          props.movePara(index, 0);
        }
      }, {
        name: 'Move down',
        disabled: index === props.paraCount - 1,
        onClick: () => {
          setIsPopoverOpen(false);
          props.movePara(index, index + 1);
        }
      }, {
        name: 'Move to bottom',
        disabled: index === props.paraCount - 1,
        onClick: () => {
          setIsPopoverOpen(false);
          props.movePara(index, props.paraCount - 1);
        }
      }, {
        name: 'Duplicate',
        onClick: () => {
          setIsPopoverOpen(false);
          props.clonePara(para, index + 1);
        }
      }, {
        name: 'Delete',
        onClick: () => {
          setIsPopoverOpen(false);
          props.deletePara(para, index);
        }
      }]
    }, {
      id: 1,
      title: 'Insert paragraph above',
      items: [{
        name: 'Markdown',
        onClick: () => {
          setIsPopoverOpen(false);
          props.addPara(index, '', 'CODE');
        }
      }, {
        name: 'Visualization',
        onClick: () => {
          setIsPopoverOpen(false);
          props.addPara(index, '', 'VISUALIZATION');
        }
      }]
    }, {
      id: 2,
      title: 'Insert paragraph below',
      items: [{
        name: 'Markdown',
        onClick: () => {
          setIsPopoverOpen(false);
          props.addPara(index + 1, '', 'CODE');
        }
      }, {
        name: 'Visualization',
        onClick: () => {
          setIsPopoverOpen(false);
          props.addPara(index + 1, '', 'VISUALIZATION');
        }
      }]
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], {
      style: {
        fontSize: 17
      }
    }, `[${index + 1}] ${type} `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButtonIcon"], {
      "aria-label": "Toggle show input",
      iconType: para.isInputExpanded ? "arrowUp" : "arrowDown",
      onClick: () => {
        const newPara = props.para;
        newPara.isInputExpanded = !newPara.isInputExpanded;
        props.setPara(newPara);
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
      grow: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPopover"], {
      panelPaddingSize: "none",
      withTitle: true,
      button: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButtonIcon"], {
        "aria-label": "Open paragraph menu",
        iconType: "boxesHorizontal",
        onClick: () => setIsPopoverOpen(true)
      }),
      isOpen: isPopoverOpen,
      closePopover: () => setIsPopoverOpen(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiContextMenu"], {
      initialPanelId: 0,
      panels: panels
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
      size: "s"
    }));
  };

  const renderOutputTimestampMessage = () => {
    if (props.selectedViewId === 'view_both') {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }, para.isOutputStale ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
        type: "questionInCircle",
        color: "primary"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
        type: "check",
        color: "secondary"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], {
        color: "subdued"
      }, `Last run ${moment__WEBPACK_IMPORTED_MODULE_1___default()(props.dateModified).format(_common__WEBPACK_IMPORTED_MODULE_8__["DATE_FORMAT"])}. ${para.isOutputStale ? 'Output below is stale.' : 'Output reflects the latest input.'}`)));
    } else {
      // render message when view mode is input_only
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
        type: "questionInCircle",
        color: "primary"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], {
        color: "subdued"
      }, `Output available from ${moment__WEBPACK_IMPORTED_MODULE_1___default()(props.dateModified).format(_common__WEBPACK_IMPORTED_MODULE_8__["DATE_FORMAT"])}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiLink"], {
        onClick: () => props.setSelectedViewId('view_both', index)
      }, "View both"))));
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPanel"], null, renderParaHeader(para.isVizualisation ? 'Kibana visualization' : 'Markdown', index), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_nteract_presentational_components__WEBPACK_IMPORTED_MODULE_2__["Cell"], {
    key: index,
    onClick: () => paragraphSelector(index)
  }, para.isInputExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
    size: "s"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_para_input__WEBPACK_IMPORTED_MODULE_7__["ParaInput"], {
    para: para,
    index: index,
    runParaError: runParaError,
    textValueEditor: textValueEditor,
    handleKeyPress: handleKeyPress,
    startTime: para.visStartTime,
    setStartTime: setStartTime,
    endTime: para.visEndTime,
    setEndTime: setEndTime,
    setIsOutputStale: setIsOutputStale,
    visOptions: visOptions,
    selectedVisOption: selectedVisOption,
    setSelectedVisOption: setSelectedVisOption
  }), runParaError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiText"], {
    color: "danger",
    size: "s"
  }, `${para.isVizualisation ? 'Visualization' : 'Input'} is required.`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
    size: "m"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexGroup"], {
    alignItems: "center",
    gutterSize: "s"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
    grow: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
    onClick: () => onRunPara()
  }, isOutputAvailable ? 'Refresh' : 'Run')), isOutputAvailable && renderOutputTimestampMessage()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
    size: "m"
  })), props.selectedViewId !== 'input_only' && isOutputAvailable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiHorizontalRule"], {
    margin: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      opacity: para.isOutputStale ? 0.5 : 1
    }
  }, paraOutput)))));
});

/***/ })

}]);
//# sourceMappingURL=1.plugin.js.map