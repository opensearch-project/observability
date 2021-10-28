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

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiInMemoryTable, EuiPage, EuiPageBody, EuiPageContent, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTableFieldDataColumnType, EuiText, EuiTitle } from '@elastic/eui';
import CSS from 'csstype';
import React from 'react';

const pageStyles: CSS.Properties = {
    float: 'left',
    width: '100%',
    maxWidth: '1130px',
  };

const dummy = [{
    level: "Available",
    definition: "error rate below or equal to 1%",
    id: "1"
}];

const dummyLogSources = [
    {logName: "index_1"}, {logName: "ingest_logs_all"}
];

const dummyServicesEntities = [
    {serviceName: "Payment"}, {serviceName: "Users"}, {serviceName: "Purchase"}
];

const dummyTraceGroups = [
    {traceGroup: "Payment.auto"}, {traceGroup: "Users.admin"}, {traceGroup: "Purchase.source"}
];

export const Configuration = () => {

    const tableColumns = [
        {
          field: 'level',
          name: 'Level',
          render: (value) => value,
        },
        {
          field: 'definition',
          name: 'Definition',
          render: (value) => value,
        },
      ] as Array<
        EuiTableFieldDataColumnType<{
            level: string;
            id: string;
            definition: string;
        }>
      >;

    return (
        <div>
            <EuiPage>
                <EuiPageBody component="div">
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle size="s">
                            <h3>
                                Composition
                            </h3>
                            </EuiTitle>
                            </EuiPageContentHeaderSection>
                            <EuiPageContentHeaderSection>
                            <EuiFlexGroup gutterSize="s">
                            <EuiFlexItem>
                                <EuiButton fill onClick={() => {}}>
                                Edit composition
                                </EuiButton>
                            </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiHorizontalRule margin="m" />
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiText>
                                <h5>Log Sources</h5>
                                <ul style={{ listStyleType: "none" }}>
                                {dummyLogSources.map(function(item, index){
                                    return <li key={index}>{item.logName}</li>
                                })}
                                </ul>
                            </EuiText>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiText>
                                <h5>Services & Entities</h5>
                                <ul style={{ listStyleType: "none" }}>
                                {dummyServicesEntities.map(function(item, index){
                                    return <li key={index}>{item.serviceName}</li>
                                })}
                                </ul>
                            </EuiText>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiText>
                                <h5>Trace groups</h5>
                                <ul style={{ listStyleType: "none" }}>
                                {dummyTraceGroups.map(function(item, index){
                                    return <li key={index}>{item.traceGroup}</li>
                                })}
                                </ul>
                            </EuiText>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPageContent>
            </EuiPageBody>
            </EuiPage>
            <EuiPage>
                <EuiPageBody component="div">
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle size="s">
                            <h3>
                                Availability
                            </h3>
                            </EuiTitle>
                            </EuiPageContentHeaderSection>
                            <EuiPageContentHeaderSection>
                            <EuiFlexGroup gutterSize="s">
                            <EuiFlexItem>
                                <EuiButton fill onClick={() => {}}>
                                Edit availability
                                </EuiButton>
                            </EuiFlexItem>
                            </EuiFlexGroup>
                        </EuiPageContentHeaderSection>
                            </EuiPageContentHeader>
                            <EuiHorizontalRule margin="m" />
                                <EuiInMemoryTable 
                                    items={dummy}
                                    columns={tableColumns}
                                />
                </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        </div>
    )
}