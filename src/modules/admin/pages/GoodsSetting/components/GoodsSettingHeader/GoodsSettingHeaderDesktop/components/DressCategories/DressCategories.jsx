import React, { useEffect } from 'react';
import s from './DressCategories.module.scss';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const DressCategories = ({ categories }) => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.toString().split('=').indexOf('categories') === -1) {
            setSearchParams(searchParams.toString() + `categories=${categories[0].id}`);
        }
    }, []);

    const changeCategoryHandler = (id) => {
        let queryString = searchParams.toString().split('&');
        const newQuery = queryString.map(item => {
            if(item.split('=')[0] !== 'categories') return item;
            return `categories=${id}`;
        });
        setSearchParams(newQuery.join('&'));
    };

    return (
        <div className={s.DressCategories}>
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

DressCategories.propTypes = {
    categories: PropTypes.array.isRequired
};

export default DressCategories;
