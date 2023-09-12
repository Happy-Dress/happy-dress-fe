import React, { useEffect, useState } from 'react';
import s from './ZoomableImage.module.scss';
import { ReactComponent as CloseIcon } from '../../../../../assets/images/closeIcon.svg';
import { ReactComponent as SwipeLeft } from '../../../../../assets/images/swipeLeft.svg';
import { ReactComponent as SwipeRight } from '../../../../../assets/images/swipeRight.svg';
import PropTypes from 'prop-types';
import { useDeviceTypeContext } from '../../../contexts/DeviceType';
import { useSwipeable } from 'react-swipeable';

const ZoomableImage = ({
    prohibitZoom,
    children,
    isChangeControls,
    handleLeftClick,
    handleRightClick,
    handleClose,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isMobile } = useDeviceTypeContext();

    const handleSwipe = isMobile && useSwipeable({
        onSwipedLeft: (eventData) => {
            if (isExpanded) {
                eventData.event.stopPropagation();
                handleRightClick(eventData.event);
            }
        },
        onSwipedRight: (eventData) => {
            if (isExpanded) {
                eventData.event.stopPropagation();
                handleLeftClick(eventData.event);
            }
        }
    });

    const handleKeyDown = (e) => {
        if (isExpanded) {
            if (isChangeControls) {
                if (e.key === 'ArrowLeft') {
                    handleLeftClick(e);
                } else if (e.key === 'ArrowRight') {
                    handleRightClick(e);
                }
            }
            if (e.key === 'Escape') {
                handleClose && handleClose(e);
                setIsExpanded(false);
            }
        }
    };

    useEffect(() => {
        isExpanded ?
            document.addEventListener('keydown', handleKeyDown) :
            document.removeEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isExpanded]);

    const toggleExpand = () => {
        handleClose && handleClose();
        !prohibitZoom && setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={isExpanded ? s.ZoomableImage_expanded : s.ZoomableImage}
            onClick={toggleExpand}
            {...handleSwipe}
        >
            {isExpanded && (
                <div className={s.ZoomableImage_overlay}>
                    <div className={s.ZoomableImage_closeIcon} onClick={toggleExpand}>
                        <CloseIcon />
                    </div>
                    {isChangeControls && <div className={s.ZoomableImage_swipeLeft}>
                        <SwipeLeft onClick={(e) => handleLeftClick(e)} />
                    </div>}
                    {children}
                    {isChangeControls && <div className={s.ZoomableImage_swipeRight}>
                        <SwipeRight onClick={(e) => handleRightClick(e)} />
                    </div>}
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
    isChangeControls: PropTypes.bool,
    handleLeftClick: PropTypes.func,
    handleRightClick: PropTypes.func,
    handleClose: PropTypes.func,
};

export default ZoomableImage;