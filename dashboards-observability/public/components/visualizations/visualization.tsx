/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isArray } from 'lodash';
import { VisualizationChart } from './visualization_chart';
import { EmptyPlaceholder } from '../event_analytics/explorer/visualizations/shared_components/empty_placeholder';

interface IVisualizationProps {}

export const Visualization = ({ visualizations }: IVisualizationProps) => {
  const { data, vis } = visualizations;
  const { metadata = {} } = visualizations?.data?.rawVizData;
  const { fields = [] } = metadata;

  // check viz data
  const isVizDataValid = data && vis && visualizations?.data?.rawVizData;

  // check fields
  const isVizFieldValid = fields && isArray(fields) && fields.length > 0;

  return (
    <>
      {isVizDataValid && isVizFieldValid ? (
        <VisualizationChart visualizations={visualizations} />
      ) : (
        <EmptyPlaceholder icon={visualizations?.vis?.iconType} />
      )}
    </>
  );
};
