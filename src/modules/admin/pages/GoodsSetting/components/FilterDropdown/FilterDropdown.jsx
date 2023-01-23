import React, { useEffect, useState } from 'react';
import s from './FilterDropdown.module.scss';
import { ReactComponent as ArrowDown } from '../../../../../../common/assets/images/arrowDown.svg';
import FilterOption from './FilterOption';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const FilterDropdown = ({ name, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState([]);

    let formatName = '';

    switch (name) {
    case 'models':
        formatName = 'Модель';
        break;
    case 'materials':
        formatName = 'Материал';
        break;
    case 'colors':
        formatName = 'Цвет';
        break;
    }

    useEffect(() => {
        let queryString = searchParams.toString().split('&');
        const regexp = new RegExp(`${name}=*`, 'g');

        if(!params.length && queryString.filter(item => regexp.test(item)).length) {
            setSearchParams(queryString.filter(item => !regexp.test(item)).join('&'));
        }

        if(params.length) {

            if(!queryString.filter(item => regexp.test(item)).length) {
                queryString.push(`${name}=${params[0]}`);
                setSearchParams(queryString.join('&'));
                return;
            }

            const newQuery = queryString.map(item => {
                if(item.split('=')[0] !== name) return item;
                return `${name}=${params.join(',')}`;
            });
            setSearchParams(newQuery.join('&'));
        }
    }, [params]);

    return (
        <div className={s.FilterDropdown}>
            <div className={s.currentFilter} onClick={() => setIsOpen(!isOpen)}>
                <p>{formatName}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={s.options} style={{ display: isOpen ? 'block' : 'none' }}>
                {
                    options.map(item => {
                        return <FilterOption key={item.id} item={item} setParams={setParams}/>;
                    })
                }
            </div>
        </div>
    );
};

FilterDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};

export default FilterDropdown;