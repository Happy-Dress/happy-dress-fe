import React from 'react';
import s from './CatalogContentMobile.module.scss';
import { useCatalogContext } from '../../../../contexts/CatalogProvider';
import { ProductCard } from '../../../../../../../../common/ui/components';


const CatalogContentMobile = () => {
    const { state } = useCatalogContext();

    return (
        <div className={s.CatalogContentMobile}>
            {
                state.items.map((item) => {
                    return <ProductCard
                        key={item.id}
                        product={item}
                        className={s.card}
                    />;
                })
            }
        </div>
    );
};

export default CatalogContentMobile;
