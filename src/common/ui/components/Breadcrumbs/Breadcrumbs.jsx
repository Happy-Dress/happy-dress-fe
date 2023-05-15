import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './Breadcrumbs.module.scss';

export const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <ul className={s.breadcrumbs}>
            {breadcrumbs.map((item, idx) => {
                return (
                    <li key={item.id}>
                        <Link to={item.link}>
                            {item.linkTitle}
                        </Link>
                        <span>{idx !== breadcrumbs.length - 1 && '>'}</span>
                    </li>
                );
            })}
        </ul>
    );
};

const breadcrumbItem = PropTypes.shape({
    id: PropTypes.number,
    link: PropTypes.string,
    linkTitle: PropTypes.string,
});

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.arrayOf(breadcrumbItem),
};
