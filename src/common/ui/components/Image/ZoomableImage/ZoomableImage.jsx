import React, { useState } from 'react';
import s from './ZoomableImage.module.scss';
import { ReactComponent as CloseIcon } from '../../../../../assets/images/closeIcon.svg';
import PropTypes from 'prop-types';

const ZoomableImage = ({ prohibitZoom, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={isExpanded ? s.ZoomableImage_expanded : s.ZoomableImage} onClick={prohibitZoom ? undefined : toggleExpand}>
            {isExpanded && (
                <div className={s.ZoomableImage_overlay}>
                    <div className={s.ZoomableImage_closeIcon} onClick={toggleExpand}>
                        <CloseIcon/>
                    </div>
                    {children}
                </div>
            )}
            {!isExpanded && (
                <div className={s.ZoomableImage_overlay} onClick={prohibitZoom ? undefined : toggleExpand}>
                    {children}
                </div>
            )}
        </div>
    );
};

ZoomableImage.propTypes = {
    prohibitZoom: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default ZoomableImage;