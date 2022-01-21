// @ts-ignore

import hjson from 'hjson';
import defaultLayoutSpec from '!!raw-loader!./default.layout.spec.hjson';
import defaultDataSpec from '!!raw-loader!./default.data.spec.hjson';

// export const getDefaultSpec = (customVizConfigs) => {
//   console.log('customVizConfigs received: ', customVizConfigs);
//   if (customVizConfigs) return hjson.stringify(customVizConfigs);
//   return defaultSpec;
// };

export const getDefaultSpec = (type) => {
  if (type === 'data') return defaultDataSpec;
  return defaultLayoutSpec;
};
