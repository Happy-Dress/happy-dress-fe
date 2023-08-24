import React from 'react';
import PropTypes from 'prop-types';

const CachedImage = ({ className, src, alt, onLoad }) => {
    const cachedImage = React.useMemo(() => {
        const img = new Image();
        img.src = src;
        return img;
    }, [src]);

    return <img
        className={className}
        onLoad={onLoad}
        src={cachedImage.src}
        alt={alt}
    />;
};

CachedImage.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
};

export default CachedImage;