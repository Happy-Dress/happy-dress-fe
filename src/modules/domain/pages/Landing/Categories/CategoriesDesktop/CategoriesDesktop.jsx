import React, { useEffect, useState } from 'react';
import s from './CategoriesDesktop.module.scss';
import getDataCards from '../../../../api/getDataCards';
import axios from 'axios';



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
                    <div key={post.id} className={s.Wrapper_cards_all}>
                        <h3 className={s.Wrapper_cards_name}>{post.name}</h3>
                        <p className={s.Wrapper_cards_description}>{post.description}</p>
                        <img className={s.Wrapper_cards_img} src={post.imageUrl} alt="image"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesDesktop;

