/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import { getVisType } from '../vis_types';
import { IVisualizationContainerProps, IField, IQuery } from '../../../../../common/types/explorer';

interface IVizContainerProps {
  vizId: string;
  appData?: { fromApp: boolean };
  rawVizData?: any;
  query?: IQuery;
  indexFields?: IField[];
  userConfigs?: any;
  defaultAxes?: {
    xaxis: IField[];
    yaxis: IField[];
  };
}

const getDefaultXYAxisLabels = (vizFields: IField[]) => {
  if (isEmpty(vizFields)) return {};
  const vizFieldsWithLabel = vizFields.map(vizField => ({ ...vizField, label: vizField.name }));
  return {
    xaxis: [vizFieldsWithLabel[vizFieldsWithLabel.length - 1]] || [],
    yaxis: take(vizFieldsWithLabel, vizFieldsWithLabel.length - 1 > 0 ? vizFieldsWithLabel.length - 1 : 1) || [],
  };
};

export const getVizContainerProps = ({
  vizId,
  rawVizData = {},
  query = {},
  indexFields = {},
  userConfigs = {},
  appData = {},
}: IVizContainerProps): IVisualizationContainerProps => {
  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: { ...userConfigs },
      defaultAxes: {
        ...getDefaultXYAxisLabels(rawVizData?.metadata?.fields),
      },
    },
    vis: {
      ...getVisType(vizId),
    },
  };
};
