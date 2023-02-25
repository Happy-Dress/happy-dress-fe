import React, { useMemo, useState } from 'react';
import s from './ColorContent.module.scss';
import { Switcher } from '../../../../Checkboxes';
import { COLOR_ADD_DIALOG_DICTIONARY } from '../../ColorAddDialog.dictionary';
import { RgbaStringColorPicker } from 'react-colorful';
import './ColorPicker.scss';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
extend([namesPlugin]);

const {
    FEW_COLORS,
    PLACEHOLDER
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorContent = () => {
    const [color, setColor] = useState('#fff');
    const rgbaString = useMemo(() => {
        return color.startsWith('rgba') ? color : colord(color).toRgbString();
    }, [color]);

    return (
        <div className={s.ColorContent}>
            <div className={s.fewColors}>
                <Switcher className={s.switcher} activeClass={s.switcherActive}/>
                <p>{FEW_COLORS}</p>
            </div>
            <div className={s.color}>
                <input type="text" placeholder={PLACEHOLDER} className={s.colorName}/>
                <div className={s.colorPicker}>
                    <input
                        type="text"
                        value={color}
                        className={s.colorPickerValue}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <RgbaStringColorPicker color={rgbaString} onChange={setColor}/>
                </div>
            </div>
        </div>
    );
};

export default ColorContent;
