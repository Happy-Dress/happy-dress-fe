import React, { useState } from 'react';
import s from './GoodsSettingContent.module.scss';

import { ReactComponent as Trash } from '../../../../../../common/assets/images/Trash.svg';
import PropTypes from 'prop-types';
import ProductCard from './components/ProductCard';
import ProductCardAdd from './components/ProductCardAdd';

const GoodsSettingContent = ({ catalogueItems, isLoading }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const deleteHandler = () => {
        console.log('ID для удаления: ', selectedItems);
    };

    const addHandler = () => {
        console.log('Добавляем товар');
    };

    if(isLoading) return <p>Loader</p>;

    return (
        <div className={s.GoodsSettingContent}>
            <ProductCardAdd onClick={addHandler}/>
            {
                catalogueItems.map(item => {
                    return <ProductCard
                        key={item.id}
                        product={item}
                        setSelectedItems={setSelectedItems}
                        selectedItems={selectedItems}
                    />;
                })
            }
            {
                selectedItems.length ?
                    <div className={s.deleteContainer} onClick={deleteHandler}>
                        <Trash />
                        <p>{ selectedItems.length }</p>
                    </div>
                    :
                    null
            }
        </div>
    );
};

GoodsSettingContent.propTypes = {
    catalogueItems: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default GoodsSettingContent;