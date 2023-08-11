import React from 'react';
import s from './CurrentFilters.module.scss';
import { ButtonAccent } from '../../../../../../../../common/ui/components';
import { CATALOG_DICTIONARY } from '../../../../Catalog.dictionary';
import { useCurrentFilters } from '../../../../../../../../common/ui/hooks/useCurrentFilters';

const {
    RESET_FILTERS
} = CATALOG_DICTIONARY;

const CurrentFilters = () => {
    const { tags, handleDropFilters, isDesktop } = useCurrentFilters(s.tag);
    return (
        <div className={s.CurrentFilters}>
            <div className={s.tags}>{tags}</div>
            {!isDesktop &&
          tags.filter((item) => item && item.length > 0).length > 0 && (
                <ButtonAccent text={RESET_FILTERS} onClick={handleDropFilters} />
            )}
        </div>
    );
};

export default CurrentFilters;
