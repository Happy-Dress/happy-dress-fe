import React, { useMemo } from 'react';
import s from './CurrentFilters.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Cross } from '../../../../../../../../common/assets/images/x.svg';
import { dropFilters, unSelectFilter } from '../../../../../../../../common/ui/store/slices/productsSearchSlice';
import { useDeviceTypeContext } from '../../../../../../../../common/ui/contexts/DeviceType';
import { ButtonAccent } from '../../../../../../../../common/ui/components';
import { CATALOG_DICTIONARY } from '../../../../Catalog.dictionary';

const {
    RESET_FILTERS
} = CATALOG_DICTIONARY;

const CurrentFilters = () => {
    const selectedFilters = useSelector(state => state.productsSearch.filters);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const dispatch = useDispatch();
    const { isDesktop } = useDeviceTypeContext();

    const filterTag = (id, filterName = 'categories') => {


        const clickHandler = () => {
            dispatch(unSelectFilter({ type: filterName, id }));
        };

        return (
            <div className={s.tag} key={id}>
                <span>
                    {
                        catalogueSettings[filterName].find(item => item.id === id).name ??
                        catalogueSettings[filterName].find(item => item.id === id).sizeValue
                    }
                </span>
                {isDesktop && <Cross onClick={clickHandler}/>}
            </div>
        );
    };

    const tags = useMemo(() => {
        return Object.entries(selectedFilters).map(([key, value]) => {
            if(key === 'category' && isDesktop) return;
            if(!value) return;

            if(typeof value === 'object') {
                return value.map(id => {
                    return filterTag(id, key);
                });
            }

            if(typeof value === 'number') {
                return filterTag(value);
            }
        });
    }, [selectedFilters]);

    return (
        <div className={s.CurrentFilters}>
            <div className={s.tags}>
                {tags}
            </div>
            {
                (!isDesktop && tags.filter(item => item && item.length > 0).length > 0) &&
                <ButtonAccent text={RESET_FILTERS} onClick={() => dispatch(dropFilters(catalogueSettings))}/>
            }
        </div>
    );
};

export default CurrentFilters;
