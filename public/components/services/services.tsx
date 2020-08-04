import React, { useEffect } from 'react'
import { EuiTitle } from '@elastic/eui'
import SearchBar from '../common/search_bar'
import { EuiSpacer } from '@elastic/eui'
import { ServicesTable } from './services_table'

export function Services(props) {
  
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
      <EuiTitle size='l'><h2 style={{ fontWeight: 430 }}>Services</h2></EuiTitle>
      <SearchBar />
      <EuiSpacer size='m' />
      <ServicesTable />
    </>
  )
}
