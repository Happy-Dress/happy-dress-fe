import React from 'react';
import PropTypes from 'prop-types';
import s from './ColorTab.module.scss';

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

export const ColorTab = (props) => {
    const { firstColor, secondColor } = props;
    const color = { firstColor, secondColor };
    return (
        <div className={s.colorTab}>
            <div
                className={s.colorTabCircle}
                style={{ background: getColorBackgroundStyle(color) }}
            >
            </div>
        </div>
    );
};

ColorTab.propTypes = {
    firstColor: PropTypes.string.isRequired,
    secondColor: PropTypes.string,
};
