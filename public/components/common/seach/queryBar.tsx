import React, {Fragment, useEffect, useState, useCallback, useRef, createElement} from 'react';
import { IQueryBarProps } from './search'
import { autocomplete, getAlgoliaResults }  from '@algolia/autocomplete-js'
import { render } from 'react-dom';

export function QueryBar(props: IQueryBarProps) {
    const { 
        query,
        handleQueryChange,
        handleQuerySearch
    } = props;

    const containerRef = useRef(null);

    // useEffect(() => {
    //     if (!containerRef.current) {
    //         return undefined;
    //     }

    //     const search = autocomplete( {
    //         container: containerRef.current,
    //         renderer: { createElement, Fragment },
    //         render({ children }, root) {
    //             render(children, root);
    //         },
    //         ...props,
    //     });

    //     return () => {
    //         search.destroy();
    //     };
    // }, [props])

    // return(
    //     autocomplete({
    //         container: '#autocomplete',
    //         placeholder: 'Enter PPL Query',
    //         getSources() {
    //             return [];
    //         },
    //     })
    // )
    return <div ref={containerRef}/>
}