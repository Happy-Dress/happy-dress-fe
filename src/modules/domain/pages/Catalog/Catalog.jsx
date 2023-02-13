import React, { useEffect, useState } from 'react';
import s from './Catalog.module.scss';
import CatalogHeader from './components/CatalogHeader';
import CatalogContent from './components/CatalogContent';
import CategoriesSidebar from './components/CategoriesSidebar';
import { useSearchParams } from 'react-router-dom';
import retrieveCatalogueSettings from '../../../../common/api/catalogueSettings/retrieveCatalogueSettings';
import getCatalogueItems from '../../../../common/api/catalogueItems/getCatalogueItems';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';

const Catalog = () => {
    const [isPageLoading, setIsPageLoading] = useState({
        headerLoading: false,
        contentLoading: false
    });

    const [searchParams] = useSearchParams();

    const [filters, setFilters] = useState({});
    const [catalogueItems, setCatalogueItems] = useState([]);

    const { isDesktop } = useDeviceTypeContext();

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

    useEffect(() => {

        setIsPageLoading(prevState => {
            return {
                ...prevState,
                contentLoading: true,
            };
        });

        const debounceTimeout = setTimeout(() => {
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
        }, 300);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [searchParams]);

    return (
        <div className={s.Catalog}>
            <CatalogHeader filters={filters} isLoading={isPageLoading.headerLoading}/>
            <div className={s.content}>
                { isDesktop && <CategoriesSidebar categories={filters.categories}/> }
                <CatalogContent items={catalogueItems} isLoading={isPageLoading.contentLoading}/>
            </div>
        </div>
    );
};

export default Catalog;