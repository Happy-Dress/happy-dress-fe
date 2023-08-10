import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ProductsCardImage.module.scss';
import { ReactComponent as AddIcon } from '../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../common/assets/images/Trash.svg';
import ImageSkeleton from '../../../../../../common/ui/components/Image/ImageSkeleton';

const ProductsCardImage = ({ imageUrl, alt, onAdd, onDelete, isLoaded }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleAddClick = () => {
        onAdd && onAdd();
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        onDelete && onDelete();
    };

    return (
        <div className={s.pci_content}>
            {isLoading && imageUrl && <ImageSkeleton width={'209px'} height={'276px'}/>}
            {!isLoaded &&
            <div className={s.pci_loader} data-testid={'pciLoader'}/>
            }
            {!imageUrl && isLoaded &&
                <div
                    className={s.pci_iconAdd}
                    onClick={handleAddClick}
                    data-testid={'addIcon'}
                >
                    <AddIcon/>
                </div>
            }
            <div hidden={isLoading}>
                {imageUrl && isLoaded &&
            <div className={s.pci_container}>
                <DeleteIcon
                    className={s.pci_iconDelete}
                    onClick={handleDeleteClick}
                    data-testid={'deleteIcon'}
                />
                <img
                    className={s.pci_image}
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

ProductsCardImage.propTypes = {
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    isLoaded: PropTypes.bool,
};

export default ProductsCardImage;
