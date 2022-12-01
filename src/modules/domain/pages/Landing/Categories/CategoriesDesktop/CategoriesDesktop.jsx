import React, { useEffect, useState } from 'react';
import s from './CategoriesDesktop.module.scss';
import getDataCards from '../../../../api/getDataCards';
import CategoryCard from '../CategoryCard';




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
                    <CategoryCard key={post.id} post={post}/>
                ))}
            </div>
        </div>
    );
};

export default CategoriesDesktop;

