import React, { useState } from 'react';
import s from './CategoriesMobile.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
import { setCategory } from '../../../../../../common/ui/store/slices/productsSearchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageSkeleton from '../../../../../../common/ui/components/Image/ImageSkeleton';


const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesMobile = ({ categories }) => {

    const [index, setIndex] = useState(0);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState(Array(categories.length).fill(false));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            setMoveLeft(true);
            setIsLoading(true);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % categories.length);
                setMoveLeft(false);
            }, 300);

        },
        onSwipedRight: () => {
            setMoveRight(true);
            setIsLoading(true);
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + categories.length - 1) % categories.length);
                setMoveRight(false);
            }, 300);
        },
    });

    const handleLoadImages = (index) => {
        setIsLoading(false);
        const newLoadedImages = [...loadedImages];
        newLoadedImages[index] = true;
        setLoadedImages(newLoadedImages);
    };

    const handleDotClick = (index) => {
        setIsLoading(true);
        setIndex(index);
    };

    const renderDots = () => {
        return (
            <div className={s.slider_dots}>
                {categories.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className={classNames(s.slider_dot, index === i ? s.slider_dot_active : s.slider_dot_disabled)}
                        data-testid={`dot_${i}`}
                    />
                ))}
            </div>
        );
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
            <div className={s.slider}>
                {renderDots()}
                <div className={s.slider_card_swipeable} {...handleSwipe}>
                    {categories.map((post, key) => (
                        <div
                            className={classNames(key === index ? s.slider_card_active :
                                key < index ? s.slider_card_left : s.slider_card_right,
                            moveLeft && key === index ? s.slider_card_moveLeft : '',
                            moveRight && key === index ? s.slider_card_moveRight : '',
                            )}
                            onClick={() => handleClick(post)}
                            key={key}
                            data-testid={`card_${key}`}
                        >
                            {key === index && <div>
                                {isLoading && !loadedImages[index] && <ImageSkeleton width={'90vw'} height={'450px'}/>}
                                <img 
                                    src={post.imageUrl} 
                                    className={s.slider_card_mainImage}
                                    alt={`Slide ${index + 1}`}
                                    onLoad={() => handleLoadImages(index)}
                                    hidden={isLoading && !loadedImages[index]}
                                />
                                <h3>{post.name}</h3>
                                <div className={s.slider_card_description}>
                                    <p>{post.description}</p>
                                </div>
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
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
