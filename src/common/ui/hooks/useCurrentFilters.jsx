import { useDispatch, useSelector } from 'react-redux';
import { useDeviceTypeContext } from '../contexts/DeviceType';
import { dropFilters, unSelectFilter } from '../store/slices/productsSearchSlice';
import { ReactComponent as Cross } from '../../assets/images/x.svg';
import React, { useMemo } from 'react';

export const useCurrentFilters = (tagClass) => {
    const selectedFilters = useSelector(state => state.productsSearch.filters);
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const dispatch = useDispatch();
    const { isDesktop } = useDeviceTypeContext();

    const filterTag = (id, filterName = 'categories') => {


        const clickHandler = () => {
            dispatch(unSelectFilter({ type: filterName, id }));
        };

        return (
            <div className={tagClass} key={id}>
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
            if(key === 'category') return;
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

    const handleDropFilters = () => {
        dispatch(dropFilters(catalogueSettings));
    };

    return {
        tags,
        handleDropFilters,
        isDesktop
    };
};
