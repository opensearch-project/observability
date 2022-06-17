/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
import {
    EuiButton,
    EuiAccordion,
    EuiFormRow,
    EuiColorPicker,
    EuiSpacer,
    EuiIcon,
    EuiFlexGroup,
    EuiFlexItem,
    htmlIdGenerator,
    EuiComboBox,
} from '@elastic/eui';
import { isEmpty } from 'lodash';


export const ConfigColorTheme = ({
    visualizations,
    schemas,
    vizState = [],
    handleConfigChange,
    sectionName = 'Color Theme',
}: any) => {
    const { data } = visualizations;
    const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

    const addButtonText = '+ Add color theme';
    const getColorThemeRow = () => ({
        ctid: htmlIdGenerator('ct')(),
        name: '',
        color: '#FC0505',
    })

    const options = fields.map((item) => ({
        ...item,
        label: item.name,
    }));

    const getUpdatedOptions = () => options.filter(option => !vizState.some(vizOpt =>
        option.name === vizOpt?.name?.name
    ))

    const handleAddColorTheme = useCallback(() => {
        let res = vizState;
        if (isEmpty(vizState)) res = [];
        handleConfigChange([getColorThemeRow(), ...res]);
    }, [vizState, handleConfigChange]);

    const handleColorThemeChange = useCallback(
        (ctId, ctName) => {
            return (event) => {
                handleConfigChange([
                    ...vizState.map((ct) => {
                        if (ctId !== ct.ctid) return ct;
                        return {
                            ...ct,
                            [ctName]: (ctName === 'color' ? event : event[0]) || '',
                        };
                    }),
                ]);
            };
        },
        [vizState, handleConfigChange]
    );

    const handleColorThemeDelete = useCallback(
        (ctId) => {
            return (event) => {
                handleConfigChange([...vizState.filter((ct) => ct.ctid !== ctId)]);
            };
        },
        [vizState, handleConfigChange]
    );
    return (
        <EuiAccordion
            initialIsOpen
            id={`configPanel__${sectionName}`}
            buttonContent={sectionName}
            paddingSize="s"
        >
            <EuiButton fullWidth size="s" onClick={handleAddColorTheme}>
                {addButtonText}
            </EuiButton>
            <EuiSpacer size="s" />
            {!isEmpty(vizState) &&
                vizState.map((ct) => {
                    return (
                        <>
                            <EuiFormRow fullWidth label="">
                                <EuiFlexGroup alignItems="center" gutterSize="xs">
                                    <EuiFlexItem grow={3}>
                                        <EuiFormRow helpText="Color">
                                            <EuiColorPicker
                                                fullWidth
                                                onChange={handleColorThemeChange(ct.ctid, 'color')}
                                                color={ct.color}
                                            />
                                        </EuiFormRow>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={4}>
                                        <EuiFormRow helpText="Field">
                                            <EuiComboBox
                                                id={ct.ctid}
                                                placeholder="Select a field"
                                                options={getUpdatedOptions()}
                                                singleSelection
                                                selectedOptions={ct.name !== '' ? [ct.name] : []}
                                                onChange={handleColorThemeChange(ct.ctid, 'name')}
                                                aria-label="Use aria labels when no actual label is in use"
                                            />
                                        </EuiFormRow>
                                    </EuiFlexItem>
                                    <EuiFlexItem grow={1}>
                                        <EuiFormRow>
                                            <EuiIcon type="trash" onClick={handleColorThemeDelete(ct.ctid)} />
                                        </EuiFormRow>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiFormRow>
                        </>
                    );
                })}
        </EuiAccordion>
    );
};