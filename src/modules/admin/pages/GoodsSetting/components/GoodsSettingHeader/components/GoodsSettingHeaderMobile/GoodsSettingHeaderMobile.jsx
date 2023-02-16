import React, { useMemo, useRef, useState } from 'react';
import s from './GoodsSettingHeaderMobile.module.scss';
import { GOODS_SETTING_DICTIONARY, GOODS_SETTING_VARIABLES } from '../../../../GoodsSetting.dictionary';
import { useCatalogContext } from '../../../../contexts/CatalogProvider';
import { SearchContainer } from './components/SearchContainer';
import { Filters } from './components/Filters';
import { useSearchParams } from 'react-router-dom';
import { FilterBadge } from './components/FilterBadge';
import { ButtonAccent } from '../../../../../../../../common/ui/components';
import { CATALOG_ACTIONS } from '../../../../store/catalogReducer';

const {
    TITLE,
    RESET_FILTERS
} = GOODS_SETTING_DICTIONARY;

const {
    BASE_FILTER_ID
} = GOODS_SETTING_VARIABLES;

const GoodsSettingHeaderMobile = () => {
    const { state, dispatch } = useCatalogContext();
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const stateRef = useRef(state.currentFilters);

    const applyFilters = () => {
        setSearchParams(() => {
            const newParams = new URLSearchParams(state.currentFilters);
            if(searchParams.get('search')) {
                newParams.set('search', searchParams.get('search'));
            }

            return newParams.toString();
        });
        setIsOpen(false);
        stateRef.current = state.currentFilters;
    };

    const resetFilters = () => {
        const newFilters = {
            categories: [BASE_FILTER_ID]
        };

        dispatch({ type: CATALOG_ACTIONS.SET_BASE_FILTER, payload: newFilters });

        setSearchParams(() => {
            const newParams = new URLSearchParams(newFilters);
            if(searchParams.get('search')) {
                newParams.set('search', searchParams.get('search'));
            }

            return newParams.toString();
        });

        stateRef.current = newFilters;
    };

    const currentCategory = useMemo(() => {
        let category = state.filters.categories.find(({ id }) => id === state.currentFilters.categories[0]);
        return category.name;
    }, [searchParams]);

    const filterBadges = useMemo(() => {
        return Object.entries(stateRef.current).map(([key, value]) => {
            if(key === 'categories') return;
            return value.map((item) => {
                let badgeInfo;
                try {
                    badgeInfo = state.filters[key].find(filterCategory => filterCategory.id === item);
                } catch {
                    badgeInfo = '';
                }
                return <FilterBadge key={badgeInfo.name} name={badgeInfo.name}/>;
            });
        });
    }, [stateRef.current]);

    return (
        <>
            <h1 className={s.title}>{TITLE}</h1>
            <div className={s.currentCategory}>
                <h2>{currentCategory}</h2>
            </div>
            <div className={s.headerContainer}>
                <SearchContainer setIsOpen={setIsOpen}/>
                {isOpen && <Filters applyFilters={applyFilters}/>}
            </div>
            {
                !isOpen &&
                <div className={s.filterBadges}>
                    {
                        filterBadges
                    }
                </div>
            }
            {
                (filterBadges.length > 1 && !isOpen) &&
                <div className={s.resetFilters}>
                    <ButtonAccent text={RESET_FILTERS} onClick={resetFilters}/>
                </div>
            }
        </>
    );
};

export default GoodsSettingHeaderMobile;
