import React, { useState } from 'react';
import s from './ZoomableImage.module.scss';
import { ReactComponent as CloseIcon } from '../../../../../assets/images/closeIcon.svg';
import PropTypes from 'prop-types';

const ZoomableImage = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={isExpanded ? s.ZoomableImage_expanded : s.ZoomableImage} onClick={toggleExpand}>
            {isExpanded && (
                <div className={s.ZoomableImage_overlay}>
                    <div className={s.ZoomableImage_closeIcon} onClick={toggleExpand}>
                        <CloseIcon/>
                    </div>
                    {children}
                </div>
            )}
            {!isExpanded && (
                <div className={s.ZoomableImage_overlay} onClick={toggleExpand}>
                    {children}
                </div>
            )}
        </div>
    );
};

ZoomableImage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default ZoomableImage;