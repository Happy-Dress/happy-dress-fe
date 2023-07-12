import React, { useEffect, useState } from 'react';
import s from './PCC_Colors.module.scss';
import { DropdownSelect } from '../../../../../../../../common/ui/components/DropdownSelect';
import ColorItem from '../ColorItem';
import { useSelector } from 'react-redux';

const sizesCount = 8;
const sizes = Array(sizesCount).fill(null);

const colours = sizes.map((size, idx) => {
    return (
        <div className={s.coloursCol} key={idx}>
            <DropdownSelect
                key={idx}
                name={`size${idx}`}
                options={[
                    { value: 'true', label: 'В наличии' },
                    { value: 'false', label: 'Нет в наличии' },
                ]}
                defaultValues={['false']}
                size={'small'}
            />
        </div>
    );
});

export const PCC_Colors = () => {
    const { colors } = useSelector((state) => state.catalogueSettings.settings);
    const { product } = useSelector((state) => state.product);
    const [productColorSizes, setProductColorSizes] = useState([]);
    useEffect(() => {
        if (product) {
            setProductColorSizes(product.productColorSizes);
        }
    }, [product]);

    return (
        <div className={s.colours}>
            <div className={s.coloursRow}>
                <div className={s.coloursCol}>
                    <DropdownSelect
                        name={'colors'}
                        placeholder={'Цвет'}
                        options={colors.map((item) => ({ ...item, value: item.id, label: item.name }))}
                        itemComponent={ColorItem}
                        size={'small'}
                    />
                </div>

                {colours}
            </div>
        </div>
    );
};
