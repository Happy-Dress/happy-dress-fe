import React from 'react';
import { PRODUCT_CARD } from './ProductsCard.dictionary';
import { Breadcrumbs } from '../../../../common/ui/components/Breadcrumbs';
import s from './ProductsCard2.module.scss';
import { TextField } from '../../../../common/ui/components/TextField';
import { useCatalogFetch } from '../../../../common/ui/hooks/useCatalogFetch';
import { useDetailedSearch } from '../../../../common/ui/hooks/useDetailedSearch';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ButtonAccent, ButtonDefault } from '../../../../common/ui/components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DropdownSelect } from '../../../../common/ui/components/DropdownSelect';

const { BREADCRUMBS, FIELDS, OK, CANCEL, NEW_PRODUCT } = PRODUCT_CARD;
const { NAME, MATERIAL, CATEGORY, MODELS, DESCRIPTION } = FIELDS;

export const ProductsCard = () => {
    useCatalogFetch();
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const navigate = useNavigate();

    const { catalogueSettings } = useDetailedSearch();

    const onSubmit = (data) => {
        console.log('submit data', data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const handleNameChange = (e) => {
        e.target.value.length ? setProductName(e.target.value) : setProductName(NEW_PRODUCT);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        setValue(MODELS.NAME, selectedSettings.models);
        selectedSettings.models.length && clearErrors(MODELS.NAME);
    }, [selectedSettings.models]);

    useEffect(() => {
        setValue(MATERIAL.NAME, selectedSettings.materials);
        selectedSettings.materials.length && clearErrors(MATERIAL.NAME);
    }, [selectedSettings.materials]);

    return (
        <div className={s.productCard}>
            <Breadcrumbs breadcrumbs={[...BREADCRUMBS, {
                id: BREADCRUMBS.length,
                link: '../product-card',
                linkTitle: productName,
            }]} />
            <h2 className={s.productCard_heading}>Карта товара</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.productCardField}>
                    <label htmlFor={NAME.ID}>{NAME.LABEL}</label>
                    <TextField
                        placeholder={NAME.PLACEHOLDER}
                        name={NAME.NAME}
                        id={NAME.ID}
                        { ...register(NAME.ID, { required: true, onChange: handleNameChange }) }
                    />
                </div>
                {errors[NAME.NAME] &&
                <span className={s.productCardFieldError}>{NAME.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{CATEGORY.LABEL}</label>
                    <DropdownSelect
                        defaultValues={selectedSettings.category ? [selectedSettings.category.toString()] : []}
                        options={catalogueSettings.categories}
                        placeholder={CATEGORY.LABEL}
                        { ...register(CATEGORY.NAME, { required: true }) }
                    />
                </div>
                {errors[CATEGORY.NAME] &&
                <span className={s.productCardFieldError}>{CATEGORY.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{MODELS.LABEL}</label>
                    <DropdownSelect
                        defaultValues={selectedSettings.models.length ? selectedSettings.models : []}
                        options={catalogueSettings.models}
                        placeholder={MODELS.LABEL}
                        multiple={true}
                        { ...register(MODELS.NAME, { required: true }) }
                    />
                </div>
                {errors[MODELS.NAME] &&
                <span className={s.productCardFieldError}>{MODELS.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{MATERIAL.LABEL}</label>
                    <DropdownSelect
                        defaultValues={selectedSettings.materials.length ? selectedSettings.materials : []}
                        options={catalogueSettings.materials}
                        placeholder={MATERIAL.LABEL}
                        multiple={true}
                        { ...register(MATERIAL.NAME, { required: true }) }
                    />
                </div>
                {errors[MATERIAL.NAME] &&
                <span className={s.productCardFieldError}>{MATERIAL.ERROR_MESSAGE}</span>}
                <div className={s.productCardDescription}>
                    <label htmlFor={DESCRIPTION.NAME}
                        className={s.productCardDescriptionTitle}>{DESCRIPTION.LABEL}</label>
                    <textarea
                        id={DESCRIPTION.NAME}
                        name={DESCRIPTION.NAME}
                        placeholder={DESCRIPTION.PLACEHOLDER}
                        {...register(DESCRIPTION.NAME, { required: true })}
                    />
                </div>
                {errors[DESCRIPTION.NAME] &&
                <span className={s.productCardFieldError}>{DESCRIPTION.ERROR_MESSAGE}</span>}
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
