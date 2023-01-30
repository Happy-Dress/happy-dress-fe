import React, { useState } from 'react';
import s from './GoodsSettingContent.module.scss';
import AddProductCard from './components/AddProductCard';
import ProductCard from './components/ProductCard';
import bgImage from '../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';
import { ReactComponent as Trash } from '../../../../../../common/assets/images/Trash.svg';

const PRODUCTS = [
    {
        id: 1,
        name: 'S000012345',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Свадебные'
    },
    {
        id: 2,
        name: 'S000012346',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Деловой стиль'
    }

];

const GoodsSettingContent = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    return (
        <div className={s.GoodsSettingContent}>
            <AddProductCard />
            {
                PRODUCTS.map(item => {
                    return <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        colors={item.colors}
                        sizes={item.sizes}
                        category={item.category}
                        previewImage={bgImage}
                        setSelectedItems={setSelectedItems}
                    />;
                })
            }
            {
                selectedItems.length ?
                    <div className={s.deleteContainer}>
                        <Trash />
                        <p>{ selectedItems.length }</p>
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default GoodsSettingContent;