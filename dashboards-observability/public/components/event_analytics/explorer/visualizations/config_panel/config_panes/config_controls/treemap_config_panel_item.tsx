/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexItem,
  EuiFormRow,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import { useDispatch } from 'react-redux';
import { ConfigTreemapParentFields } from './config_treemap_parents';
import {
  AGGREGATIONS,
  GROUPBY,
  NUMERICAL_TYPES,
} from '../../../../../../../../common/constants/explorer';
import { DataConfigPanelProps } from '../../../../../../../../common/types/explorer';
import { TabContext } from '../../../../../hooks';
import { ConfigTreemapParentFields } from './config_treemap_parents';
import { DataConfigItemClickPanel } from './data_config_item_click_panel';
import {
  DataConfigPanelProps,
  ParentUnitType,
} from '../../../../../../../../common/types/explorer';

export const TreemapConfigPanelItem = ({
  fieldOptionList,
  visualizations,
}: DataConfigPanelProps) => {
  const dispatch = useDispatch();
  const { tabId, curVisId, changeVisualizationConfig, fetchData, handleQueryChange } = useContext<
    any
  >(TabContext);

  const { data } = visualizations;
  const { userConfigs } = data;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const newEntry = { label: '', name: '' };
  const initialParentState = {
    name: '',
    label: '',
    type: '',
  };
  const [configList, setConfigList] = useState({
    [GROUPBY]: [{ childField: { ...newEntry }, parentFields: [] }],
    [AGGREGATIONS]: [{ valueField: { ...newEntry } }],
  });
  const [selectedParentItem, setSelectedParentItem] = useState<{
    isClicked: boolean;
    index: number;
  }>({ isClicked: false, index: -1 });

  useEffect(() => {
    if (userConfigs && userConfigs.dataConfig) {
      setConfigList({
        ...userConfigs.dataConfig,
      });
    }
  }, [userConfigs?.dataConfig, visualizations.vis.name]);

  const updateList = (configName: string, fieldName: string, value: string | any[]) => {
    let listItem = { ...configList[configName][0] };

    const newField = {
      label: value,
      name: value,
      type: value !== '' ? fields.find((x) => x.name === value)?.type : '',
    };
    listItem = { ...listItem, [fieldName]: typeof value === 'string' ? newField : value };
    const newList = {
      ...configList,
      [configName]: [listItem],
    };
    setConfigList(newList);
  };

  const updateChart = () => {
    dispatch(
      changeVisualizationConfig({
        tabId,
        vizId: curVisId,
        data: {
          ...userConfigs,
          dataConfig: {
            ...userConfigs.dataConfig,
            [GROUPBY]: configList[GROUPBY],
            [AGGREGATIONS]: configList[AGGREGATIONS],
          },
        },
      })
    );
  };

  const getOptionsAvailable = (sectionName: string) => {
    const { dimensions, series } = configList;
    let selectedFields = {};
    let allSelectedFields = [];

    for (const key in configList) {
      if (key === 'dimensions') {
        const [dimElements] = dimensions;
        const { childField, parentFields } = dimElements;
        allSelectedFields = [childField, ...parentFields];
      } else if (key === AGGREGATIONS) {
        const [seriesElement] = series;
        allSelectedFields = [seriesElement.valueField];
      }
      const allValidSelectedFields = allSelectedFields.filter((item) => item?.label);
      allValidSelectedFields.length > 0 &&
        allValidSelectedFields.forEach((field) => (selectedFields[field.label] = true));
    }

    const unselectedFields = fieldOptionList.filter((field) => !selectedFields[field.label]);
    return sectionName === AGGREGATIONS
      ? unselectedFields.filter((field) => NUMERICAL_TYPES?.includes(field.type))
      : unselectedFields;
  };

  const options = getOptionsAvailable(DIMENSIONS).map((opt) => ({
    label: opt.label,
    name: opt.name,
  }));

  const renderParentPanel = () => {
    const selectedAxis = configList.dimensions[0]?.parentFields;
    const { index } = selectedParentItem;
    return (
      <>
        <DataConfigItemClickPanel
          isSecondary
          title={`Parent ${index + 1}`}
          closeMenu={() => isHandlePanelClickBack(selectedAxis)}
        />
        <EuiComboBox
          id={uniqueId('axis-select-')}
          placeholder="Select a field"
          options={options}
          selectedOptions={selectedAxis[index].label !== '' ? [selectedAxis[index]] : []}
          isClearable={true}
          singleSelection={{ asPlainText: true }}
          onChange={handleParentChange}
          aria-label="Parent field"
        />
      </>
    );
  };
  const handleUpdateParentFields = (arr: ParentUnitType[]) =>
    updateList(DIMENSIONS, PARENTFIELDS, arr);

  const handleParentChange = (values: Array<EuiComboBoxOptionOption<unknown>>) => {
    const selectedAxis = configList.dimensions[0]?.parentFields;
    const { index } = selectedParentItem;
    const val = [
      ...selectedAxis.slice(0, index),
      (values[0] as ParentUnitType) ?? initialParentState,
      ...selectedAxis.slice(index + 1, selectedAxis.length),
    ];
    handleUpdateParentFields(val);
  };

  const isHandlePanelClickBack = (selectedAxis: ParentUnitType[]) => {
    const { index } = selectedParentItem;
    if (selectedAxis[index].name === '') {
      const arr = [
        ...selectedAxis.slice(0, index),
        ...selectedAxis.slice(index + 1, selectedAxis.length),
      ];
      handleUpdateParentFields(arr);
    }
    setSelectedParentItem({ isClicked: false, index: -1 });
  };

  return selectedParentItem.isClicked ? (
    renderParentPanel()
  ) : (
    <div style={{ height: 'auto' }}>
      <EuiTitle size="xxs">
        <h3>Data Configurations</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Dimensions</h3>
      </EuiTitle>
      <div className="first-division">
        <EuiPanel color="subdued">
          <EuiFormRow label="Child Field">
            <EuiComboBox
              placeholder="Select a field"
              options={getOptionsAvailable(GROUPBY)}
              selectedOptions={
                configList.dimensions[0].childField?.label !== ''
                  ? [{ label: configList.dimensions[0].childField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList(GROUPBY, 'childField', val.length > 0 ? val[0].label : '')
              }
            />
          </EuiFormRow>

          <EuiSpacer size="s" />
          <EuiTitle size="xxxs">
            <h3>Parent Fields</h3>
          </EuiTitle>
          <ConfigTreemapParentFields
            dropdownList={getOptionsAvailable(GROUPBY).map((opt) => ({
              label: opt.label,
              name: opt.label,
            }))}
            selectedAxis={configList.dimensions[0]?.parentFields}
            onSelectChange={(val) => updateList(GROUPBY, 'parentFields', val)}
          />
          <EuiSpacer size="s" />
        </EuiPanel>
      </div>
      <EuiSpacer size="s" />
      <EuiTitle size="xxs">
        <h3>Metrics</h3>
      </EuiTitle>
      <div className="first-division">
        <EuiPanel color="subdued">
          <EuiFormRow label="Value Field">
            <EuiComboBox
              placeholder="Select a field"
              options={getOptionsAvailable(AGGREGATIONS)}
              selectedOptions={
                configList[AGGREGATIONS][0].valueField?.label !== ''
                  ? [{ label: configList[AGGREGATIONS][0].valueField?.label }]
                  : []
              }
              singleSelection={{ asPlainText: true }}
              onChange={(val) =>
                updateList(AGGREGATIONS, 'valueField', val.length > 0 ? val[0].label : '')
              }
            />
          </EuiFormRow>
        </EuiPanel>
      </div>
      <EuiSpacer size="s" />
      <EuiSpacer size="s" />
      <EuiFlexItem grow={false}>
        <EuiButton
          data-test-subj="visualizeEditorRenderButton"
          iconType="play"
          onClick={() => updateChart()}
          size="s"
        >
          Update chart
        </EuiButton>
      </EuiFlexItem>
    </div>
  );
};
