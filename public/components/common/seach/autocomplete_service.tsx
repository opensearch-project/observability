import React, { useState, useEffect, Fragment } from 'react';
import {
    EuiFieldSearch,
    EuiFlexItem,
    EuiListGroup,
    EuiListGroupItem,
    EuiText,
    EuiSelectableTemplateSitewide,
    EuiSelectableTemplateSitewideOption,
    EuiLink,
    EuiFlexGroup
  } from '@elastic/eui';
  import {
    IQueryBarProps
  } from './search';

const commands: EuiSelectableTemplateSitewideOption[] =[
        {label: 'dedup'},
        {label: 'eval'},
        {label: 'fields'},
        {label: 'rename'},
        {label: 'search'},
        {label: 'sort'},
        {label: 'stats'},
        {label: 'where'},
        {label: 'head'},
        {label: 'where'},
        {label: 'top'}
    ]
const getQuerySuggestions = () => {
    
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const searchValueExists = searchValue && searchValue.length;

    const recents = commands.slice(0, 5);

    const onChange = (updatedOptions: EuiSelectableTemplateSitewideOption[]) => {
        const clickedItem = updatedOptions.find(
            (option) => option.checked === 'on'
        );
        if (!clickedItem) return;
    }

    return (
        <EuiSelectableTemplateSitewide
            onChange={onChange}
            options={searchValueExists ? commands : recents}
            listProps = {{
                className: 'customListClass',
            }}
            popoverProps={{
                className: 'custoPopoverClass',
            }}
            popoverButtonBreakpoints={['xs', 's']}
            popoverFooter={
                <EuiText color="subdued" size="xs">
                    <EuiFlexGroup
                        alignItems="flexStart"
                        gutterSize="s"
                        responsive={false}
                        wrap>
                    </EuiFlexGroup>
                </EuiText>
            }
        />
    )
}

export default getQuerySuggestions()