// @ts-ignore

import hjson from 'hjson';
import defaultLayoutSpec from '!!raw-loader!./default.layout.spec.hjson';
import defaultDataSpec from '!!raw-loader!./default.data.spec.hjson';

export const getDefaultSpec = (type = 'layout') => {
  if (type === 'data') return defaultDataSpec;
  return defaultLayoutSpec;
};
