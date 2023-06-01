import React from 'react';
import { PRODUCT_CARD_DICTIONARY } from './ProductsCard.dictionary';
import { Breadcrumbs } from '../../../../common/ui/components/Breadcrumbs';
import s from './ProductsCard.module.scss';
import { TextField } from '../../../../common/ui/components/TextField';
import { useDetailedSearch } from '../../../../common/ui/hooks/useDetailedSearch';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ButtonAccent, ButtonDefault } from '../../../../common/ui/components';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DropdownSelect } from '../../../../common/ui/components/DropdownSelect';
import cls from 'classnames';
import getCatalogueItem from '../../../../common/api/catalogItem/getCatalogItem';
import { fetchCatalogueSettings } from '../../../../common/ui/store/slices/catalogueSettingsSlice';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';
import ProductCardsImage from './components/ProductCardsImage';
import updateCatalogueItem from '../../../../common/api/catalogItem/updateCatalogItem';
import { useMainImageUrl } from './hooks/useMainImageUrl';

const {
    TITLE,
    BREADCRUMBS,
    FIELDS,
    OK,
    CANCEL,
    NEW_PRODUCT,
    ERROR,
    UNKNOWN_ERROR,
    NOT_CHOSEN,
    PRODUCT_SAVED,
} = PRODUCT_CARD_DICTIONARY;
const { NAME, MATERIAL, CATEGORY, MODEL, DESCRIPTION, MAIN_IMAGE_URL, MAIN_IMAGE_FILE } = FIELDS;

