import React from 'react';
import PropTypes from 'prop-types';
import s from './ColorCircle.module.scss';

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

const ColorCircle = ({ firstColor, secondColor, label }) => {
    const color = { firstColor, secondColor };
    return (
        <div className={s.colorItem}>
            <div
                className={s.colorItem_circle}
                style={{ background: getColorBackgroundStyle(color) }}
            >
            </div>
            {label ?
                <p>{label}</p>
                :
                <></>
            }
        </div>
    );
};

ColorCircle.propTypes = {
    firstColor: PropTypes.string.isRequired,
    secondColor: PropTypes.string,
    label: PropTypes.string,
};

export default ColorCircle;