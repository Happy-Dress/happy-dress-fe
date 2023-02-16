import React, { useEffect, useMemo, useRef } from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { CatalogContentDesktop } from './components/CatalogContentDesktop';
import { CatalogContentMobile } from './components/CatalogContentMobile';
import { useSearchParams } from 'react-router-dom';
import { getCatalogueItems } from '../../../../../../common/api';
import { CATALOG_ACTIONS } from '../../store/catalogReducer';
import { useCatalogContext } from '../../contexts/CatalogProvider';

const CatalogContent = () => {
    const [searchParams] = useSearchParams();
    const { state, dispatch } = useCatalogContext();
    const searchRef = useRef(searchParams.toString());

    const AdaptiveCatalogContent = useMemo(() => {
        return adaptive(CatalogContentDesktop, CatalogContentMobile);
    } ,[]);

    useEffect(() => {
        let debouncedTimeout;
        if(searchRef.current !== searchParams.toString()) {
            dispatch({ type: CATALOG_ACTIONS.SET_ITEMS_LOADING });
            debouncedTimeout = setTimeout(() => {
                getCatalogueItems(searchParams.toString())
                    .then((res) => {
                        dispatch({ type: CATALOG_ACTIONS.SET_ALL_ITEMS, payload: res });
                    });
            }, 500);
            searchRef.current = searchParams.toString();
        }
        return () => {
            clearTimeout(debouncedTimeout);
        };
    }, [searchParams]);

    if(state.loading.content) return <p style={{ flexGrow: 1 }}>Loading</p>;

    return (
        <AdaptiveCatalogContent />
    );
};

export default CatalogContent;
