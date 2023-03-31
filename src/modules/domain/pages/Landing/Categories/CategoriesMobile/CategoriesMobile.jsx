import React, { useState } from 'react';
import s from './CategoriesMobile.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';
import classNames from 'classnames';
import Photo from '../../../../../../common/assets/images/photo_4_3.png';


const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesMobile = ({ categories }) => {

    const [sliderState] = useState(0);

    return (
        <div className={s.CategoriesMobile}>
            <div className={s.title}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <div className={s.slider}>
                <div className={s.bullets}>
                    {
                        categories?.map((post, index) => {
                            return <span key={index} className={s.bullet}/>;
                        })
                    }
                </div>
                <div className={s.sliderWrapper}>
                    {categories?.map((post, index) => (
                        <div key={post.id} className={s.card}>
                            <img
                                src={Photo}
                                alt={'category'}
                                className={classNames({
                                    [s.main]: index === sliderState,
                                    [s.medium]: (index % 2 === 0),
                                    [s.small]: (index % 2 === 1)
                                })}
                            />
                            <h3>{post.name}</h3>
                            <span>{post.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
CategoriesMobile.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })).isRequired
};
export default CategoriesMobile;
