import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './CatalogContent.module.scss';

const CatalogContent = ({ className }) => {
    return (
        <div className={classNames(s.CatalogContent, className)}>

        </div>
    );
};

CatalogContent.propTypes = {
    className: PropTypes.string
};

export default CatalogContent;