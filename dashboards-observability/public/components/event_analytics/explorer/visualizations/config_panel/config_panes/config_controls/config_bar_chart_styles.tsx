/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useCallback } from 'react';
import { EuiAccordion, EuiSpacer } from '@elastic/eui';
import { ButtonGroupItem } from './config_button_group';
import { IConfigPanelOptionSection } from '../../../../../../../../common/types/explorer';

export const ConfigBarChartStyles = ({
    visualizations,
    schemas,
    vizState,
    handleConfigChange,
    sectionName,
    sectionId = 'chartStyles'
}: any) => {
    const { data } = visualizations;
    const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

    const handleConfigurationChange = useCallback(
        (stateFieldName) => {
            return (changes) => {
                handleConfigChange({
                    ...vizState,
                    [stateFieldName]: changes,
                });
            };
        },
        [handleConfigChange, vizState]
    );

    /* To update the schema options based on current style mode selection */
    const currentSchemas = useMemo(() => {
        if (vizState?.orientation === 'h') {
            return schemas.filter((schema: IConfigPanelOptionSection) => schema.mapTo !== 'rotateBarLabels');
        }
        return schemas;
    }, [vizState]);

    const dimensions = useMemo(() =>
        currentSchemas.map((schema: IConfigPanelOptionSection, index: number) => {
            let params;
            const DimensionComponent = schema.component || ButtonGroupItem;
            if (schema.eleType === 'buttons') {
                params = {
                    title: schema.name,
                    legend: schema.name,
                    groupOptions: schema?.props?.options.map((btn: { name: string }) => ({ ...btn, label: btn.name })),
                    idSelected: vizState[schema.mapTo] || schema?.props?.defaultSelections[0]?.id,
                    handleButtonChange: handleConfigurationChange(schema.mapTo),
                    vizState,
                    ...schema.props,
                };
            } else if (schema.eleType === 'slider') {
                params = {
                    minRange: schema?.props?.min || 0,
                    maxRange: schema.props.max,
                    step: schema?.props?.step || 1,
                    title: schema.name,
                    currentRange: vizState[schema.mapTo] || schema?.defaultState,
                    ticks: schema?.props?.ticks,
                    showTicks: schema?.props?.showTicks || false,
                    handleSliderChange: handleConfigurationChange(schema.mapTo),
                    vizState,
                    ...schema.props,
                };
            }
            return (
                <>
                    <DimensionComponent key={`viz-series-${index}`} {...params} />
                    <EuiSpacer size="s" />
                </>
            )
        })
        , [schemas, vizState, handleConfigurationChange]);

    return (
        <EuiAccordion
            initialIsOpen
            id={`configPanel__${sectionId}`}
            buttonContent={sectionName}
            paddingSize="s"
        >
            {dimensions}
        </EuiAccordion>
    );
};
