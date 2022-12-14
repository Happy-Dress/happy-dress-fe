import React, { useEffect, useState } from 'react';
import s from './CategoriesDesktop.module.scss';
import getDataCards from '../../../../api/getDataCards';
import PropTypes from 'prop-types';

const CategoriesDesktop=()=>{
    const [posts,setPosts]=useState([]);
    useEffect( ()=>{
        (async ()=>{
            const newData=await getDataCards();
            setPosts(newData);
        })();
    },[]);
    return(
        <div className={s.Wrapper}>
            <div className={s.Wrapper_header}>
                <h2>Категории товаров</h2>
            </div>
            <div className={s.Wrapper_cards}>
                {posts.map((post)=>(
                    <div key={post.id} className={s.card}>
                        <img  className={s.cardImage} src={post.imageUrl} />
                        <h3 className={s.cardName}>{post.name}</h3>
                        <span className={s.cardDescription}>{post.description}</span>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};
CategoriesDesktop.propTypes = {
    post: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })
};

export default CategoriesDesktop;

// <CategoryCard key={post.id} post={post}/>