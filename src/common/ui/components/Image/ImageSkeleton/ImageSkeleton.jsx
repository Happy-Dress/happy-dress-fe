import React from 'react';
import s from './ImageSkeleton.module.scss';
import PropTypes from 'prop-types';

const ImageSkeleton = ({ width, height, position, top, left }) => {
    return (
        <div
            id='image-skeleton'
            className={s.ImageSkeleton}
            style={{ width, height, position, top, left }}
        />
    );
};

ImageSkeleton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    position: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string
};

export default ImageSkeleton;