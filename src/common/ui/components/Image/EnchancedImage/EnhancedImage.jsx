import React, { useState } from 'react';
import s from './EnhancedImage.module.scss';
import LoadingSkeleton from '../LoadingSkeleton';
import CachedImage from '../CachedImage';
import PropTypes from 'prop-types';
import ErrorLoadingImage from '../ErrorLoadingImage';
import ZoomableImage from '../ZoomableImage';

const ERROR_LABEL = 'Прозошла ошибка при загрузке фотографии';
const EnhancedImage = ({
    imageUrl,
    alt,
    shouldDisplayTextError,
    images,
    isZoomable,
    isChangeControls,
    widthSkeleton,
    heightSkeleton,
}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isErrorLoading, setIsErrorLoading] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
    const [defaultImageUrl] = useState(imageUrl);
    
    const handleRightClick = (e) => {
        e?.stopPropagation();
        if (images) {
            let index = images.indexOf(currentImageUrl);
            const newIndex = (index + 1) % images.length;
            setCurrentImageUrl(images[newIndex]);
        }
    };

    const handleLeftClick = (e) => {
        e?.stopPropagation();
        if (images) {
            const index = images.indexOf(currentImageUrl);
            const newIndex = (index - 1 + images.length) % images.length;
            setCurrentImageUrl(images[newIndex]);
        }
    };

    const handleCloseClick = () => {
        setCurrentImageUrl(defaultImageUrl);
    };

    const handleError = () => {
        setIsErrorLoading(true);
        setIsLoading(false);
    };

    const handleClickOnError = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsErrorLoading(false);
        setIsLoading(true);
    };

    return (
        <div className={s.ProductImage}>
            <LoadingSkeleton
                isLoading={isLoading}
                imageUrl={imageUrl}
                width={widthSkeleton}
                height={heightSkeleton}
            />
            <ErrorLoadingImage
                isError={isErrorLoading}
                shouldDisplayRetryButton={true}
                onClick={handleClickOnError}
                label={shouldDisplayTextError && ERROR_LABEL}
            />
            {!isErrorLoading && (
                <div
                    className={s.ProductImage_hidden}
                    style={{ display: isLoading ? 'none' : 'block' }}
                >
                    <ZoomableImage
                        prohibitZoom={!isZoomable}
                        isChangeControls={isChangeControls}
                        handleLeftClick={(e) => handleLeftClick(e)}
                        handleRightClick={(e) => handleRightClick(e)}
                        handleClose={handleCloseClick}
                    >
                        <CachedImage
                            onLoad={() => setIsLoading(false)}
                            onError={handleError}
                            src={currentImageUrl}
                            alt={alt}
                        />
                    </ZoomableImage>
                </div>
            )}
        </div>
    );
};

EnhancedImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    images: PropTypes.array,
    shouldDisplayTextError: PropTypes.bool,
    isZoomable: PropTypes.bool,
    isChangeControls: PropTypes.bool,
    widthSkeleton: PropTypes.string,
    heightSkeleton: PropTypes.string,
};

export default EnhancedImage;
