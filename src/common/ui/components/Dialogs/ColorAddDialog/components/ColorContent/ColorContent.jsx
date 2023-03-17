import React, { useEffect, useMemo, useState } from 'react';
import s from './ColorContent.module.scss';
import './ColorPicker.scss';

import { Switcher } from '../../../../Checkboxes';
import ColorPicker from './components/ColorPicker/ColorPicker';

import { useColorAddContext } from '../../contexts/ColorAddContext';
import { COLOR_ADD_ACTIONS } from '../../store/colorReducer';
import { COLOR_ADD_DIALOG_DICTIONARY } from '../../ColorAddDialog.dictionary';


import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import PropTypes from 'prop-types';
import classNames from 'classnames';
extend([namesPlugin]);

const {
    FEW_COLORS,
    PLACEHOLDER
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorContent = ({ error }) => {
    const MAX_LENGTH_COLOR_NAME = 15;

    const { state, dispatch } = useColorAddContext();

    const [name, setName] = useState(state.name ?? '');
    const [isSwitcherActive, setIsSwitcherActive] = useState(!!state.secondColor);

    const [firstColor, setFirstColor] = useState(state.firstColor ?? '');
    const [secondColor, setSecondColor] = useState(state.secondColor ?? '#000');

    const changeNameHandler = (e) => {
        setName(e.target.value.trim());
        dispatch({ type: COLOR_ADD_ACTIONS.ADD_NAME, payload: e.target.value.trim() });
    };

    const rgbaFirstString = useMemo(() => {
        return firstColor.startsWith('rgba') ? firstColor : colord(firstColor).toRgbString();
    }, [firstColor]);

    const rgbaSecondString = useMemo(() => {
        return secondColor && (secondColor.startsWith('rgba') ? secondColor : colord(secondColor).toRgbString());
    }, [secondColor]);

    useEffect(() => {
        dispatch({ type: COLOR_ADD_ACTIONS.UPDATE_COLOR, payload: { type: 'firstColor', value: colord(firstColor).toHex() } });
    }, [firstColor]);

    useEffect(() => {
        if(isSwitcherActive) {
            dispatch({ type: COLOR_ADD_ACTIONS.UPDATE_COLOR, payload: { type: 'secondColor', value: colord(secondColor).toHex() } });
        } else {
            dispatch({ type: COLOR_ADD_ACTIONS.UPDATE_COLOR, payload: { type: 'secondColor', value: null } });
        }
    }, [isSwitcherActive, secondColor]);

    return (
        <div className={s.ColorContent} style={{ overflowY: isSwitcherActive ? 'scroll' : 'unset' }}>
            <div className={s.fewColors}>
                <Switcher
                    switcherState={[isSwitcherActive, setIsSwitcherActive]}
                    className={s.switcher}
                    activeClass={s.switcherActive}/>
                <p>{FEW_COLORS}</p>
            </div>
            <div className={s.color}>
                <input
                    type="text"
                    placeholder={PLACEHOLDER}
                    className={classNames(s.colorName, error && s.error)}
                    value={name}
                    onChange={changeNameHandler}
                    maxLength={MAX_LENGTH_COLOR_NAME}
                />
                { error && <span className={s.error}>{error}</span>}
                <ColorPicker
                    color={firstColor}
                    setColor={setFirstColor}
                    rgbaString={rgbaFirstString}
                />
                {
                    isSwitcherActive &&
                    <ColorPicker
                        color={secondColor}
                        setColor={setSecondColor}
                        rgbaString={rgbaSecondString}
                    />
                }
            </div>
        </div>
    );
};

ColorContent.propTypes = {
    error: PropTypes.string
};

export default ColorContent;
