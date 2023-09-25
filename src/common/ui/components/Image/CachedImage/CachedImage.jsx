import React from 'react';
import PropTypes from 'prop-types';

const CachedImage = ({ className, src, alt, onLoad, onError }) => {
    const cachedImage = React.useMemo(() => {
        const img = new Image();
        img.src = src;
        return img;
    }, [src]);

    return <img
        className={className}
        onLoad={onLoad}
        onError={onError}
        src={`${cachedImage.src}&alt=media`}
        alt={alt}
    />;
};

CachedImage.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export default CachedImage;