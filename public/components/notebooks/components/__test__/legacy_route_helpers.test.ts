/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { RedirectProps } from 'react-router-dom';
import { convertLegacyNotebooksUrl } from '../helpers/legacy_route_helpers';

describe('Test legacy route helpers', () => {
  it('converts legacy notebooks url', () => {
    const locations = [
      {
        pathname: '/app/notebooks-dashboards',
        search: '',
        hash: '#/GQ5icXwBJCegTOBKO4Um',
      },
      {
        pathname: '/app/notebooks-dashboards',
        search: '?view=view_both',
        hash: '#/clPiPXwBEM7l9gC0xTpA',
      },
      {
        pathname: '/testBasePath/app/notebooks-dashboards',
        search: '?view=output_only&security_tenant=global',
        hash: `#/GQ5icXwBJCegTOBKO4Um?_g=(time:(from:'2021-10-15T20:25:09.556Z',to:'2021-10-15T20:55:09.556Z'))`,
      },
    ] as Location[];
    const expected = [
      '/app/observability#/notebooks/GQ5icXwBJCegTOBKO4Um',
      '/app/observability#/notebooks/clPiPXwBEM7l9gC0xTpA?view=view_both',
      `/testBasePath/app/observability#/notebooks/GQ5icXwBJCegTOBKO4Um?_g=(time:(from:'2021-10-15T20:25:09.556Z',to:'2021-10-15T20:55:09.556Z'))&view=output_only&security_tenant=global`,
    ] as RedirectProps['to'][];
    expect(locations.map((location) => convertLegacyNotebooksUrl(location))).toEqual(expected);
  });
});
