import React from 'react';
import s from './PCC_Tab.module.scss';
import PropTypes from 'prop-types';
import cls from 'classnames';

export const PCC_Tab = ({ text, children, className, secondary }) => {
    return (
        <div className={cls(s.tab, className, secondary && s.tabSecondary)}>
            {text}
            {children}
        </div>
    );
};

PCC_Tab.propTypes = {
    text: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    className: PropTypes.string,
    secondary: PropTypes.bool,
};
