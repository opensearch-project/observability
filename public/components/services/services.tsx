import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { CoreDeps } from '../app';
import { SearchBar, SearchBarProps } from '../common';
import { ServicesTable } from './services_table';

interface ServicesProps extends SearchBarProps, CoreDeps { }

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
  }, []);

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Services</h2>
      </EuiTitle>
      <SearchBar
        query={props.query}
        setQuery={props.setQuery}
        startTime={props.startTime}
        setStartTime={props.setStartTime}
        endTime={props.endTime}
        setEndTime={props.setEndTime}
      />
      <EuiSpacer size="m" />
      <ServicesTable http={props.http} />
    </>
  );
}
