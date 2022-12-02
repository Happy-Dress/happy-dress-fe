import React, { useEffect, useState } from 'react';
import s from './CategoriesMobile.module.scss';
import getDataCards from '../../../../api/getDataCards';
import CategoryCardMobile from '../CategoryCardMobile/CategoryCardMobile';




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
                    <CategoryCardMobile key={post.id} post={post}/>
                ))}
            </div>
        </div>
    );
};

export default CategoriesMobileCard;