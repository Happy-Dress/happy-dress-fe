import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../ProductSettings.dictionary';
import s from './ProductSettingCardDesktop.module.scss';
import DropdownProductCard from '../DropdownProductCard/DropdownProductCard';
import { fetchCatalogueSettings } from '../../../../../../../common/ui/store/slices/catalogueSettingsSlice';

const ProductCardDesktop = () => {
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
    const { categories, materials, models }= useSelector(
        (state) => state.catalogueSettings.settings
    );
    const data = [categories, materials, models];
    useEffect(() => {
        dispatch(fetchCatalogueSettings());
    }, []);
    return (
        <div className={s.ProductSettingCardDesktop}>
            <div className={s.ProductSettingCardDesktop_way}>
                {BREADCRUMBS + PRODUCT_CARD}
            </div>
            <h2 className={s.ProductSettingCardDesktop_heading}>
                {PRODUCT_CARD_TITLE}
            </h2>
            <form className={s.ProductSettingCardDesktop_form}>
                <div className={s.ProductSettingCardDesktop_inputWrapper}>
                    <span>Название</span>
                    <input
                        type="text"
                        className={s.ProductSettingCardDesktop_input}
                        placeholder="Введите название"
                    />
                </div>
                {product_elems.map((elem, i) => (
                    <div className={s.ProductSettingCardDesktop_form_elem} key={i}>
                        <span className={s.ProductSettingCardDesktop_form_elem_elemTitle}>
                            {elem}
                        </span>
                        <DropdownProductCard data={data[i]}/>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ProductCardDesktop;
