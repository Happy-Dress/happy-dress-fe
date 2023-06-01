import addImage from '../../../../../common/api/addImage/addImage';
import { useState } from 'react';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';
import { PRODUCT_CARD_DICTIONARY } from '../ProductsCard.dictionary';

const { SUCCESS_MESSAGE, } = PRODUCT_CARD_DICTIONARY;

export const useMainImageUrl = () => {
    const { showToasterSuccess, showToasterError } = useToasters();
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleSelectImg = async (e) => {
        if (!e || !e.target.files[0]) {
            setMainImageUrl('');
        } else {
            setIsFetching(true);
            const res = await addImage(e.target.files[0])
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
            setIsFetching(false);
            if (res?.uploadedImages.length) {
                setMainImageUrl(res.uploadedImages[0].imageUrl);
            }
        }
    };

    return { mainImageUrl, setMainImageUrl, isFetching, handleSelectImg };
};
