import React from 'react';
import PropTypes from 'prop-types';
import s from './ProgressBar.module.scss';

export const ProgressBar = (props) => {
    const { completed } = props;
    return (
        <div className={s.container}>
            <div
                className={s.fillerStyle}
                style={{
                    backgroundColor: 'rgba(167, 82, 20, 0.8)',
                    width: `${completed}%`
                }}
            >
            </div>
        </div>
    );
};

export default ProgressBar;

ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
};
