import React, { useMemo } from 'react';
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import { GoodsSettingHeaderDesktop } from './components/GoodsSettingHeaderDesktop';

const GoodsSettingHeader = () => {

    const AdaptiveGoodsSettingHeader = useMemo(() => {
        return adaptive(GoodsSettingHeaderDesktop);
    } ,[]);

    return (
        <AdaptiveGoodsSettingHeader />
    );
};

export default GoodsSettingHeader;
