import React, { useState } from 'react';
import s from './GoodsSettingContent.module.scss';

import adaptive from '../../../../../../common/ui/hocs/adaptive';

import ProductCardAddDesktop from './components/DesktopCards/ProductCardAddDesktop';
import ProductCardDesktop from './components/DesktopCards/ProductCardDesktop';
import AddProductCardMobile from './components/MobileCards/ProductCardAddMobile';
import ProductCardMobile from './components/MobileCards/ProductCardMobile';

import bgImage from '../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';
import { ReactComponent as Trash } from '../../../../../../common/assets/images/Trash.svg';
import PropTypes from 'prop-types';

const GoodsSettingContent = ({ catalogueItems }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    let AdaptiveAddProductCard = adaptive(ProductCardAddDesktop, AddProductCardMobile);
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
                catalogueItems.map(item => {
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

GoodsSettingContent.propTypes = {
    catalogueItems: PropTypes.array.isRequired,
};

export default GoodsSettingContent;