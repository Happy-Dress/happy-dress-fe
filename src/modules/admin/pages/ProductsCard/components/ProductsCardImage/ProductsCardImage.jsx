import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ProductsCardImage.module.scss';
import { ReactComponent as AddIcon } from '../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../common/assets/images/Trash.svg';
import LoadingSkeleton from '../../../../../../common/ui/components/Image/LoadingSkeleton';
import CachedImage from '../../../../../../common/ui/components/Image/CachedImage';
import ZoomableImage from '../../../../../../common/ui/components/Image/ZoomableImage';

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
            <LoadingSkeleton isLoading={isLoading} imageUrl={imageUrl} width={'209px'} height={'276px'}/>
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
                <ZoomableImage>
                    <CachedImage
                        className={s.pci_image}
                        src={imageUrl}
                        alt={alt}
                        onLoad={() => setIsLoading(false)}
                    />
                </ZoomableImage>
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
