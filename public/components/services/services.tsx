import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { setBreadcrumbsType } from '../app';
import { SearchBar } from '../common/search_bar';
import { ServicesTable } from './services_table';

interface ServicesProps {
  setBreadcrumbs: setBreadcrumbsType;
}

export function Services(props: ServicesProps) {
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Services',
        href: '#services',
      },
    ]);
  });

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Services</h2>
      </EuiTitle>
      <SearchBar />
      <EuiSpacer size="m" />
      <ServicesTable />
    </>
  );
}
