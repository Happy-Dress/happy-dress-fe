import React, { useState } from 'react';
import s from './CategoriesMobile.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';


const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesMobile = ({ categories }) => {

    const [index, setIndex] = useState(0);
    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            setIndex((prevIndex) => (prevIndex + 1) % categories.length);
        },
        onSwipedRight: () => setIndex((prevIndex) => (prevIndex + categories.length - 1) % categories.length),
    });


    const renderDots = () => {
        return (
            <div className={s.slider_dots}>
                {categories.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setIndex(i)}
                        className={classNames(s.slider_dot, index === i ? s.slider_dot_active : s.slider_dot_disabled)}
                        data-testid={`dot_${i}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={s.CategoriesMobile}>
            <div className={s.title}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <div className={s.slider}>
                {renderDots()}
                <div {...handleSwipe}>
                    {categories.map((post, key) => (
                        <div
                            className={classNames(key === index ? s.slider_card_active :
                                key < index ? s.slider_card_left : s.slider_card_right)}
                            key={key}
                            data-testid={`card_${key}`}
                        >
                            {key === index && <div>
                                <img src={post.imageUrl} className={s.slider_card_mainImage}
                                    alt={`Slide ${index + 1}`}/>
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
