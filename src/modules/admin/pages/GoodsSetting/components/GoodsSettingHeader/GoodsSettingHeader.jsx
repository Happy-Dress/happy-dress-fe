import React from 'react';
import useGoodsMediaQuery from '../../hooks/useGoodsMediaQuery';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import GoodsSettingHeaderMobile from './GoodsSettingHeaderMobile';


const GoodsSettingHeader = () => {
    const {
        isMobileWidth,
        isMobileHeight,
        isDesktopWidth,
    } = useGoodsMediaQuery();



    return (
        <>
            {isDesktopWidth && !isMobileWidth && <GoodsSettingHeaderDesktop/>}
            {(isMobileWidth || isMobileHeight) && <GoodsSettingHeaderMobile/>}
        </>
    );
};

export default GoodsSettingHeader;