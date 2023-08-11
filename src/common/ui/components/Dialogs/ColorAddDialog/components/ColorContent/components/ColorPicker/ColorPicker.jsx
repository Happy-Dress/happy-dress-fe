import React, { useMemo } from 'react';
import s from './ColorPicker.module.scss';
import { RgbaStringColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
extend([namesPlugin]);

const ColorPicker = ({ color, setColor, rgbaString }) => {

    const hexColor = useMemo(() => {
        return colord(color).toHex();
    }, [color]);

    return (
        <div className={s.ColorPicker}>
            <input
                type="text"
                value={hexColor}
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
