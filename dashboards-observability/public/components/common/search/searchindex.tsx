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

import { EuiComboBox } from '@elastic/eui';
import React, { useState, useEffect, memo } from 'react';


export const IndexPicker = memo(function indexDropdown(props: any) {
  return <SearchIndex {...props} />;
});

interface Fetch {
  dslService: any;
  query: any;
  handleQueryChange: (query: string, index: string)  => void;
}

export function SearchIndex(options: Fetch) {

  const [indicesFromBackend, setindicesFromBackend] = useState([]);

  // fetch indices from backend
  const getIndices = async (dslService: any) => {
    if (indicesFromBackend.length === 0) {
      const indices = (await dslService.fetchIndices()).filter(
        ({ index }) => !index.startsWith('.')
      );
      for (let i = 0; i < indices.length; i++) {
        indicesFromBackend.push({
          label: indices[i].index,
        });
      }
    }
  };

  useEffect(() => {
    getIndices(options.dslService);
  }, []);

  const [selectedOptions, setSelected] = useState(
     []
  );

  // handle Index Change
  const onChange = (selectedOptions) => {
    options.handleQueryChange(options.query, selectedOptions);
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      placeholder="Select one or more index"
      options={indicesFromBackend}
      selectedOptions={selectedOptions}
      onChange={(e) => onChange(e)}
    />
  );
}
