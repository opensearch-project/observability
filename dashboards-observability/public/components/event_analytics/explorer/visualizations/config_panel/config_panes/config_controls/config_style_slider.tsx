/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { uniqueId } from 'lodash';
import { EuiTitle, EuiSpacer, EuiRange } from '@elastic/eui';

export interface EuiRangeTick {
    value: number;
    label: ReactNode;
}

interface Props {
    title: string;
    currentRange: string;
    minRange?: number;
    maxRange: number;
    showTicks?: boolean;
    ticks?: EuiRangeTick[];
    handleSliderChange: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

export const SliderConfig: React.FC<Props> = ({
    title, currentRange, handleSliderChange, minRange, maxRange, showTicks, ticks
}) => (
    <>
        <EuiTitle size="xxs">
            <h3>{title}</h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiRange
            aria-label="change lineWidth slider"
            id={uniqueId('inputRangeSlider-')}
            min={minRange}
            max={maxRange}
            name={title}
            value={currentRange}
            onChange={(e) => handleSliderChange(e.target.value)}
            showInput
            showTicks={showTicks}
            ticks={ticks}
        />
    </>
);