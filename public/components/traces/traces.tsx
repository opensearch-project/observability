import React, { useEffect } from 'react'
import { EuiTitle } from '@elastic/eui'
import SearchBar from '../common/search_bar'
import { TracesTable } from './traces_table'
import { EuiSpacer } from '@elastic/eui'

export function Traces(props) {
  
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
      <EuiTitle size='l'><h2 style={{ fontWeight: 430 }}>Traces</h2></EuiTitle>
      <SearchBar />
      <EuiSpacer size='m' />
      <TracesTable />
      </>
  )
}
