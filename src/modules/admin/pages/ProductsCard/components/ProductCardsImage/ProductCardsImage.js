import React from 'react';
import PropTypes from 'prop-types';
import s from './ProductCardsImage.module.scss';
import { ReactComponent as AddIcon } from '../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../common/assets/images/Trash.svg';

const ProductCardsImage = ({ imageUrl, alt, onAdd, onDelete, isLoaded }) => {
    const handleAddClick = () => {
        onAdd && onAdd();
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        onDelete && onDelete();
    };

    return (
        <div className={s.pciContent}>
            {!isLoaded &&
            <div className={s.pciLoader} data-testid={'pciLoader'}/>
            }
            {!imageUrl && isLoaded &&
            <AddIcon
                className={s.pciIconAdd}
                onClick={handleAddClick}
                data-testid={'addIcon'}
            />
            }
            {imageUrl && isLoaded &&
            <div className={s.pciContainer}>
                <DeleteIcon
                    className={s.pciIconDelete}
                    onClick={handleDeleteClick}
                    data-testid={'deleteIcon'}
                />
                <img
                    className={s.pciImage}
                    src={imageUrl}
                    alt={alt}
                />
            </div>
            }
        </div>
    );
};

ProductCardsImage.propTypes = {
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    isLoaded: PropTypes.bool,
};

export default ProductCardsImage;
