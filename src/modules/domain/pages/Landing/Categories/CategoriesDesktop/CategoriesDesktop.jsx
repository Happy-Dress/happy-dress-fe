import React, { useCallback, useState } from 'react';
import s from './CategoriesDesktop.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../../../../../../common/assets/images/slider-arrow.svg';
import Photo from '../../../../../../common/assets/images/photo_4_3.png';

const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesDesktop = ({ categories }) => {

    const [sliderState, setSliderState] = useState(0);

    const sliderChangeHandler = (turn) => {
        switch (turn) {
            case 'right':
                if(sliderState === categories.length - 1) {
                    setSliderState(0);
                    break;
                }
                setSliderState(sliderState + 1);
                break;
            case 'left':
                setSliderState(sliderState - 1);
                break;
        }
    };

    const sliderLeft = useCallback(() => {
        // 570 : 427.5
        if(sliderState === 0) return 0;
        let pixels = 0;

        for(let i = 0; i <= sliderState; i++) {
            if(i === 0) continue;

            if(i % 2 === 0) pixels += 427.5;
            else pixels += 570;
        }

        return pixels;
    }, [sliderState]);

    return (
        <div className={s.CategoriesDesktop}>
            <div className={s.title}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <div className={s.slider}>
                <div
                    className={classNames(s.sliderBtn, s.left, { [s.active]: sliderState !== 0 })}
                    onClick={() => sliderChangeHandler('left')}
                >
                    <Arrow/>
                </div>
                <div
                    className={s.sliderWrapper}
                    style={{ left: `-${sliderLeft()}px` }}
                >
                    {categories.map((post, index) => (
                        <div
                            key={post.id}
                            className={s.card}
                        >
                            <img
                                className={classNames({
                                    [s.main]: index === sliderState,
                                    [s.medium]: (index % 2 === 0),
                                    [s.small]: (index % 2 === 1)
                                })}
                                src={Photo}
                                alt={'category card'}
                            />
                            <h3>{post.name}</h3>
                            <span>{post.description}</span>
                        </div>
                    ))}
                </div>
                <div
                    className={classNames(s.sliderBtn, s.right, { [s.active]: (sliderState !== categories.length) })}
                    onClick={() => sliderChangeHandler('right')}>
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
