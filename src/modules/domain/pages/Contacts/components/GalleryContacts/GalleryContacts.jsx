import React from 'react';
import s from './GalleryContacts.module.scss';
import EnhancedImage from '../../../../../../common/ui/components/Image/EnchancedImage';
import PropTypes from 'prop-types';

const GalleryContacts = ({ mainImage, secondaryImages }) => {
    return (
        <div className={s.GalleryContacts}>
            <div className={s.GalleryContacts_images}>
                <div className={s.GalleryContacts_images_main}>
                    <EnhancedImage
                        imageUrl={mainImage}
                        alt={'main image show room'}
                        shouldDisplayTextError={true}
                        isZoomable={true}
                    />
                </div>
                <div className={s.GalleryContacts_images_secondaries}>
                    {secondaryImages.map((image, index) => (
                        <div className={s.GalleryContacts_images_secondaries_image} key={index}>
                            <EnhancedImage
                                imageUrl={image}
                                alt={`secondary image ${index} show room`}
                                isZoomable={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

GalleryContacts.propTypes = {
    mainImage: PropTypes.string.isRequired,
    secondaryImages: PropTypes.array.isRequired  
};

export default GalleryContacts;