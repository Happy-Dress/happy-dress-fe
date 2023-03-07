import s from './DetailedSerach.module.scss';
import {
    selectColor,
    selectMaterial,
    selectModel,
    selectSize,
    unSelectColor,
    unSelectMaterial,
    unSelectModel, unSelectSize
} from '../../../../../../../../common/ui/store/slices/productsSearchSlice';
import FilterDropDown from '../FilterDropDown';
import { useDetailedSearch } from '../../../../../../../../common/ui/hooks/useDetailedSearch';


const DetailedSearch = () =>{
    const {
        dispatch,
        selectedSettings,
        catalogueSettings,
        renderColorOption,
        renderSizeOption,
        renderOption
    } = useDetailedSearch(s.DetailedSearch_colorOption, s.DetailedSearch_colorOption_colorCircle, s.DetailedSearch_simpleOption);

    return (
        <>
            <FilterDropDown
                selectedOptionIds={selectedSettings.models}
                onSelect={(modelId) => dispatch(selectModel(modelId))}
                onUnSelect={(modelId) => dispatch(unSelectModel(modelId))}
                name={'Модель'}
                options={catalogueSettings.models}
                renderOption={renderOption}
                className={s.dropdown}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.materials}
                onSelect={(modelId) => dispatch(selectMaterial(modelId))}
                onUnSelect={(modelId) => dispatch(unSelectMaterial(modelId))}
                name={'Материалы'}
                options={catalogueSettings.materials}
                renderOption={renderOption}
                className={s.dropdown}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.colors}
                onSelect={(colorId) => dispatch(selectColor(colorId))}
                onUnSelect={(colorId) => dispatch(unSelectColor(colorId))}
                name={'Цвет'}
                options={catalogueSettings.colors}
                renderOption={renderColorOption}
                className={s.dropdown}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.sizes}
                onSelect={(sizeId) => dispatch(selectSize(sizeId))}
                onUnSelect={(sizeId) => dispatch(unSelectSize(sizeId))}
                name={'Размеры'}
                options={catalogueSettings.sizes}
                renderOption={renderSizeOption}
                className={s.dropdown}
            />
        </>
    );
};

export default DetailedSearch;
