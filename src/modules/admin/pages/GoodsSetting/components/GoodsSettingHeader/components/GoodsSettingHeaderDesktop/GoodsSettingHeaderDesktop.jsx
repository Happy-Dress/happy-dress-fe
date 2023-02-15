import React, { useEffect, useMemo, useRef, useState } from 'react';
import s from './GoodsSettingHeader.module.scss';
import { GOODS_SETTING_DICTIONARY } from '../../../../GoodsSetting.dictionary';
import { DressCategories } from './components/DressCategories';
import { Filters } from './components/Filters';
import classNames from 'classnames';
import { SearchContainer } from './components/SearchContainer';
import { FilterBadge } from './components/FilterBadge';
import { useCatalogContext } from '../../../CatalogProvider';
import { useDeviceTypeContext } from '../../../../../../../../common/ui/contexts/DeviceType';
import { useSearchParams } from 'react-router-dom';

const {
    TITLE
} = GOODS_SETTING_DICTIONARY;

const GoodsSettingHeaderDesktop = () => {

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
            if(key === 'categories') return;
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
        <div className={s.GoodsSettingHeaderDesktop}>
            <div className={s.breadCrumbs}>{TITLE}</div>
            <h1>{TITLE}</h1>

            <div className={s.headerContainer}>
                <DressCategories />
                <div className={classNames(s.filtersContainer, isOpen ? s.active : '')}>
                    <SearchContainer setIsOpen={setIsOpen} isOpen={isOpen}/>
                    {isOpen && <Filters />}
                </div>
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

export default GoodsSettingHeaderDesktop;
