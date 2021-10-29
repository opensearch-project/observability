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

import React, { useState, useMemo, useEffect, memo, FunctionComponent } from 'react';
import { debounce } from 'lodash';

/**
 * debouncedComponent wraps the specified React component, returning a component which
 * only renders once there is a pause in props changes for at least `delay` milliseconds.
 * During the debounce phase, it will return the previously rendered value.
 */
export function debouncedComponent<TProps>(component: FunctionComponent<TProps>, delay = 256) {
  const MemoizedComponent = (memo(component) as unknown) as FunctionComponent<TProps>;

  return (props: TProps) => {
    const [cachedProps, setCachedProps] = useState(props);
    const debouncePropsChange = useMemo(() => debounce(setCachedProps, delay), [setCachedProps]);

    // cancel debounced prop change if component has been unmounted in the meantime
    useEffect(() => () => debouncePropsChange.cancel(), [debouncePropsChange]);
    debouncePropsChange(props);

    return React.createElement(MemoizedComponent, cachedProps);
  };
}
