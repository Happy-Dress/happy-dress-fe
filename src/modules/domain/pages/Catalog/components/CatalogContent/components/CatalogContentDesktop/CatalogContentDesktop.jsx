import React from 'react';
import s from './CatalogContentDesktop.module.scss';
import { useCatalogContext } from '../../../../contexts/CatalogProvider';
import { ProductCard } from '../../../../../../../../common/ui/components';


const CatalogContentDesktop = () => {
    const { state } = useCatalogContext();

    return (
        <div className={s.CatalogContentDesktop}>
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

export default CatalogContentDesktop;
