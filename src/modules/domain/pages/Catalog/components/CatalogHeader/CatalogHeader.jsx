import React from 'react';
import s from './CatalogHeader.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const CatalogHeader = ({ className }) => {
    return (
        <div className={classNames(s.CatalogHeader, className)}>

        </div>
    );
};

CatalogHeader.propTypes = {
    className: PropTypes.string
};

export default CatalogHeader;