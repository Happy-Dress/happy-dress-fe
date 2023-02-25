import React, { useRef, useState } from 'react';
import s from './Switcher.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Switcher = ({ className, activeClass }) => {
    const [isActive, setIsActive] = useState(false);
    const indicator = useRef(null);

    return (
        <label className={classNames(s.Switcher, className, isActive && activeClass)}>
            <input type="checkbox" onChange={() => setIsActive(!isActive)} checked={isActive}/>
            <span
                className={classNames(s.indicator, isActive && s.active)}
                style={{ left: isActive ? `calc(100% - ${indicator.current.getBoundingClientRect().width}px - 4px)` : 4 }}
                ref={indicator}
            />
        </label>
    );
};

Switcher.propTypes = {
    className: PropTypes.string,
    activeClass: PropTypes.string
};

export default Switcher;
