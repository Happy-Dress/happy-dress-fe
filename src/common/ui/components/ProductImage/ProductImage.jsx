import React, { useState } from 'react';
import LoadingSkeleton from '../Image/LoadingSkeleton';
import CachedImage from '../Image/CachedImage';
import PropTypes from 'prop-types';

const ProductImage = ({ imageUrl, alt, widthSkeleton, heightSkeleton }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <LoadingSkeleton isLoading={isLoading} imageUrl={imageUrl} width={widthSkeleton} height={heightSkeleton}/>
            <div hidden={isLoading}>
                <div>
                    <CachedImage
                        onLoad={() => setIsLoading(false)}
                        src={imageUrl}
                        alt={alt}
                    />
                </div>
            </div>
        </div>
    );
};

ProductImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    widthSkeleton: PropTypes.string.isRequired,
    heightSkeleton: PropTypes.string.isRequired,
};

export default ProductImage; 