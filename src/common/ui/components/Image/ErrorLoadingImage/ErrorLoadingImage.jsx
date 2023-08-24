import React from 'react';
import PropTypes from 'prop-types';
import s from './ErrorLoadingImage.module.scss';
import { ReactComponent as Retry } from '../../../../assets/images/retry.svg';

const ErrorLoadingImage = ({ isError, label, shouldDisplayRetryButton, onClick }) => {
    
    const handleClick = (e) => {
        onClick && onClick(e);
    };
    
    return (
        <>
            {isError && <div
                className={s.ErrorLoadingImage}
                onClick={(e) => handleClick(e)}
            >
                {shouldDisplayRetryButton && <Retry/>}
                {label && <p>{label}</p>}
            </div>}
        </>
    );
};

ErrorLoadingImage.propTypes = {
    isError: PropTypes.bool,
    label: PropTypes.string,
    shouldDisplayRetryButton: PropTypes.bool,
    onClick: PropTypes.func
};

export default ErrorLoadingImage;