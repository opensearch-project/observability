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

import React, { useState, Fragment } from 'react';
import { Cell } from '@nteract/presentational-components';
import { ParaOutput } from './para_output';
import { ParaInput } from './para_input';
import {
  EuiButtonEmpty,
  EuiForm,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSelectable,
} from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import { DashboardEmbeddableByValue } from './para_vizualizations';
import {
  DashboardStart,
  DashboardContainerInput,
} from '../../../../../src/plugins/dashboard/public';
import { ViewMode } from '../../../../../src/plugins/embeddable/public';
import moment from 'moment';
import { ParaType } from '../helpers/para_parsers';
import { CoreStart } from '../../../../../src/core/public';
import { getRequest } from '../helpers/request_containers';

/*
 * "Paragraphs" component is used to render cells of the notebook open and "add para div" between paragraphs
 *
 * Props taken in as params are:
 * para - parsed paragraph from nbcell
 * index - index of paragraph in the notebook
 * paraSelector - function used to select a para on click
 * cellHover - function used to highlight a para on hover
 * cellHoverReset - function used to reset all hover-highlighted paras
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 * paraHover - function used to detect hover on "Add Para" Div
 * addPara - function to add a new para onclick - "Add Para" Div
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * deleteViz -  function to delete a para
 * saveViz - function to save current visualization state
 * http object: for making API requests
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */
type ParagraphProps = {
  para: ParaType;
  index: number;
  paraSelector: (index: number) => void;
  cellHover: (para: ParaType) => void;
  cellHoverReset: () => void;
  textValueEditor: (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleKeyPress: (evt: React.KeyboardEvent<Element>, para: ParaType, index: number) => void;
  paraHover: (para: ParaType) => void;
  addPara: (index: number, newParaContent: string) => void;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  deleteViz: (uniqueId: string) => void;
  saveViz: (para: ParaType, vizContent: string) => void;
  http: CoreStart['http'];
};
export const Paragraphs = (props: ParagraphProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [currPara, setCurrPara] = useState(0);

  const {
    para,
    index,
    paraSelector,
    cellHover,
    cellHoverReset,
    textValueEditor,
    handleKeyPress,
    paraHover,
    addPara,
    DashboardContainerByValueRenderer,
    deleteViz,
    saveViz,
    http,
  } = props;

  const createNewVizObject = (objectId: string) => {
    const vizUniqueId = htmlIdGenerator()();
    const newVizObject: DashboardContainerInput = {
      viewMode: ViewMode.VIEW,
      panels: {
        '1': {
          gridData: {
            x: 15,
            y: 0,
            w: 20,
            h: 20,
            i: '1',
          },
          type: 'visualization',
          explicitInput: {
            id: '1',
            savedObjectId: objectId,
          },
        },
      },
      isFullScreenMode: false,
      filters: [],
      useMargins: false,
      id: vizUniqueId,
      timeRange: {
        to: moment(),
        from: moment().subtract(30, 'd'),
      },
      title: vizUniqueId + '_dashcontainer',
      query: {
        query: '',
        language: 'lucene',
      },
      refreshConfig: {
        pause: true,
        value: 15,
      },
    };
    return newVizObject;
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onSelectViz = (newOptions) => {
    setOptions(newOptions);
    const optedViz = newOptions.filter(filterObj);
    closeModal();
    const newVizObject = createNewVizObject(optedViz[0].key);
    addPara(currPara, '%sh #' + JSON.stringify(newVizObject));
  };

  const showModal = async (index: number) => {
    setCurrPara(index);
    // const url = new URL('/api/saved_objects/_find');
    // const params = { type: 'visualizaiton' };
    // url.search = new URLSearchParams(params).toString();
    // http
    //   .get('/api/saved_objects/_find', { query: 'visualization' })
    getRequest('../api/saved_objects/_find?type=visualization')
      .then((res) => {
        const opt = res.saved_objects.map((vObj) => ({
          label: vObj.attributes.title,
          key: vObj.id,
        }));
        setOptions(opt);
        setIsModalVisible(true);
      })
      .catch((err) => console.error('Fetching visualization error', err));
  };

  const filterObj = (vObj: { checked: string }) => {
    if (vObj.checked === 'on') {
      return vObj;
    }
  };

  const formSample = (
    <EuiForm>
      <Fragment>
        <EuiSelectable
          aria-label="Searchable Visualizations"
          searchable
          searchProps={{
            'data-test-subj': 'selectableSearchHere',
          }}
          options={options}
          onChange={(newOptions) => onSelectViz(newOptions)}
        >
          {(list, search) => (
            <Fragment>
              {search}
              {list}
            </Fragment>
          )}
        </EuiSelectable>
      </Fragment>
    </EuiForm>
  );

  const modalLayout = (
    <EuiOverlayMask>
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Saved Visualizations</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{formSample}</EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );

  const addNewDiv = (
    <div>
      <table className="hoveredDiv">
        <tbody>
          <tr>
            <td className="addParagraphButton" onClick={() => addPara(para.id, '%md\n')}>
              +Para
            </td>
            <td className="addVisualizationButton" onClick={() => showModal(para.id)}>
              +Viz
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* Render if para contains code */}
      {!para.isVizualisation && (
        <Cell
          key={index}
          _hovered={para.ishovered}
          isSelected={para.isSelected}
          onClick={() => paraSelector(index)}
          onMouseEnter={() => cellHover(para)}
          onMouseLeave={() => cellHoverReset()}
        >
          <ParaInput
            para={para}
            index={index}
            textValueEditor={textValueEditor}
            handleKeyPress={handleKeyPress}
          />
          <ParaOutput para={para} />
        </Cell>
      )}
      {/* Render if para contains visualization */}
      {para.isVizualisation && (
        <DashboardEmbeddableByValue
          DashboardContainerByValueRenderer={DashboardContainerByValueRenderer}
          vizContent={para.vizObjectInput}
          deleteViz={deleteViz}
          para={para}
          saveViz={saveViz}
        />
      )}
      {/* Div populated on hover for adding a new paragraph in notebook */}
      <div
        className="hoverDiv"
        onMouseEnter={() => paraHover(para)}
        onMouseLeave={() => paraHover(para)}
      >
        {para.showAddPara && addNewDiv}
      </div>
      {isModalVisible && modalLayout}
    </div>
  );
};
