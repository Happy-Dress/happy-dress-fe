import React, { useMemo } from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { GoodsSettingHeaderDesktop } from './components/GoodsSettingHeaderDesktop';
import { GoodsSettingHeaderMobile } from './components/GoodsSettingHeaderMobile';
import { useCatalogContext } from '../../contexts/CatalogProvider';



const GoodsSettingHeader = () => {
    const { state } = useCatalogContext();
    const AdaptiveGoodsSettingHeader = useMemo(() => {
        return adaptive(GoodsSettingHeaderDesktop, GoodsSettingHeaderMobile);
    } ,[]);

    if(state.loading.header) return <p>Loading</p>;

    return (
        <AdaptiveGoodsSettingHeader />
    );
};

export default GoodsSettingHeader;
