import React, { useEffect, useState } from 'react';
import useGoodsMediaQuery from '../../hooks/useGoodsMediaQuery';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import GoodsSettingHeaderMobile from './GoodsSettingHeaderMobile';
import retrieveCatalogueSettings from '../../../../../../common/api/catalogueSettings/retrieveCatalogueSettings';


const GoodsSettingHeader = () => {
    const [filters, setFilters] = useState();

    const {
        isMobileWidth,
        isMobileHeight,
        isDesktopWidth,
    } = useGoodsMediaQuery();

    useEffect(() => {
        retrieveCatalogueSettings()
            .then((settings) => {
                setFilters(settings);
            });
    }, []);

    if (!filters) {
        return <p>Loader</p>;
    }

    return (
        <>
            {isDesktopWidth && !isMobileWidth && <GoodsSettingHeaderDesktop filters={filters}/>}
            {(isMobileWidth || isMobileHeight) && <GoodsSettingHeaderMobile filters={filters}/>}
        </>
    );
};

export default GoodsSettingHeader;