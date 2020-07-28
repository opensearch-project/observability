import React from 'react'
import { EuiFlexGroup, EuiFlexItem, EuiLink, EuiText, EuiSuperSelect } from '@elastic/eui'
import { PanelTitle } from '../common/panel_title'
import { EuiPanel, EuiSpacer } from '@elastic/eui'
import { EuiHorizontalRule } from '@elastic/eui'

export function ErrorRatePlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title='Error rate over time' />
        <EuiSpacer size='m' />
        <EuiHorizontalRule />
        <div style={{width: 400, height: 200}}></div>
      </EuiPanel>
      </>
  )
}
