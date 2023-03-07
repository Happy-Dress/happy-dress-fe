import { useDispatch, useSelector } from 'react-redux';

export const useDetailedSearch = (colorOptionClass, colorCircleClass, simpleOptionClass) => {
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.catalogueSettings.settings);
    const selectedSettings = useSelector(state => state.productsSearch.filters);

    const renderOption = (option) => {
        return <span className={simpleOptionClass}>{option.name}</span>;
    };

    const getColorBackgroundStyle = (color) => {
        if (color.secondColor) {
            return `linear-gradient( -45deg, ${color.firstColor}, ${color.firstColor} 49%, white 49%, white 51%, ${color.secondColor} 51% )`;
        }
        return color.firstColor;
    };

    const renderColorOption = (option) => {
        return <div className={colorOptionClass}>
            <div
                style={{ background: getColorBackgroundStyle(option) }}
                className={colorCircleClass}/>
            <span>{option.name}</span>
        </div>;
    };

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
