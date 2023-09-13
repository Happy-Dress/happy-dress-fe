import React from 'react';
import s from './CategoriesMobile.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import { setCategory } from '../../../../../../common/ui/store/slices/productsSearchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EnhancedImage from '../../../../../../common/ui/components/Image/EnchancedImage';
import Slider from 'react-slick';
import classNames from 'classnames';


const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesMobile = ({ categories }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoPlaySpeed: 3000,
        className: s.slider,
        dotsClass: classNames('slick-dots', s.slider_dots),
        lazyLoad: 'ondemand',
    };

    const handleClick = (post) => {
        dispatch(setCategory({ category: post.id, shouldDropProducts: true }));
        window.scrollTo({ top: 0 });
        navigate('../catalog');
    };

    return (
        <div className={s.CategoriesMobile}>
            <div className={s.title}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <Slider {...settings}>
                {categories.map((post, key) => (
                    <div
                        className={s.slider_slide}
                        onClick={() => handleClick(post)}
                        key={key}
                        data-testid={`card_${key}`}
                    >
                        <div className={s.slider_slide_currentImage}>
                            <EnhancedImage
                                imageUrl={post.imageUrl}
                                alt={`Slide ${key + 1}`}
                                isZoomable={false}
                                shouldDisplayTextError={true}
                                widthSkeleton={'90vw'}
                                heightSkeleton={'450px'}
                            />
                        </div>
                        <h3>{post.name}</h3>
                        <p className={s.slider_slide_description}>{post.description}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
    ;
}
;
CategoriesMobile.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })).isRequired
};
export default CategoriesMobile;
