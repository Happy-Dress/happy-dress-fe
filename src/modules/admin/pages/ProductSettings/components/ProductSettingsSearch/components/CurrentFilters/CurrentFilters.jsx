import React from 'react';
import s from './CurrentFilters.module.scss';
import { ButtonAccent } from '../../../../../../../../common/ui/components';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../../ProductSettings.dictionary';
import { useCurrentFilters } from '../../../../../../../../common/ui/hooks/useCurrentFilters';

const {
    RESET_FILTERS
} = PRODUCT_SETTINGS_DICTIONARY;

const CurrentFilters = () => {
    const { tags, handleDropFilters } = useCurrentFilters(s.tag);
    return (
        <div className={s.CurrentFilters}>
            <div className={s.tags}>
                {tags}
            </div>
            {
                (tags.filter(item => item && item.length > 0).length > 0) &&
                <ButtonAccent text={RESET_FILTERS} onClick={handleDropFilters}/>
            }
        </div>
    );
};

export default CurrentFilters;
