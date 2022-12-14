import React, { useEffect, useState } from 'react';
import s from './CategoriesMobile.module.scss';
import getDataCards from '../../../../api/getDataCards';
import PropTypes from 'prop-types';







const CategoriesMobileCard=()=>{
    const [posts,setPosts]=useState([]);

    useEffect( ()=>{
        (async ()=>{
            const newData=await getDataCards();
            setPosts(newData);
        })();
    },[]);

    return(
        <div className={s.Mobile_wrapper}>
            <div className={s.Mobile_wrapper_header}>
                <h2>Категории товаров</h2>
            </div>
            <div className={s.Mobile_wrapper_cards}>
                {posts.map((post)=>(
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
CategoriesMobileCard.propTypes = {
    post: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })
};
export default CategoriesMobileCard;