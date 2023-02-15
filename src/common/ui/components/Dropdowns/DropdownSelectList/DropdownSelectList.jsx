import React, { useEffect, useRef, useState } from 'react';
import s from './DropdownSelectList.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as ArrowDown } from '../../../../assets/images/arrowDown.svg';
import { OptionItem } from './components/OptionItem';
import { formatFiltersName } from './helpers/formatFiltersName';

const DropdownSelectList = (props) => {

    const {
        className,
        optionsClass,
        currentFilterClass,
        options,
        changeFilter,
        currentCategory,
        selectedItems,
        isOptionsAbsolute = true,
        isSingleOptionOnly = false
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        if(!isOpen) return;

        const handleClick = (e) => {
            if(!dropdownRef.current) return;
            if(!dropdownRef.current.contains(e.target)) setIsOpen(false);
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });

    return (
        <div className={classNames(s.DropdownSelectList, className)} ref={dropdownRef}>
            <div
                className={classNames(s.currentFilter, currentFilterClass)}
                onClick={() => setIsOpen(!isOpen)}
                style={{ height: isOptionsAbsolute ? '100%' : '56px' }}
            >
                <p>{formatFiltersName(currentCategory)}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={classNames(s.options, optionsClass)} style={{
                height: isOpen ? `calc(60px * ${options.length})` : '0',
                position: isOptionsAbsolute ? 'absolute' : 'static'
            }}>
                {
                    options.map(item => {
                        return <OptionItem
                            key={item.id}
                            item={item}
                            changeFilter={changeFilter}
                            isChecked={selectedItems ? selectedItems.includes(item.id) : false}
                            currentCategory={currentCategory}
                            isSingleOptionOnly={isSingleOptionOnly}
                        />;
                    })
                }
            </div>
        </div>
    );
};

DropdownSelectList.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionsClass: PropTypes.string,
    currentFilterClass: PropTypes.string,
    changeFilter: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    selectedItems: PropTypes.array.isRequired,
    isOptionsAbsolute: PropTypes.bool,
    isSingleOptionOnly: PropTypes.bool
};

export default DropdownSelectList;
