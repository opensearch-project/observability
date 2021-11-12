/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './field_button.scss';
import classNames from 'classnames';
import React, { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { CommonProps } from '@elastic/eui';

export interface FieldButtonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label for the button
   */
  fieldName: ReactNode;
  /**
   * Icon representing the field type.
   * Recommend using FieldIcon
   */
  fieldIcon?: ReactNode;
  /**
   * An optional node to place inside and at the end of the <button>
   */
  fieldInfoIcon?: ReactNode;
  /**
   * An optional node to place outside of and to the right of the <button>
   */
  fieldAction?: ReactNode;
  /**
   * Adds a forced focus ring to the whole component
   */
  isActive?: boolean;
  /**
   * Styles the component differently to indicate it is draggable
   */
  isDraggable?: boolean;
  /**
   * Use the small size in condensed areas
   */
  size?: ButtonSize;
  className?: string;
  /**
   * The component will render a `<button>` when provided an `onClick`
   */
  onClick?: () => void;
  /**
   * Applies to the inner `<button>`  or `<div>`
   */
  dataTestSubj?: string;
  /**
   * Pass more button props to the `<button>` element
   */
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
}

const sizeToClassNameMap = {
  s: 'osdFieldButton--small',
  m: null,
} as const;

export type ButtonSize = keyof typeof sizeToClassNameMap;

export const SIZES = Object.keys(sizeToClassNameMap) as ButtonSize[];

export function FieldButton({
  size = 'm',
  isActive = false,
  fieldIcon,
  fieldName,
  fieldInfoIcon,
  fieldAction,
  className,
  isDraggable = false,
  onClick,
  dataTestSubj,
  buttonProps,
  ...rest
}: FieldButtonProps) {
  const classes = classNames(
    'osdFieldButton',
    size ? sizeToClassNameMap[size] : null,
    { 'osdFieldButton-isActive': isActive },
    { 'osdFieldButton--isDraggable': isDraggable },
    className
  );

  const contentClasses = classNames('osd-resetFocusState', 'osdFieldButton__button');

  const innerContent = (
    <>
      {fieldIcon && <span className="osdFieldButton__fieldIcon">{fieldIcon}</span>}
      {fieldName && <span className="osdFieldButton__name">{fieldName}</span>}
      {fieldInfoIcon && <div className="osdFieldButton__infoIcon">{fieldInfoIcon}</div>}
    </>
  );

  return (
    <div className={classes} {...rest}>
      {onClick ? (
        <button
          onClick={(e) => {
            if (e.type === 'click') {
              e.currentTarget.focus();
            }
            onClick();
          }}
          data-test-subj={dataTestSubj}
          className={contentClasses}
          {...buttonProps}
        >
          {innerContent}
        </button>
      ) : (
        <div className={contentClasses} data-test-subj={dataTestSubj}>
          {innerContent}
        </div>
      )}

      {fieldAction && <div className="osdFieldButton__fieldAction">{fieldAction}</div>}
    </div>
  );
}
