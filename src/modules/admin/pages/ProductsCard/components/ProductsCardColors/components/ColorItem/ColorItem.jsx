import React from 'react';
import PropTypes from 'prop-types';
import s from './ColorItem.module.scss';

const getColorBackgroundStyle = (color) => {
    if (color) {
        if (color.secondColor) {
            return `linear-gradient( -45deg, ${color.firstColor}, ${color.firstColor} 49%, white 49%, white 51%, ${color.secondColor} 51% )`;
        }
    } else {
        return color.firstColor;
    }

    return color.firstColor;
};

export const ColorItem = (props) => {
    const { label, firstColor, secondColor } = props;
    const color = { firstColor, secondColor };
    return (
        <div className={s.colorItem}>
            <div
                className={s.colorItemCircle}
                style={{ background: getColorBackgroundStyle(color) }}
            >
            </div>
            <span>{label}</span>
        </div>
    );
};

ColorItem.propTypes = {
    label: PropTypes.string,
    firstColor: PropTypes.string.isRequired,
    secondColor: PropTypes.string,
};
