import React, { useEffect, useState } from 'react';
import s from './GoodsSetting.module.scss';
import GoodsSettingHeader from './components/GoodsSettingHeader';
import GoodsSettingContent from './components/GoodsSettingContent';
import retrieveCatalogueSettings from '../../../../common/api/catalogueSettings/retrieveCatalogueSettings';
import getCatalogueItems from '../../../../common/api/catalogueItems/getCatalogueItems';
import { useSearchParams } from 'react-router-dom';


const GoodsSetting = () => {

    const [isPageLoading, setIsPageLoading] = useState({
        headerLoading: false,
        contentLoading: false
    });

    const [searchParams] = useSearchParams();

    const [filters, setFilters] = useState({});
    const [catalogueItems, setCatalogueItems] = useState([]);

    useEffect(() => {
        setIsPageLoading(prevState => {                             // Ставим компонент в состаяние загрузки
            return {
                ...prevState,
                contentLoading: true,
                headerLoading: true
            };
        });
        retrieveCatalogueSettings()
            .then((settings) => {
                setFilters(settings);
            })
            .finally(() => {
                setIsPageLoading(prevState => {
                    return {
                        ...prevState,
                        headerLoading: false
                    };
                });
            });
        getCatalogueItems(searchParams.toString())
            .then((res) => {
                setCatalogueItems(res);
            })
            .finally(() => {
                setIsPageLoading(prevState => {
                    return {
                        ...prevState,
                        contentLoading: false
                    };
                });
            });
    }, []);

    if(isPageLoading.headerLoading || isPageLoading.contentLoading) {
        return <p className={s.loader}>Loader</p>;
    }

    return (
        <div className={s.GoodsSetting}>
            <GoodsSettingHeader filters={filters}/>
            <GoodsSettingContent catalogueItems={catalogueItems}/>
        </div>
    );
};

export default GoodsSetting;
