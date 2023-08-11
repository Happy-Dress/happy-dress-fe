import React from 'react';
import s from './ImageSkeleton.module.scss';
import PropTypes from 'prop-types';

const ImageSkeleton = ({ width, height }) => {
    return (
        <div 
            className={s.ImageSkeleton}
            style={{ width: width, height: height }}
        />
    );
};

ImageSkeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};

export default ImageSkeleton;