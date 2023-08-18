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
import ProductsCardImage from './components/ProductsCardImage';
import updateCatalogItem from '../../../../common/api/catalogItem/updateCatalogItem';
import { useProductImages } from './hooks/useProductImages';
import ProductsCardColors from './components/ProductsCardColors';
import { fetchProduct } from '../../../../common/ui/store/slices/productSlice';
import ProductsCardGallery from './components/ProductsCardGallery';
import createCatalogItem from '../../../../common/api/catalogItem/createCatalogItem';


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
    EMPTY_COLOR_OBJECT,
    EMPTY_SIZE_OBJECT,
    ALL_COLORS_AVAILABLE_MESSAGE,
    ALL_COLORS_SELECTED_MESSAGE,
    ALL_COLORS_WITH_PICTURES_MESSAGE,
    HAVE_COLORS_MESSAGE,
} = PRODUCT_CARD_DICTIONARY;
const { NAME, MATERIAL, CATEGORY, MODEL, DESCRIPTION, MAIN_IMAGE_URL, MAIN_IMAGE_FILE, PRODUCT_COLOR_IMAGES } = FIELDS;

const getSelectValues = (values) => {
    return values.map((item) => ({ ...item, value: item.id, label: item.name }));
};

export const ProductsCard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { showToasterSuccess, showToasterError } = useToasters();
    const { isMobile } = useDeviceTypeContext();
    const navigate = useNavigate();
    const { catalogueSettings } = useDetailedSearch();
    const { mainImageUrl, setMainImageUrl, isFetching, handleMainImg } = useProductImages();

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const [defaultValues, setDefaultValues] = useState({
        [NAME.NAME]: '',
        [CATEGORY.NAME]: '',
        [MODEL.NAME]: '',
        [MATERIAL.NAME]: [],
        [MAIN_IMAGE_URL.NAME]: null,
        [PRODUCT_COLOR_IMAGES.NAME]: [],
    });

    const [product, setProduct] = useState(defaultValues);
    const [productColorSizes, setProductColorSizes] = useState(product.productColorSizes);
    const [productColorImages, setProductColorImages] = useState(product.productColorImages);
    const checkIsAllColorsSelected = () => {
        return productColorSizes.every((item) => item.color.id !== EMPTY_COLOR_OBJECT.id);
    };

    const checkIsAllColorsAreAvailable = () => {
        return productColorSizes.every((item) => item.size.id !== EMPTY_SIZE_OBJECT.id);
    };

    const checkHaveColors = () => {
        return productColorSizes.length > 0;
    };

    const checkIsAllColorsWithPictures = () => {
        return productColorImages.every((item) => item.imageURLs.length > 0);
    };

    const onSubmit = async (data) => {
        if (!checkIsAllColorsSelected()) {
            showToasterError(ALL_COLORS_SELECTED_MESSAGE);
            return;
        }
        if (!checkIsAllColorsAreAvailable()) {
            showToasterError(ALL_COLORS_AVAILABLE_MESSAGE);
            return;
        }
        if (!checkHaveColors()) {
            showToasterError(HAVE_COLORS_MESSAGE);
            return;
        }
        if (!checkIsAllColorsWithPictures()) {
            showToasterError(ALL_COLORS_WITH_PICTURES_MESSAGE);
            return;
        }
        const dataToSave = {
            id,
            name: data.dressName,
            description: data.description,
            mainImageUrl,
            categoryId: Number(data.category),
            modelId: Number(data.model),
            materialIds: data.materials.map((m) => Number(m)),
            productColorImages: productColorImages.map((i) => ({
                colorId: i.color.id,
                imageURLs: i.imageURLs
            })),
            productColorSizes: productColorSizes.map((c) => ({ colorId: c.color.id, sizeId: c.size.id })),
        };

        try {
            const res = id ? await updateCatalogItem(dataToSave) : await createCatalogItem(dataToSave);
            showToasterSuccess(PRODUCT_SAVED);
            navigate(id ? '' : `${res.id}`);
            setProduct(res);
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
        dispatch(fetchCatalogueSettings({ isSecure: true }));
        const fetchData = async () => {
            if (id) {
                dispatch(fetchProduct({ productId: id }));
                try {
                    const res = await getCatalogueItem(id, true);
                    setProductName(res.name);
                    setProduct(res);
                    setMainImageUrl(res.mainImageUrl);
                    setProductColorSizes(res.productColorSizes);
                    setProductColorImages(res.productColorImages);
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
    }, [product]);

    useEffect(() => {
        const newProductColorImages = [...productColorImages];
        productColorSizes?.forEach((colorSize) => {
            if (!productColorImages.some((item) => item.color.id === colorSize.color.id)) {
                newProductColorImages.push({ color: colorSize.color, imageURLs: [] });
            }
        });
        productColorImages?.forEach((colorImage) => {
            if (!productColorSizes.some((item) => item.color.id === colorImage.color.id)) {
                const indexToRemove = productColorImages.findIndex((item) => item.color.id === colorImage.color.id);
                newProductColorImages.splice(indexToRemove, 1);
            }
        });
        setProductColorImages(newProductColorImages);
    }, [productColorSizes]);

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
            <form className={s.productCard_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.productCard_fields_section}>
                    <label htmlFor={MAIN_IMAGE_FILE.NAME}>
                        <ProductsCardImage
                            imageUrl={mainImageUrl}
                            alt={productName}
                            onDelete={handleDeleteImage}
                            isLoaded={!isFetching}
                        />
                        {!mainImageUrl &&
                        <input
                            type="file"
                            accept="image/*"
                            id={MAIN_IMAGE_FILE.NAME}
                            {...register(MAIN_IMAGE_FILE.NAME, { onChange: handleMainImg })}
                        />
                        }
                    </label>
                    <div className={s.productCard_fields}>
                        <div className={s.productCard_field}>
                            <label className={s.productCard_field_label} htmlFor={NAME.ID}>{NAME.LABEL}</label>
                            <div className={s.productCard_field_container}>
                                <TextField
                                    placeholder={NAME.PLACEHOLDER}
                                    name={NAME.NAME}
                                    id={NAME.ID}
                                    error={!!errors[NAME.NAME]}
                                    {...register(NAME.NAME, { required: true })}
                                />
                                <span className={errors[NAME.NAME] ? s.productCard_field_error : s.displayEmpty}>
                                    {errors[NAME.NAME] && NAME.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCard_field}>
                            <label className={s.productCard_field_label}>{CATEGORY.LABEL}</label>
                            <div className={s.productCard_field_container}>
                                <DropdownSelect
                                    defaultValues={defaultValues[CATEGORY.NAME]}
                                    options={getSelectValues(catalogueSettings.categories)}
                                    placeholder={isMobile ? CATEGORY.LABEL : NOT_CHOSEN}
                                    error={!!errors[CATEGORY.NAME]}
                                    {...register(CATEGORY.NAME, { required: true })}
                                />
                                <span className={errors[CATEGORY.NAME] ? s.productCard_field_error : s.displayEmpty}>
                                    {errors[CATEGORY.NAME] && CATEGORY.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCard_field}>
                            <label className={s.productCard_field_label}>{MODEL.LABEL}</label>
                            <div className={s.productCard_field_container}>
                                <DropdownSelect
                                    defaultValues={defaultValues[MODEL.NAME]}
                                    options={getSelectValues(catalogueSettings.models)}
                                    placeholder={isMobile ? MODEL.LABEL : NOT_CHOSEN}
                                    error={!!errors[MODEL.NAME]}
                                    {...register(MODEL.NAME, { required: true })}
                                />
                                <span className={errors[MODEL.NAME] ? s.productCard_field_error : s.displayEmpty}>
                                    {errors[MODEL.NAME] && MODEL.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                        <div className={s.productCard_field}>
                            <label className={s.productCard_field_label}>{MATERIAL.LABEL}</label>
                            <div className={s.productCard_field_container}>
                                <DropdownSelect
                                    defaultValues={defaultValues[MATERIAL.NAME]}
                                    options={getSelectValues(catalogueSettings.materials)}
                                    placeholder={isMobile ? MATERIAL.LABEL : NOT_CHOSEN}
                                    multiple={true}
                                    error={!!errors[MATERIAL.NAME]}
                                    {...register(MATERIAL.NAME, { required: true })}
                                />
                                <span className={errors[MATERIAL.NAME] ? s.productCard_field_error : s.displayEmpty}>
                                    {errors[MATERIAL.NAME] && MATERIAL.ERROR_MESSAGE}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.productCard_productColors}>
                    <ProductsCardColors
                        productColorSizes={product.productColorSizes}
                        allSizes={catalogueSettings.sizes}
                        allColors={catalogueSettings.colors}
                        setProductColorSizes={setProductColorSizes}
                    />
                </div>
                <div className={s.productCard_description}>
                    <label
                        htmlFor={DESCRIPTION.NAME}
                        className={s.productCard_description_title}
                    >
                        {DESCRIPTION.LABEL}
                    </label>
                    <textarea
                        className={cls(s.productCard_description_field, errors[DESCRIPTION.NAME] && s.productCard_description_error)}
                        id={DESCRIPTION.NAME}
                        name={DESCRIPTION.NAME}
                        placeholder={isMobile ? DESCRIPTION.PLACEHOLDER : NOT_CHOSEN}
                        {...register(DESCRIPTION.NAME, { required: true })}
                    />
                    <span className={errors[DESCRIPTION.NAME] ? s.productCard_field_error : s.displayEmpty}>
                        {errors[DESCRIPTION.NAME] && DESCRIPTION.ERROR_MESSAGE}
                    </span>
                </div>
                <ProductsCardGallery
                    productColorImages={productColorImages}
                    setProductColorImages={setProductColorImages}
                />
                <div className={s.productCard_footer}>
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
}
;
