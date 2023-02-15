import React, { useMemo } from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { GoodsSettingHeaderDesktop } from './components/GoodsSettingHeaderDesktop';
import { GoodsSettingHeaderMobile } from './components/GoodsSettingHeaderMobile';

const GoodsSettingHeader = () => {

    const AdaptiveGoodsSettingHeader = useMemo(() => {
        return adaptive(GoodsSettingHeaderDesktop, GoodsSettingHeaderMobile);
    } ,[]);

    return (
        <AdaptiveGoodsSettingHeader />
    );
};

export default GoodsSettingHeader;
