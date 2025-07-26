import React, { useCallback, useEffect, useState } from 'react';
import s from './ProductMobileGallerySlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EnhancedImage from '../../../../../../common/ui/components/Image/EnchancedImage';
import CloseIcon from '../../../../../../assets/images/closeIcon.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const ProductMobileGallerySlider = ({ productColorImages }) => {
    
    const [isExpanded, setIsExpanded] = useState(false);
    
    const customPaging = useCallback((i) => {
        return (
            <div
                key={productColorImages.color.id}
                className={s.ProductMobileGallerySlider_carousel_dot}
            >
                <EnhancedImage
                    imageUrl={productColorImages.imageURLs[i]}
                    alt={`product color ${productColorImages.color.name} ${i}`}
                />
            </div>
        );
    }, [productColorImages]);

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoPlaySpeed: 3000,
        pauseOnHover: true,
        lazyLoad: 'ondemand',
        dotsClass: classNames('slick-dots', s.ProductMobileGallerySlider_carousel_dots),
        className: classNames(isExpanded ? s.ProductMobileGallerySlider_carousel_expanded : s.ProductMobileGallerySlider_carousel),
        customPaging: customPaging,
    };

    useEffect(() => {
        document.body.style.overflowY = isExpanded ? 'hidden' : 'auto';
    }, [isExpanded]);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    
    return (
        <div className={isExpanded ? s.ProductMobileGallerySlider_expanded : s.ProductMobileGallerySlider}>
            <div className={s.ProductMobileGallerySlider_overlay}>
                {isExpanded && <div className={s.ProductMobileGallerySlider_overlay_closeIcon} onClick={toggleExpand}>
                    <CloseIcon />
                </div>}
                <Slider
                    key={productColorImages.color.id}
                    {...settings}
                >
                    {productColorImages.imageURLs.map((imageUrl, key) => (
                        <div
                            className={s.ProductMobileGallerySlider_carousel_slide}
                            key={key + productColorImages.color.id + 1}
                            onClick={toggleExpand}
                        >
                            <EnhancedImage
                                imageUrl={imageUrl}
                                alt={`product image color ${productColorImages.color.name}`}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};



ProductMobileGallerySlider.propTypes = {
    productColorImages: PropTypes.object.isRequired,
};

export default ProductMobileGallerySlider;