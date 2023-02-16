import React, { useMemo } from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { CatalogHeaderDesktop } from './components/CatalogHeaderDesktop';
import { CatalogHeaderMobile } from './components/CatalogHeaderMobile';
import { useCatalogContext } from '../../contexts/CatalogProvider';



const CatalogHeader = () => {
    const { state } = useCatalogContext();
    const AdaptiveCatalogHeader = useMemo(() => {
        return adaptive(CatalogHeaderDesktop, CatalogHeaderMobile);
    } ,[]);

    if(state.loading.header) return <p>Loading</p>;

    return (
        <AdaptiveCatalogHeader />
    );
};

export default CatalogHeader;
