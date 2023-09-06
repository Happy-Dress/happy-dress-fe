import React, { useState } from 'react';
import s from './ZoomableImage.module.scss';
import { ReactComponent as CloseIcon } from '../../../../../assets/images/closeIcon.svg';
import { ReactComponent as SwipeLeft } from '../../../../../assets/images/swipeLeft.svg';
import { ReactComponent as SwipeRight } from '../../../../../assets/images/swipeRight.svg';
import PropTypes from 'prop-types';

const ZoomableImage = ({
    prohibitZoom,
    children,
    handleLeftClick,
    handleRightClick
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={isExpanded ? s.ZoomableImage_expanded : s.ZoomableImage}>
            {isExpanded && (
                <div className={s.ZoomableImage_overlay}>
                    <div className={s.ZoomableImage_closeIcon} onClick={toggleExpand}>
                        <CloseIcon />
                    </div>
                    <div className={s.ZoomableImage_swipeLeft}>
                        <SwipeLeft onClick={handleLeftClick} />
                    </div>
                    {children}
                    <div className={s.ZoomableImage_swipeRight}>
                        <SwipeRight onClick={handleRightClick} />
                    </div>
                </div>
            )}
            {!isExpanded && (
                <div
                    className={s.ZoomableImage_overlay}
                    onClick={prohibitZoom ? undefined : toggleExpand}
                >
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
        PropTypes.node,
    ]).isRequired,
    handleLeftClick: PropTypes.func,
    handleRightClick: PropTypes.func,
};

export default ZoomableImage;