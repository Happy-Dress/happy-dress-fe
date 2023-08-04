import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelect } from '../../../../../../../../../../common/ui/components/DropdownSelect';
import ColorCircle from '../../../../../../../../../../common/ui/components/ColorCircle';

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
    currentColor: PropTypes.object,
    optionsColors: PropTypes.array.isRequired,
    handleChangeColor: PropTypes.func.isRequired,
    idx: PropTypes.string,
};

export default ColorTab;