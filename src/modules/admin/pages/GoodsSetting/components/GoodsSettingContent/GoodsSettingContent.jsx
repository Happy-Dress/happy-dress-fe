import React, { useMemo, useState } from 'react';
import s from './GoodsSettingContent.module.scss';

import adaptive from '../../../../../../common/ui/hocs/adaptive';

import AddProductCardDesktop from './components/DesktopCards/AddProductCardDesktop';
import ProductCardDesktop from './components/DesktopCards/ProductCardDesktop';
import AddProductCardMobile from './components/MobileCards/AddProductCardMobile';
import ProductCardMobile from './components/MobileCards/ProductCardMobile';

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

    let AdaptiveAddProductCard = adaptive(AddProductCardDesktop, AddProductCardMobile);
    let AdaptiveProductCard = adaptive(ProductCardDesktop, ProductCardMobile);

    const deleteHandler = () => {
        console.log('ID для удаления: ', selectedItems);
    };

    const addHandler = () => {
        console.log('Добавляем товар');
    };

    return (
        <div className={s.GoodsSettingContent}>
            <AdaptiveAddProductCard onClick={addHandler}/>
            {
                PRODUCTS.map(item => {
                    return <AdaptiveProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        colors={item.colors}
                        sizes={item.sizes}
                        category={item.category}
                        previewImage={bgImage}
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

export default GoodsSettingContent;