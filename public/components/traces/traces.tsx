import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { SearchBar } from '../common/search_bar';
import { TracesTable } from './traces_table';
import { setBreadcrumbsType } from '../app';

interface TracesProps {
  setBreadcrumbs: setBreadcrumbsType;
}

export function Traces(props: TracesProps) {
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Traces',
        href: '#traces',
      },
    ]);
  });

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Traces</h2>
      </EuiTitle>
      <SearchBar />
      <EuiSpacer size="m" />
      <TracesTable />
    </>
  );
}
