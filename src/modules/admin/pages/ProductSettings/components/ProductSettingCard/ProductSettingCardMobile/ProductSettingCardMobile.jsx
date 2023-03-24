import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../ProductSettings.dictionary';
import { fetchCatalogueSettings } from '../../../../../../../common/ui/store/slices/catalogueSettingsSlice';
import DropdownProductCard from '../DropdownProductCard/DropdownProductCard';
import s from './ProductSettingCardMobile.module.scss';

const ProductCardMobile = () => {
    const {
        BREADCRUMBS,
        PRODUCT_CARD_TITLE,
        PRODUCT_CARD,
        PRODUCT_CARD_CATEGORY,
        PRODUCT_CARD_MODEL,
        PRODUCT_CARD_MATERIAL,
    } = PRODUCT_SETTINGS_DICTIONARY;

    const product_elems = [
        PRODUCT_CARD_CATEGORY,
        PRODUCT_CARD_MODEL,
        PRODUCT_CARD_MATERIAL,
    ];
    const dispatch = useDispatch();
    const { categories, materials, models } = useSelector(
        (state) => state.catalogueSettings.settings
    );
    const data = [categories, materials, models];
    useEffect(() => {
        dispatch(fetchCatalogueSettings());
    }, []);
    return (
        <div className={s.ProductSettingCardMobile}>
            <div className={s.ProductCardMobile_way}>
                {BREADCRUMBS + PRODUCT_CARD}
            </div>
            <h2 className={s.ProductSettingCardMobile_heading}>
                {PRODUCT_CARD_TITLE}
            </h2>
            <form className={s.ProductSettingCardMobile_form}>
                <div className={s.ProductSettingCardMobile_bottomLine}>
                    <div className={s.ProductSettingCardMobile_inputWrapper}>
                        <span>Название</span>
                        <input
                            type="text"
                            className={s.ProductSettingCardMobile_input}
                            placeholder="Введите название"
                        />
                    </div>
                </div>

                {product_elems.map((elem, i) => (
                    <div className={s.ProductSettingCardMobile_bottomLine} key={i}>
                        <div className={s.ProductSettingCardMobile_form_elem}>
                            <span
                                className={s.ProductSettingCardMobile_form_elem_elemTitle}
                            >
                                {elem}
                            </span>
                            <DropdownProductCard data={data[i]} />
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ProductCardMobile;
