import React from 'react';
import s from './Catalog.module.scss';
import CatalogHeader from './components/CatalogHeader';
import CatalogContent from './components/CatalogContent';

const Catalog = () => {
    return (
        <div className={s.Catalog}>
            <h1>Свадебные</h1>
            <CatalogHeader className={s.pageMargin}/>
            <CatalogContent className={s.pageMargin}/>
        </div>
    );
};

export default Catalog;