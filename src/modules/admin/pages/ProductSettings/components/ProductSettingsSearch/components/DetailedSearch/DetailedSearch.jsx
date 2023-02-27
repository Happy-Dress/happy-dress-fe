import { useDispatch, useSelector } from 'react-redux';
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


const DetailedSearch = () =>{

    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const renderOption = (option) =>{
        return <span className={s.DetailedSearch_simpleOption}>{option.name}</span>;
    };

    const getColorBackgroundStyle = (color) => {
        if(color.secondColor) {
            return `linear-gradient( -45deg, ${color.firstColor}, ${color.firstColor} 49%, white 49%, white 51%, ${color.secondColor} 51% )`;
        }
        return color.firstColor;
    };

    const renderColorOption = (option) =>{
        return <div className={s.DetailedSearch_colorOption}>
            <div style={{ background: getColorBackgroundStyle(option) }}
                className={s.DetailedSearch_colorOption_colorCircle}/>
            <span>{option.name}</span>
        </div>;
    };

    const renderSizeOption = (option) =>{
        return <p className={s.DetailedSearch_simpleOption}>{option.sizeValue}</p>;
    };

    return (
        <>
            <FilterDropDown
                selectedOptionIds={selectedSettings.modelIds}
                onSelect={(modelId) => dispatch(selectModel(modelId))}
                onUnSelect={(modelId) => dispatch(unSelectModel(modelId))}
                name={'Модель'}
                options={catalogueSettings.models}
                renderOption={renderOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.materialIds}
                onSelect={(modelId) => dispatch(selectMaterial(modelId))}
                onUnSelect={(modelId) => dispatch(unSelectMaterial(modelId))}
                name={'Материалы'}
                options={catalogueSettings.materials}
                renderOption={renderOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.colorIds}
                onSelect={(colorId) => dispatch(selectColor(colorId))}
                onUnSelect={(colorId) => dispatch(unSelectColor(colorId))}
                name={'Цвет'}
                options={catalogueSettings.colors}
                renderOption={renderColorOption}
            />
            <FilterDropDown
                selectedOptionIds={selectedSettings.sizeIds}
                onSelect={(sizeId) => dispatch(selectSize(sizeId))}
                onUnSelect={(sizeId) => dispatch(unSelectSize(sizeId))}
                name={'Рзмеры'}
                options={catalogueSettings.sizes}
                renderOption={renderSizeOption}
            />
        </>
    );
};

export default DetailedSearch;
