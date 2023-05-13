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

const { TITLE, BREADCRUMBS, FIELDS, OK, CANCEL, NEW_PRODUCT, ERROR, UNKNOWN_ERROR, NOT_CHOSEN } = PRODUCT_CARD_DICTIONARY;
const { NAME, MATERIAL, CATEGORY, MODEL, DESCRIPTION } = FIELDS;

export const ProductsCard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { showToasterError } = useToasters();
    const { isMobile } = useDeviceTypeContext();

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const navigate = useNavigate();

    const { catalogueSettings } = useDetailedSearch();

    const [defaultValues, setDefaultValues] = useState({
        [NAME.NAME]: '',
        [CATEGORY.NAME]: [],
        [MODEL.NAME]: [],
        [MATERIAL.NAME]: [],
    });

    const onSubmit = (data) => {
        console.log('submit data', data);
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
                    const formData = {
                        [NAME.NAME]: res.name ? res.name : '',
                        [CATEGORY.NAME]: res.category ? [res.category.id.toString()] : [],
                        [MODEL.NAME]: res.model ? [res.model.id.toString()] : [],
                        [MATERIAL.NAME]: res.materials ? res.materials.map((item) => item.id.toString()) : [],
                        [DESCRIPTION.NAME]: res.description,
                    };
                    setDefaultValues(formData);
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

    return (
        <div className={s.productCard}>
            <div className={s.hideOnMobile}>
                <Breadcrumbs breadcrumbs={[...BREADCRUMBS, {
                    id: BREADCRUMBS.length,
                    link: `../product-card${id ? '/' + id : ''}`,
                    linkTitle: productName,
                }]} />
            </div>
            <h2 className={s.productCard_heading}>{TITLE}</h2>
            <form className={s.productCardForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.productCardField}>
                    <label className={s.productCardFieldLabel} htmlFor={NAME.ID}>{NAME.LABEL}</label>
                    <div className={s.productCardFieldContainer}>
                        <TextField
                            placeholder={NAME.PLACEHOLDER}
                            name={NAME.NAME}
                            id={NAME.ID}
                            error={!!errors[NAME.NAME]}
                            { ...register(NAME.NAME, { required: true }) }
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
                            placeholder={isMobile ? NOT_CHOSEN : CATEGORY.LABEL}
                            error={!!errors[CATEGORY.NAME]}
                            { ...register(CATEGORY.NAME, { required: true }) }
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
                            placeholder={isMobile ? NOT_CHOSEN : MODEL.LABEL}
                            error={!!errors[MODEL.NAME]}
                            { ...register(MODEL.NAME, { required: true }) }
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
                            placeholder={isMobile ? NOT_CHOSEN : MATERIAL.LABEL}
                            multiple={true}
                            error={!!errors[MATERIAL.NAME]}
                            { ...register(MATERIAL.NAME, { required: true }) }
                        />
                        <span className={errors[MATERIAL.NAME] ? s.productCardFieldError : s.displayEmpty}>
                            {errors[MATERIAL.NAME] && MATERIAL.ERROR_MESSAGE}
                        </span>
                    </div>
                </div>
                <div className={s.productCardDescription}>
                    <label htmlFor={DESCRIPTION.NAME}
                        className={s.productCardDescriptionTitle}>{DESCRIPTION.LABEL}</label>
                    <textarea
                        className={cls(s.productCardDescriptionField, errors[DESCRIPTION.NAME] && s.productCardDescriptionError)}
                        id={DESCRIPTION.NAME}
                        name={DESCRIPTION.NAME}
                        placeholder={isMobile ? NOT_CHOSEN : DESCRIPTION.PLACEHOLDER}
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
