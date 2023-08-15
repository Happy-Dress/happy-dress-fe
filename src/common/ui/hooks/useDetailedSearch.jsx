import { useDispatch, useSelector } from 'react-redux';
import ColorCircle from '../components/ColorCircle';

export const useDetailedSearch = (colorOptionClass, colorCircleClass, simpleOptionClass) => {
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const renderOption = (option) => {
        return <span className={simpleOptionClass}>{option.name}</span>;
    };


    const renderColorOption = (option) => {
        return (
            <ColorCircle
                firstColor={option.firstColor}
                secondColor={option?.secondColor}
                label={option.name}
                colorItemClass={colorOptionClass}
                colorCircleClass={colorCircleClass}
            />
        );};

    const renderSizeOption = (option) => {
        return <p className={simpleOptionClass}>{option.sizeValue}</p>;
    };

    return {
        dispatch,
        catalogueSettings,
        selectedSettings,
        renderOption,
        renderSizeOption,
        renderColorOption
    };
};
