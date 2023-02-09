import React, { useEffect } from 'react';
import s from './CategoriesSidebar.module.scss';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const CategoriesSidebar = ({ categories }) => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(categories) {
            if(searchParams.toString().split('=').indexOf('categories') === -1) {
                setSearchParams(searchParams.toString() + `categories=${categories[0].id}`);
            }
        }
    }, [categories]);

    const changeCategoryHandler = (id) => {
        let queryString = searchParams.toString().split('&');
        const newQuery = queryString.map(item => {
            if(item.split('=')[0] !== 'categories') return item;
            return `categories=${id}`;
        });
        setSearchParams(newQuery.join('&'));
    };

    if(!categories) return <p>Loading</p>;

    return (
        <div className={s.CategoriesSidebar}>
            {
                categories.map(item => {
                    return (
                        <p
                            key={item.id}
                            className={Number(searchParams.get('categories')) === item.id ? s.active : ''}
                            onClick={() => changeCategoryHandler(item.id)}
                        >
                            {item.name}
                        </p>
                    );
                })
            }
        </div>
    );
};

CategoriesSidebar.propTypes = {
    categories: PropTypes.array
};

export default CategoriesSidebar;