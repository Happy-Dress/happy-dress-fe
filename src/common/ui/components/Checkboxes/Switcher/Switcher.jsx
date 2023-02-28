import React, { useRef } from 'react';
import s from './Switcher.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Switcher = ({ className, activeClass, switcherState }) => {
    const indicator = useRef(null);
    const [isActive, setIsActive] = switcherState;

    const getIndicatorWidth = () => {
        try {
            return indicator.current.getBoundingClientRect().width;
        } catch (e) {
            return 0;
        }
    };

    return (
        <label className={classNames(s.Switcher, className, isActive && activeClass)}>
            <input type="checkbox" onChange={() => setIsActive(!isActive)} checked={isActive}/>
            <span
                className={classNames(s.indicator, isActive && s.active)}
                style={{ left: isActive ? `calc(100% - ${getIndicatorWidth()}px - 4px)` : 4 }}
                ref={indicator}
            />
        </label>
    );
};

Switcher.propTypes = {
    className: PropTypes.string,
    activeClass: PropTypes.string,
    switcherState: PropTypes.array.isRequired
};

export default Switcher;
