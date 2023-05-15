import React, { useCallback, useState } from 'react';
import s from './CategoriesDesktop.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../../../../../../common/assets/images/slider-arrow.svg';
import Photo from '../../../../../../common/assets/images/photo_4_3.png';

const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesDesktop = ({ categories: initialState }) => {

    const [categories, setCategories] = useState(initialState);

    const [sliderState, setSliderState] = useState(0);
    const [sizes, setSizes] = useState({ medium: 0, small: 0 });
    const MARGIN_OFFSET = 30;

    const categoriesCarouselHandler = (turn) => {
        if((categories.length - (initialState.length - 1)) === sliderState && turn === 'right') {
            setCategories(prevState => {
                return [...prevState, prevState[sliderState - 1]];
            });
        }
    };

    const sliderChangeHandler = (turn) => {
        switch (turn) {
            case 'right':
                categoriesCarouselHandler(turn);
                setSliderState(sliderState + 1);
                break;
            case 'left':
                setSliderState(sliderState - 1);
                break;
        }
    };

    const sliderLeft = useCallback(() => {
        if(sliderState === 0) return 0;
        let pixels = 0;

        for(let i = 0; i <= sliderState; i++) {
            if(i === 0) continue;

            if(i % 2 === 0) pixels += sizes.small + MARGIN_OFFSET;
            else pixels += sizes.medium + MARGIN_OFFSET;
        }

        return pixels;
    }, [sliderState]);

    const loadHandler = (e) => {
        if(!e.currentTarget || e.currentTarget.classList.contains(s.main)) return;

        if(e.currentTarget.classList.contains(s.medium)) {
            setSizes(prevState => ({ ...prevState, medium: e.target.getBoundingClientRect().width }));
        }
        if(e.currentTarget.classList.contains(s.small)) {
            setSizes(prevState => ({ ...prevState, small: e.target.getBoundingClientRect().width }));
        }
    };

    return (
        <div className={s.CategoriesDesktop}>
            <div className={s.title}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <div className={s.slider}>
                <div
                    className={classNames(s.sliderBtn, s.left, { [s.active]: sliderState !== 0 })}
                    onClick={() => sliderChangeHandler('left')}
                    data-testid='left-arrow'
                >
                    <Arrow/>
                </div>
                <div
                    className={s.sliderWrapper}
                    style={{ left: `-${sliderLeft()}px` }}
                >
                    {categories.map((post, index) => (
                        <div
                            key={index}
                            className={s.card}
                            data-testid={`card_${index}`}
                        >
                            <img
                                className={classNames({
                                    [s.main]: index === sliderState,
                                    [s.medium]: (index % 2 === 0),
                                    [s.small]: (index % 2 === 1)
                                })}
                                src={Photo}
                                alt={'category card'}
                                onLoad={loadHandler}
                            />
                            <h3>{post.name}</h3>
                            <span>{post.description}</span>
                        </div>
                    ))}
                </div>
                <div
                    className={classNames(s.sliderBtn, s.right, { [s.active]: (sliderState !== categories.length) })}
                    onClick={() => sliderChangeHandler('right')}
                    data-testid='right-arrow'
                >
                    <Arrow/>
                </div>
            </div>
        </div>
    );
};
CategoriesDesktop.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })).isRequired
};

export default CategoriesDesktop;
