import React from 'react';
import s from './CategoriesMobile.module.scss';
import PropTypes from 'prop-types';
import CATEGORIES_DICTIONARY from '../Categories.dictionary';

const { HEADING_LABEL } = CATEGORIES_DICTIONARY;

const CategoriesMobile = ({ categories }) => {
    return (
        <div className={s.Mobile_wrapper}>
            <div className={s.Mobile_wrapper_header}>
                <h2>{HEADING_LABEL}</h2>
            </div>
            <div className={s.Mobile_wrapper_cards}>
                {categories?.map((post) => (
                    <div key={post.id} className={s.Mobile_card}>
                        <img className={s.Mobile_card_image} src={post.imageUrl}/>
                        <h3 className={s.Mobile_card_name}>{post.name}</h3>
                        <span className={s.Mobile_card_description}>{post.description}</span>
                    </div>
                ))}
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
