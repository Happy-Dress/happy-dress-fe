import s from './DetailedSearch.module.scss';
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
import DETAILED_SEARCH_DICTIONARY from './DetailedSearch.dictionary';


const DetailedSearch = () =>{

    const {
        MODEL,
        MATERIALS,
        COLOR,
        SIZES,
    } = DETAILED_SEARCH_DICTIONARY;

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
                name={MODEL}
                options={catalogueSettings.models}
                renderOption={renderOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.materials}
                onSelect={(modelId) => dispatch(selectMaterial(modelId))}
                onUnSelect={(modelId) => dispatch(unSelectMaterial(modelId))}
                name={MATERIALS}
                options={catalogueSettings.materials}
                renderOption={renderOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.colors}
                onSelect={(colorId) => dispatch(selectColor(colorId))}
                onUnSelect={(colorId) => dispatch(unSelectColor(colorId))}
                name={COLOR}
                options={catalogueSettings.colors}
                renderOption={renderColorOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.sizes}
                onSelect={(sizeId) => dispatch(selectSize(sizeId))}
                onUnSelect={(sizeId) => dispatch(unSelectSize(sizeId))}
                name={SIZES}
                options={catalogueSettings.sizes}
                renderOption={renderSizeOption}
            />
        </>
    );
};

export default DetailedSearch;
