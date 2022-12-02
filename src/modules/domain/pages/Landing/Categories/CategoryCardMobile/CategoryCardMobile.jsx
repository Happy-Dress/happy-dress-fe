import React from 'react';
import s from './CategoryCardMobile.module.scss';
import PropTypes from 'prop-types';


const CategoryCardMobile = ({ post: { name, description, imageUrl } }) =>{

    return (
        <div className={s.Mobile_card}>
            <img className={s.Mobile_card_image} src={imageUrl}/>
            <h3 className={s.Mobile_card_name}>{name}</h3>
            <span className={s.Mobile_card_description}>{description}</span>
        </div>
    );

};

CategoryCardMobile.propTypes = {
    post: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    }).isRequired

};
export default CategoryCardMobile;
