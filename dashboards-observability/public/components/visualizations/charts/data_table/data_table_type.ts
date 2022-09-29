/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataTable } from './data_table';
import { getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartDatatable } from '../../assets/chart_datatable';

const VIS_CATEGORY = getPlotlyCategory();

export const createDatatableTypeDefinition = (params: any = {}) => ({
  name: 'data_table',
  type: 'data_table',
  id: 'data_table',
  label: 'Data Table',
  fulllabel: 'Data Table',
  icontype: 'visTable',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartDatatable,
  editorconfig: {
    editor: null,
    schemas: [
      {
        name: 'Columns',
        isSingleSelection: true,
        onChangeHandler: 'setXaxisSelections',
        component: null,
        mapTo: 'xaxis',
      },
    ],
  },
  component: DataTable,
});
