import React  from 'react';
import useGoodsMediaQuery from '../../hooks/useGoodsMediaQuery';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import GoodsSettingHeaderMobile from './GoodsSettingHeaderMobile';
import PropTypes from 'prop-types';


const GoodsSettingHeader = ({ filters }) => {

    const {
        isMobileWidth,
        isMobileHeight,
        isDesktopWidth,
    } = useGoodsMediaQuery();

    return (
        <>
            {isDesktopWidth && !isMobileWidth && <GoodsSettingHeaderDesktop filters={filters}/>}
            {(isMobileWidth || isMobileHeight) && <GoodsSettingHeaderMobile filters={filters}/>}
        </>
    );
};

GoodsSettingHeader.propTypes = {
    filters: PropTypes.object.isRequired
};

export default GoodsSettingHeader;