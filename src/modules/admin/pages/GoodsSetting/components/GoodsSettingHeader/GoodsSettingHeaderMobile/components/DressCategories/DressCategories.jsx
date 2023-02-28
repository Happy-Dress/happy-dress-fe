import React from 'react';
import s from './DressCategories.module.scss';
import PropTypes from 'prop-types';

const DressCategories = ({ category }) => {
    return (
        <div className={s.DressCategories}>
            <p>{category}</p>
        </div>
    );
};

DressCategories.propTypes = {
    category: PropTypes.string.isRequired
};

export default DressCategories;