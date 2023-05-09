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

const { BREADCRUMBS, FIELDS, OK, CANCEL, NEW_PRODUCT, ERROR } = PRODUCT_CARD_DICTIONARY;
const { NAME, MATERIAL, CATEGORY, MODELS, DESCRIPTION } = FIELDS;

export const ProductsCard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { showToasterError } = useToasters();

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const navigate = useNavigate();

    const { catalogueSettings } = useDetailedSearch();

    const [defaultValues, setDefaultValues] = useState({
        [NAME.NAME]: '',
        [CATEGORY.NAME]: [],
        [MODELS.NAME]: [],
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
        navigate(-1);
    };

    useEffect(() => {
        dispatch(fetchCatalogueSettings());
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await getCatalogueItem(id);
                    setProductName(res.name);
                    const formData = {
                        [NAME.NAME]: res.name,
                        [CATEGORY.NAME]: [res.category.id.toString()],
                        [MODELS.NAME]: [res.model.id.toString()],
                        [MATERIAL.NAME]: res.materials.map((item) => item.id.toString()),
                        [DESCRIPTION.NAME]: res.description,
                    };
                    setDefaultValues(formData);
                    reset(formData);
                } catch (e) {
                    showToasterError(`${ERROR} ${id}`);
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
            <h2 className={s.productCard_heading}>Карта товара</h2>
            <form className={s.productCardForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.productCardField}>
                    <label  className={s.productCardFieldLabel} htmlFor={NAME.ID}>{NAME.LABEL}</label>
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
                            placeholder={CATEGORY.LABEL}
                            error={!!errors[CATEGORY.NAME]}
                            { ...register(CATEGORY.NAME, { required: true }) }
                        />
                        <span className={errors[CATEGORY.NAME] ? s.productCardFieldError : s.displayEmpty}>
                            {errors[CATEGORY.NAME] && CATEGORY.ERROR_MESSAGE}
                        </span>
                    </div>
                </div>
                <div className={s.productCardField}>
                    <label className={s.productCardFieldLabel}>{MODELS.LABEL}</label>
                    <div className={s.productCardFieldContainer}>
                        <DropdownSelect
                            defaultValues={defaultValues[MODELS.NAME]}
                            options={catalogueSettings.models}
                            placeholder={MODELS.LABEL}
                            multiple={true}
                            error={!!errors[MODELS.NAME]}
                            { ...register(MODELS.NAME, { required: true }) }
                        />
                        <span className={errors[MODELS.NAME] ? s.productCardFieldError : s.displayEmpty}>
                            {errors[MODELS.NAME] && MODELS.ERROR_MESSAGE}
                        </span>
                    </div>
                </div>
                <div className={s.productCardField}>
                    <label className={s.productCardFieldLabel}>{MATERIAL.LABEL}</label>
                    <div className={s.productCardFieldContainer}>
                        <DropdownSelect
                            defaultValues={defaultValues[MATERIAL.NAME]}
                            options={catalogueSettings.materials}
                            placeholder={MATERIAL.LABEL}
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
                        placeholder={DESCRIPTION.PLACEHOLDER}
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
