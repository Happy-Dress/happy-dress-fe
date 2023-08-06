import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ProductsCardsImage.module.scss';
import { ReactComponent as AddIcon } from '../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../common/assets/images/Trash.svg';
import ImageSkeleton from '../../../../../../common/ui/components/Image/ImageSkeleton';

const ProductsCardsImage = ({ imageUrl, alt, onAdd, onDelete, isLoaded }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleAddClick = () => {
        onAdd && onAdd();
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        onDelete && onDelete();
    };

    return (
        <div className={s.pciContent}>
            {isLoading && imageUrl && <ImageSkeleton width={'206px'} height={'308px'}/>}
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
            <div hidden={isLoading}>
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
                    onLoad={() => setIsLoading(false)}
                />
            </div>
                }
            </div>
        </div>
    );
};

ProductsCardsImage.propTypes = {
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    isLoaded: PropTypes.bool,
};

export default ProductsCardsImage;
