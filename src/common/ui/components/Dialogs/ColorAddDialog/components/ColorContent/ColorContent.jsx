import React, { useEffect, useMemo, useState } from 'react';
import s from './ColorContent.module.scss';
import { Switcher } from '../../../../Checkboxes';
import { COLOR_ADD_DIALOG_DICTIONARY } from '../../ColorAddDialog.dictionary';
import { RgbaStringColorPicker } from 'react-colorful';
import './ColorPicker.scss';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { useColorAddContext } from '../../contexts/ColorAddContext';
import { COLOR_ADD_ACTIONS } from '../../store/colorReducer';
extend([namesPlugin]);

const {
    FEW_COLORS,
    PLACEHOLDER
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorContent = () => {
    const { state, dispatch } = useColorAddContext();
    const [color, setColor] = useState(state.firstColor);
    const [name, setName] = useState(state.name);

    const rgbaString = useMemo(() => {
        return color.startsWith('rgba') ? color : colord(color).toRgbString();
    }, [color]);

    const changeNameHandler = (e) => {
        setName(e.target.value);
        dispatch({ type: COLOR_ADD_ACTIONS.ADD_NAME, payload: e.target.value });
    };

    useEffect(() => {
        dispatch({ type: COLOR_ADD_ACTIONS.UPDATE_COLOR, payload: colord(color).toHex() });
    }, [color]);

    return (
        <div className={s.ColorContent}>
            <div className={s.fewColors}>
                <Switcher className={s.switcher} activeClass={s.switcherActive}/>
                <p>{FEW_COLORS}</p>
            </div>
            <div className={s.color}>
                <input
                    type="text"
                    placeholder={PLACEHOLDER}
                    className={s.colorName}
                    value={name}
                    onChange={changeNameHandler}
                />
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
