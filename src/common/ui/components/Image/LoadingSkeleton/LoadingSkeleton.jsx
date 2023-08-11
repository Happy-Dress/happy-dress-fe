import React from 'react';
import PropTypes from 'prop-types';
import ImageSkeleton from '../ImageSkeleton';

const LoadingSkeleton = ({ isLoading, imageUrl, width, height }) => {
    return (
        <>
            {isLoading && imageUrl && <ImageSkeleton width={width} height={height}/>}
        </>
    );
};

LoadingSkeleton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default LoadingSkeleton;