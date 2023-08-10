import addImage from '../../../../../common/api/addImage/addImage';
import { useState } from 'react';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';
import { PRODUCT_CARD_DICTIONARY } from '../ProductsCard.dictionary';

const { SUCCESS_MESSAGE, } = PRODUCT_CARD_DICTIONARY;

export const useProductImages = (productColorImages, setProductColorImages) => {
    const { showToasterSuccess, showToasterError } = useToasters();
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleMainImg = async (e) => {
        if (!e || !e.target.files[0]) {
            setMainImageUrl('');
        } else {
            setIsFetching(true);
            const res = await uploadImage(e.target.files[0]);
            setIsFetching(false);
            if (res?.uploadedImages.length) {
                setMainImageUrl(res.uploadedImages[0].imageUrl);
            }
        }
    };
    
    const handleGalleryImg = async (color, e) => {
        const colorIndex = productColorImages.findIndex((item) => item.color.id === color.id);
        if (e && e.target.files[0]) {
            setIsFetching(true);
            const res = await uploadImage(e.target.files[0]);
            setIsFetching(false);
            if (res?.uploadedImages.length) {
                const newColorsImages = [...productColorImages];
                newColorsImages[colorIndex].imageURLs.push(res.uploadedImages[0].imageUrl);
                setProductColorImages(newColorsImages);
            }
        }
    };

    const handleDeleteGalleryImg = (color, imageUrl) => {
        const colorIndex = productColorImages.findIndex((item) => item.color.id === color.id);
        const newColorsImages = [...productColorImages];
        newColorsImages[colorIndex].imageURLs = newColorsImages[colorIndex].imageURLs.filter((item) => item !== imageUrl);
        setProductColorImages(newColorsImages);
    };
    
    const uploadImage = async (file) => {
        return await addImage(file)
            .then((r) => {
                if (r.uploadedImages.length) {
                    showToasterSuccess(SUCCESS_MESSAGE);
                }

                if (r.failedImages.length) {
                    showToasterError(r.failedImages[0].imageName + ' ' +
                        r.failedImages[0].reason.toString());
                }

                return r;
            })
            .catch((e) => {
                showToasterError(e.toString());
            });
    };

    return { mainImageUrl, isFetching, setMainImageUrl, handleMainImg, handleGalleryImg, handleDeleteGalleryImg };
};
