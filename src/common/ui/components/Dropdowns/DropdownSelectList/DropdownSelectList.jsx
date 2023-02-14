import React, { useState } from 'react';
import s from './DropdownSelectList.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as ArrowDown } from '../../../../assets/images/arrowDown.svg';
import { OptionItem } from './components/OptionItem';
import { formatFiltersName } from './helpers/formatFiltersName';

const DropdownSelectList = (props) => {

    const {
        className,
        options,
        changeFilter,
        currentCategory,
        selectedItems,
        isOptionsAbsolute = true,
        isSingleOptionOnly = false
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classNames(s.DropdownSelectList, className)}>
            <div
                className={s.currentFilter}
                onClick={() => setIsOpen(!isOpen)}
                style={{ height: isOptionsAbsolute ? '100%' : '56px' }}
            >
                <p className={s.title}>{formatFiltersName(currentCategory)}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={s.options} style={{
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
    changeFilter: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    selectedItems: PropTypes.array.isRequired,
    isOptionsAbsolute: PropTypes.bool,
    isSingleOptionOnly: PropTypes.bool
};

export default DropdownSelectList;
