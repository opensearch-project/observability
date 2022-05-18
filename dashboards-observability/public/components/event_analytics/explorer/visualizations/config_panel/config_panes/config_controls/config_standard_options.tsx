/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useMemo } from 'react';
import {
    EuiFieldNumber, EuiAccordion, EuiFormRow,
    EuiSpacer, EuiTitle, EuiButtonGroup
} from '@elastic/eui';
import { isEmpty } from 'lodash';

export const ConfigStandardOptions = ({
    visualizations,
    schemas,
    vizState,
    handleConfigChange
}: any
) => {
    const helpText = 'Leave empty to calculate based on all values';
    const handleChange = useCallback(
        (stateFiledName) => {
            return (changes) => {
                handleConfigChange({
                    ...vizState,
                    [stateFiledName]: changes,
                });
            };
        },
        [handleConfigChange, vizState]
    );

    const handleTextChange = useCallback(
        (stateFiledName) => {
            console.log(stateFiledName, 'State filed Name');
            return (changes) => {
                console.log(changes, 'changes');
                handleConfigChange({
                    ...vizState,
                    [stateFiledName]: changes,
                });
            };
        },
        [handleConfigChange, vizState]
    );
    const dimensions = useMemo(() => {
        return schemas.map((ele) => {
            console.log(schemas, 'schems');
            return (
                    <>
                    {ele.name !== 'Orientation' ?
                    <>
                        <EuiTitle size="xxs">
                            <h3>{ele.name}</h3>
                        </EuiTitle>
                        <EuiSpacer size="s" />
                        <EuiButtonGroup
                            key={ele.id}
                            legend={ele.name}
                            idSelected={vizState[ele.mapTo]}
                            onChange={handleTextChange(ele.mapTo)}
                            options={ele?.props?.dropdownList.map((option) => ({
                                id: option.id,
                                label: option.name,
                            }))}
                        /> </> : <></>
            }
            </>);
        });
    }, [schemas, handleTextChange]);

    return (
        <EuiAccordion initialIsOpen id="standard_options" buttonContent="Standard Options" paddingSize="s">
            {!isEmpty(schemas) &&
                schemas.map((ele) => {
                    return (
                        <>
                            {ele.name !== 'Orientation' ?
                                <EuiFormRow fullWidth label={ele.name} helpText={`${helpText}`}>
                                    <EuiFieldNumber
                                        fullWidth
                                        placeholder="auto"
                                        value={vizState[ele.mapTo] || ele.defaultState}
                                        onChange={e => handleChange(ele.mapTo)(e.target.value)}
                                        aria-label={ele.name}
                                        data-test-subj="valueFieldNumber"
                                    />
                                </EuiFormRow> :
                                { dimensions }}
                        </>
                    );

                })}
        </EuiAccordion>
    );
};
