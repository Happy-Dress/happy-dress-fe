import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelect } from '../../../../../../../../../../common/ui/components/DropdownSelect';
import ColorCircle from '../../../../../../../../../../common/ui/components/ColorCircle';
import { PRODUCT_CARD_DICTIONARY } from '../../../../../../ProductsCard.dictionary';

const {
    COLOR_PROPTYPES,
} = PRODUCT_CARD_DICTIONARY;

const ColorTab = ({ currentColor, optionsColors, handleChangeColor, idx }) => {
    return (
        <DropdownSelect
            name={`color_${idx}`}
            placeholder={{ ...currentColor, label: currentColor.name }}
            placeholderComponent={ColorCircle}
            options={optionsColors.map((item) => ({ ...item, value: item.name, label: item.name }))}
            defaultValues={currentColor.name}
            size={'small'}
            onChange={handleChangeColor}
            itemComponent={ColorCircle}
        />
    );
};

ColorTab.propTypes = {
    currentColor: COLOR_PROPTYPES.isRequired,
    optionsColors: PropTypes.arrayOf(COLOR_PROPTYPES).isRequired,
    handleChangeColor: PropTypes.func.isRequired,
    idx: PropTypes.string,
};

export default ColorTab;