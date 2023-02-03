import React, { useMemo } from 'react';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import GoodsSettingHeaderMobile from './GoodsSettingHeaderMobile';
import PropTypes from 'prop-types';
import adaptive from '../../../../../../common/ui/hocs/adaptive';



const GoodsSettingHeader = ({ filters, isLoading }) => {

    const AdaptiveGoodsSettingHeader = useMemo(() => {
        return adaptive(GoodsSettingHeaderDesktop, GoodsSettingHeaderMobile);
    }, []);

    if(isLoading) return <p>Loader</p>;

    return (
        <AdaptiveGoodsSettingHeader filters={filters}/>
    );
};

GoodsSettingHeader.propTypes = {
    filters: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default GoodsSettingHeader;