export const ProductsCard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { showToasterSuccess, showToasterError } = useToasters();
    const { isMobile } = useDeviceTypeContext();
    const navigate = useNavigate();
    const { catalogueSettings } = useDetailedSearch();
    const { mainImageUrl, setMainImageUrl, isFetching, handleSelectImg } = useMainImageUrl();

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const [defaultValues, setDefaultValues] = useState({
        [NAME.NAME]: '',
        [CATEGORY.NAME]: '',
        [MODEL.NAME]: '',
        [MATERIAL.NAME]: [],
        [MAIN_IMAGE_URL.NAME]: null,
    });

    const [product, setProduct] = useState(defaultValues);

    const onSubmit = async (data) => {
        const dataToSave = {
            id,
            name: data.dressName,
            description: data.description,
            mainImageUrl,
            categoryId: Number(data.category),
            modelId: Number(data.model),
            materialIds: data.materials.map((m) => Number(m)),
            productColorImages: product.productColorImages.map((i) => ({ colorId: i.color.id, imageURLs: i.imageURLs })),
            productColorSizes: product.productColorSizes.map((c) => ({ colorId: c.color.id, sizeId: c.size.id })),
        };

        try {
            const res = await updateCatalogueItem(dataToSave);
            setProduct(res);
            showToasterSuccess(PRODUCT_SAVED);
        } catch (e) {
            e
                ? showToasterError(e.toString())
                : showToasterError(UNKNOWN_ERROR);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleCancel = () => {
        navigate('../products-settings');
    };

    useEffect(() => {
        dispatch(fetchCatalogueSettings());
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await getCatalogueItem(id);
                    setProductName(res.name);
                    setProduct(res);
                    setMainImageUrl(res.mainImageUrl);
                    const formData = {
                        [NAME.NAME]: res.name ? res.name : '',
                        [CATEGORY.NAME]: res.category ? res.category.id.toString() : '',
                        [MODEL.NAME]: res.model ? res.model.id.toString() : '',
                        [MATERIAL.NAME]: res.materials ? res.materials.map((item) => item.id.toString()) : [],
                        [DESCRIPTION.NAME]: res.description,
                    };
                    setDefaultValues((prev) => ({ ...prev, ...formData }));
                    reset(formData);
                } catch (e) {
                    e
                        ? showToasterError(`${ERROR} ${id}`)
                        : showToasterError(UNKNOWN_ERROR);
                }
            }
        };
        fetchData();
    }, []);

    const handleDeleteImage = () => {
        setMainImageUrl('');
    };

    return (
        <div className={s.productCard}>
            <div className={s.hideOnMobile}>
                <Breadcrumbs breadcrumbs={[...BREADCRUMBS, {
                    id: BREADCRUMBS.length,
                    link: `../product-card${id ? '/' + id : ''}`,
                    linkTitle: productName,
                }]}/>
            </div>
            <h2 className={s.productCard_heading}>{TITLE}</h2>
            <form className={s.productCardForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.productCardFieldsSection}>
                    <label htmlFor={MAIN_IMAGE_FILE.NAME}>
                        <ProductCardsImage
                            imageUrl={mainImageUrl}
                            alt={productName}
                            onDelete={handleDeleteImage}
                            isLoaded={!isFetching}
                        />
                    </label>
                    {!mainImageUrl &&
                    <input
                        type="file"
                        accept="image/*"
                        id={MAIN_IMAGE_FILE.NAME}
                        {...register(MAIN_IMAGE_FILE.NAME, { onChange: handleSelectImg })}
                    />
                    }
                    <div className={s.productCardFields}>
                        <div className={s.productCardField}>
                            <label className={s.productCardFieldLabel} htmlFor={NAME.ID}>{NAME.LABEL}</label>
                            <div className={s.productCardFieldContainer}>
                                <TextField
                                    placeholder={NAME.PLACEHOLDER}
                                    name={NAME.NAME}
                                    id={NAME.ID}
                                    error={!!errors[NAME.NAME]}
                                    {...register(NAME.NAME, { required: true })}
                                />
                                <span className={errors[NAME.NAME] ? s.productCardFieldError : s.displayEmpty}>
                                    {errors[NAME.NAME] && NAME.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCardField}>
                            <label className={s.productCardFieldLabel}>{CATEGORY.LABEL}</label>
                            <div className={s.productCardFieldContainer}>
                                <DropdownSelect
                                    defaultValues={defaultValues[CATEGORY.NAME]}
                                    options={catalogueSettings.categories}
                                    placeholder={isMobile ? CATEGORY.LABEL : NOT_CHOSEN}
                                    error={!!errors[CATEGORY.NAME]}
                                    {...register(CATEGORY.NAME, { required: true })}
                                />
                                <span className={errors[CATEGORY.NAME] ? s.productCardFieldError : s.displayEmpty}>
                                    {errors[CATEGORY.NAME] && CATEGORY.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCardField}>
                            <label className={s.productCardFieldLabel}>{MODEL.LABEL}</label>
                            <div className={s.productCardFieldContainer}>
                                <DropdownSelect
                                    defaultValues={defaultValues[MODEL.NAME]}
                                    options={catalogueSettings.models}
                                    placeholder={isMobile ? MODEL.LABEL : NOT_CHOSEN}
                                    error={!!errors[MODEL.NAME]}
                                    {...register(MODEL.NAME, { required: true })}
                                />
                                <span className={errors[MODEL.NAME] ? s.productCardFieldError : s.displayEmpty}>
                                    {errors[MODEL.NAME] && MODEL.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCardField}>
                            <label className={s.productCardFieldLabel}>{MATERIAL.LABEL}</label>
                            <div className={s.productCardFieldContainer}>
                                <DropdownSelect
                                    defaultValues={defaultValues[MATERIAL.NAME]}
                                    options={catalogueSettings.materials}
                                    placeholder={isMobile ? MATERIAL.LABEL : NOT_CHOSEN}
                                    multiple={true}
                                    error={!!errors[MATERIAL.NAME]}
                                    {...register(MATERIAL.NAME, { required: true })}
                                />
                                <span className={errors[MATERIAL.NAME] ? s.productCardFieldError : s.displayEmpty}>
                                    {errors[MATERIAL.NAME] && MATERIAL.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.productCardDescription}>
                    <label
                        htmlFor={DESCRIPTION.NAME}
                        className={s.productCardDescriptionTitle}
                    >
                        {DESCRIPTION.LABEL}
                    </label>
                    <textarea
                        className={cls(s.productCardDescriptionField, errors[DESCRIPTION.NAME] && s.productCardDescriptionError)}
                        id={DESCRIPTION.NAME}
                        name={DESCRIPTION.NAME}
                        placeholder={isMobile ? DESCRIPTION.PLACEHOLDER : NOT_CHOSEN}
                        {...register(DESCRIPTION.NAME, { required: true })}
                    />
                    <span className={errors[DESCRIPTION.NAME] ? s.productCardFieldError : s.displayEmpty}>
                        {errors[DESCRIPTION.NAME] && DESCRIPTION.ERROR_MESSAGE}
                    </span>
                </div>
                <div className={s.productCardFooter}>
                    <ButtonDefault
                        text={CANCEL}
                        onClick={handleCancel}
                        type={'button'}
                    />
                    <ButtonAccent
                        text={OK}
                    />
                </div>
            </form>
        </div>
    );
};
