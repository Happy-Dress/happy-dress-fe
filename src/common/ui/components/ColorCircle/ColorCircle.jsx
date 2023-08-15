import React from 'react';
import PropTypes from 'prop-types';
import s from './ColorCircle.module.scss';
import classNames from 'classnames';

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

const ColorCircle = ({ firstColor, secondColor, label, width, height, colorItemClass, colorCircleClass }) => {
    const color = { firstColor, secondColor };
    return (
        <div className={classNames(s.colorItem, colorItemClass)}>
            <div
                className={classNames(s.colorItem_circle, colorCircleClass)}
                style={{ 
                    background: getColorBackgroundStyle(color),
                    width: width ? width : '15px',
                    height: height ? height : '15px',
                }}
            >
            </div>
            {label ?
                <span>{label}</span>
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
    width: PropTypes.string,
    height: PropTypes.string,
    colorItemClass: PropTypes.string,
    colorCircleClass: PropTypes.string,
};

export default ColorCircle;