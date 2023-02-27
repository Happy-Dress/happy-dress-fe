import React from 'react';
import s from './ColorPicker.module.scss';
import { RgbaStringColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';

const ColorPicker = ({ color, setColor, rgbaString }) => {
    return (
        <div className={s.ColorPicker}>
            <input
                type="text"
                value={color}
                className={s.ColorPickerValue}
                onChange={(e) => setColor(e.target.value)}
            />
            <RgbaStringColorPicker color={rgbaString} onChange={setColor}/>
        </div>
    );
};

ColorPicker.propTypes = {
    color: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    rgbaString: PropTypes.string.isRequired
};

export default ColorPicker;
