import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ProductsCardImage.module.scss';
import { ReactComponent as AddIcon } from '../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../common/assets/images/Trash.svg';
import LoadingSkeleton from '../../../../../../common/ui/components/Image/LoadingSkeleton';
import CachedImage from '../../../../../../common/ui/components/Image/CachedImage';
import ZoomableImage from '../../../../../../common/ui/components/Image/ZoomableImage';
import ErrorLoadingImage from '../../../../../../common/ui/components/Image/ErrorLoadingImage';

const ERROR_LABEL = 'Прозошла ошибка при загрузке фотографии';

const ProductsCardImage = ({ imageUrl, alt, onAdd, onDelete, isLoaded, shouldDisplayTextError }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorLoading, setIsErrorLoading] = useState(false);

    const handleError = () => {
        setIsErrorLoading(true);
        setIsLoading(false);
    };

    const handleClickOnError = (e) => {
        e.stopPropagation();
        setIsErrorLoading(false);
        setIsLoading(true);
    };

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
            <ErrorLoadingImage
                isError={isErrorLoading}
                shouldDisplayRetryButton={true}
                onClick={handleClickOnError}
                label={shouldDisplayTextError && ERROR_LABEL}
            />
            {!isErrorLoading && <>
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
                        onLoad={() => setIsLoading(false)}
                        onError={handleError}
                        src={imageUrl}
                        alt={alt}
                    />
                </ZoomableImage>
            </div>
                    }
                </div>
            </>
            }
        </div>
    );
};

ProductsCardImage.propTypes = {
    imageUrl: PropTypes.string,
    alt: PropTypes.string,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    shouldDisplayTextError: PropTypes.bool,
    isLoaded: PropTypes.bool,
};

export default ProductsCardImage;
