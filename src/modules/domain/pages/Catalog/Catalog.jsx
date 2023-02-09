import React from 'react';
import s from './Catalog.module.scss';
import CatalogHeader from './components/CatalogHeader';
import CatalogContent from './components/CatalogContent';
import CategoriesSidebar from './components/CategoriesSidebar';
import classNames from 'classnames';

const Catalog = () => {
    return (
        <div className={s.Catalog}>
            <h1>Свадебные</h1>
            <CatalogHeader className={s.pageMargin}/>
            <div className={classNames(s.content)}>
                <CategoriesSidebar />
                <CatalogContent />
            </div>
        </div>
    );
};

export default Catalog;