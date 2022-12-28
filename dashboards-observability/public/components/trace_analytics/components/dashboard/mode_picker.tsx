import { EuiButtonEmpty, EuiPopover, EuiPopoverTitle, EuiSelectable } from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { TraceAnalyticsMode } from "../../home";

export type mode = {
    id: string;
    title: string;
}

const labels = new Map([['jaeger', 'Jaeger'], ['data_prepper', 'Data Prepper']]);


export function DataSourcePicker(props: {modes: {
    id: string;
    title: string;
}[], selectedMode: TraceAnalyticsMode, setMode : (mode: TraceAnalyticsMode) => void}) {
    const { modes, selectedMode, setMode } = props;
    const [isPopoverOpen, setPopoverIsOpen] = useState(false);
    const [selected, setSelected] = useState(selectedMode);

    const trigger = {
        label: labels.get(selected),
        title: selected,
        'data-test-subj': 'indexPattern-switch-link',
        className: 'dscIndexPattern__triggerButton',
    }

    const createTrigger = () => {
        const { label, title, ...rest } = trigger;
        return (
            <EuiButtonEmpty
                flush="left"
                color="text"
                iconSide="right"
                iconType="arrowDown"
                title={title}
                onClick={() => setPopoverIsOpen(!isPopoverOpen)}
                {...rest}
                >
                {label}
            </EuiButtonEmpty>
        );
    };

    return (
        <>
            <EuiPopover
                button={createTrigger()}
                isOpen={isPopoverOpen}
                closePopover={() => setPopoverIsOpen(false)}
                className="eui-textTruncate"
                anchorClassName="eui-textTruncate"
                display="block"
                panelPaddingSize="s"
                ownFocus
            >
            <div style={{ width: 320 }}>
            <EuiPopoverTitle>
                {"Choose data type"}
            </EuiPopoverTitle>
            <EuiSelectable
                data-test-subj="indexPattern-switcher"
                searchable
                singleSelection="always"
                options={modes.map((x) => ({
                                label: x.title,
                                key: x.id,
                                value: x.id,
                                checked: x.id === selected ? 'on' : undefined,
                            }))}
                onChange={(choices) => {
                    const choice = (choices.find(({ checked }) => checked) as unknown) as {
                        value: string;
                        label: string;
                        key: TraceAnalyticsMode;
                    };
                    setMode(choice.key);
                    setSelected(choice.key);
                    setPopoverIsOpen(false);
                    sessionStorage.setItem('TraceAnalyticsMode', choice.key);
                }}
                searchProps={{
                    compressed: true,
                }}
                >
                {(list, search) => (
                    <>
                    {search}
                    {list}
                    </>
                )}
            </EuiSelectable>
        </div>
        </EuiPopover>
        </>
      );
}