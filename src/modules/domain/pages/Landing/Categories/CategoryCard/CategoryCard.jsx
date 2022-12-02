import React from 'react';
import s from './CategoryCards.module.scss';
import PropTypes from 'prop-types';


const CategoryCard = ({ post: { name, description, imageUrl } }) =>{

    return (
        <div className={s.card}>
            <img className={s.cardImage} src={imageUrl}/>
            <h3 className={s.cardName}>{name}</h3>
            <span className={s.cardDescription}>{description}</span>
        </div>
    );

};

CategoryCard.propTypes = {
    post: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired

};
export default CategoryCard;
