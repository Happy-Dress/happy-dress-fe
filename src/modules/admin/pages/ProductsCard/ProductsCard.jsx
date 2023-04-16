import { PRODUCT_CARD } from './ProductsCard.dictionary';
import { Breadcrumbs } from '../../../../common/ui/components/Breadcrumbs';
import s from './ProductsCard.module.scss';
import { TextField } from '../../../../common/ui/components/TextField';
import { useCatalogFetch } from '../../../../common/ui/hooks/useCatalogFetch';
import { useDetailedSearch } from '../../../../common/ui/hooks/useDetailedSearch';
import FilterDropdown
    from '../../../domain/pages/Catalog/components/CatalogSearch/components/FilterDropDown';
import {
    dropFilters,
    selectMaterial,
    selectModel,
    setCategory, unSelectMaterial,
    unSelectModel
} from '../../../../common/ui/store/slices/productsSearchSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ButtonAccent, ButtonDefault } from '../../../../common/ui/components';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const { BREADCRUMBS, FIELDS, OK, CANCEL, NEW_PRODUCT, SELECT_MORE_ONE } = PRODUCT_CARD;
const { NAME, MATERIAL, CATEGORY, MODELS, DESCRIPTION } = FIELDS;

const getName = (selectedItems, items) => {
    if (!selectedItems.length) {
        return null;
    }

    if (selectedItems.length === 1) {
        return items.filter((item) => item.id === selectedItems[0])[0].name;
    }

    return SELECT_MORE_ONE;
};

export const ProductsCard = () => {
    useCatalogFetch();
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const [productName, setProductName] = useState(NEW_PRODUCT);

    const navigate = useNavigate();

    const {
        dispatch,
        catalogueSettings,
        renderOption
    } = useDetailedSearch();

    const onSubmit = (data) => {
        console.log('submit data', data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        clearErrors
    } = useForm();

    useEffect(() => {
        return () => {
            if (catalogueSettings.categories.length) {
                return dispatch(dropFilters(catalogueSettings));
            }
        };
    }, []);

    const handleNameChange = (e) => {
        e.target.value.length ? setProductName(e.target.value) : setProductName(NEW_PRODUCT);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        setValue(CATEGORY.NAME, selectedSettings.category);
    }, [selectedSettings.category]);

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
                        onChange={handleNameChange}
                        register={() => register(NAME.ID, { required: true, onChange: handleNameChange })}
                    />
                </div>
                {errors[NAME.NAME] && <span className={s.productCardFieldError}>{NAME.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{CATEGORY.LABEL}</label>
                    <Controller
                        name={CATEGORY.NAME}
                        control={control}
                        rules={{ required: true }}
                        render={() => (
                            <FilterDropdown
                                selectedOptionIds={[selectedSettings.category]}
                                onSelect={(itemId) => {
                                    dispatch(setCategory(itemId));
                                }}
                                onUnSelect={(itemId) => dispatch(unSelectModel(itemId))}
                                name={catalogueSettings.categories.filter((item) => item.id === selectedSettings.category)[0]?.name || CATEGORY.LABEL}
                                options={catalogueSettings.categories}
                                renderOption={renderOption}
                            />
                        )}
                    />
                </div>
                {errors[CATEGORY.NAME] && <span className={s.productCardFieldError}>{CATEGORY.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{MODELS.LABEL}</label>
                    <Controller
                        name={MODELS.NAME}
                        control={control}
                        rules={{ required: true }}
                        render={() => (
                            <FilterDropdown
                                selectedOptionIds={selectedSettings.models}
                                onSelect={(itemId) => dispatch(selectModel(itemId))}
                                onUnSelect={(itemId) => dispatch(unSelectModel(itemId))}
                                name={getName(selectedSettings.models, catalogueSettings.models) ? getName(selectedSettings.models, catalogueSettings.models) : 'Модели'}
                                options={catalogueSettings.models}
                                renderOption={renderOption}
                            />
                        )}
                    />
                </div>
                {errors[MODELS.NAME] && <span className={s.productCardFieldError}>{MODELS.ERROR_MESSAGE}</span>}
                <div className={s.productCardField}>
                    <label>{MATERIAL.LABEL}</label>
                    <Controller
                        name={MATERIAL.NAME}
                        control={control}
                        rules={{ required: true }}
                        render={() => (
                            <FilterDropdown
                                selectedOptionIds={selectedSettings.materials}
                                onSelect={(itemId) => dispatch(selectMaterial(itemId))}
                                onUnSelect={(modelId) => dispatch(unSelectMaterial(modelId))}
                                name={getName(selectedSettings.materials, catalogueSettings.materials) ? getName(selectedSettings.materials, catalogueSettings.materials) : 'Материал'}
                                options={catalogueSettings.materials}
                                renderOption={renderOption}
                            />
                        )}
                    />
                </div>
                {errors[MATERIAL.NAME] && <span className={s.productCardFieldError}>{MATERIAL.ERROR_MESSAGE}</span>}
                <div className={s.productCardDescription}>
                    <label htmlFor={DESCRIPTION.NAME} className={s.productCardDescriptionTitle}>{DESCRIPTION.LABEL}</label>
                    <textarea
                        id={DESCRIPTION.NAME}
                        name={DESCRIPTION.NAME}
                        placeholder={DESCRIPTION.PLACEHOLDER}
                        {...register(DESCRIPTION.NAME, { required: true })}
                    />
                </div>
                {errors[DESCRIPTION.NAME] && <span className={s.productCardFieldError}>{DESCRIPTION.ERROR_MESSAGE}</span>}
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
