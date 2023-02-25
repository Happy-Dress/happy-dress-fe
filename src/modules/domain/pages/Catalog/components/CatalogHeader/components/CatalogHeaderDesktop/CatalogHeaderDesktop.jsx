import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './CatalogHeaderDesktop.module.scss';
import { Filters } from './components/Filters';
import { SearchContainer } from './components/SearchContainer';
import { FilterBadge } from './components/FilterBadge';
import { useCatalogContext } from '../../../../contexts/CatalogProvider';
import { useDeviceTypeContext } from '../../../../../../../../common/ui/contexts/DeviceType';
import { useSearchParams } from 'react-router-dom';
import { ROUTER_VARIABLES } from '../../../../../../routerConfig';

const CatalogHeaderDesktop = () => {

    const { state } = useCatalogContext();

    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { isMobile } = useDeviceTypeContext();

    const stateRef = useRef(state);

    useEffect(() => {
        if(isMobile) return;
        if(JSON.stringify(stateRef.current) === JSON.stringify(state)) return;

        setSearchParams(() => {
            const newParams = new URLSearchParams(state.currentFilters);
            if(searchParams.get('search')) {
                newParams.set('search', searchParams.get('search'));
            }

            return newParams.toString();
        });

        stateRef.current = state;
    }, [state.currentFilters]);

    const filterBadges = useMemo(() => {
        return Object.entries(state.currentFilters).map(([key, value]) => {
            if(key === ROUTER_VARIABLES.BASE_CATALOG_FILTER.name) return;
            return value.map((item) => {
                let badgeInfo;
                try {
                    badgeInfo = state.filters[key].find(filterCategory => filterCategory.id === item);
                } catch {
                    badgeInfo = '';
                }
                return <FilterBadge
                    key={badgeInfo.name}
                    name={badgeInfo.name}
                    id={badgeInfo.id}
                    currentCategory={key}
                />;
            });
        });
    }, [state.currentFilters]);

    return (
        <div className={s.CatalogHeaderDesktop}>
            <div className={s.headerContainer}>
                <Filters />
                <SearchContainer setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
            {
                (filterBadges.length && !isOpen) &&
                <div className={s.filterBadges}>
                    {
                        filterBadges
                    }
                </div>
            }
        </div>
    );
};

export default CatalogHeaderDesktop;
