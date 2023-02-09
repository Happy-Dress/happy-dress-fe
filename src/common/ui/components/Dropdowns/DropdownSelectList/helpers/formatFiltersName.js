const DICTIONARY = {
    models: 'Модель',
    materials: 'Материал',
    colors: 'Цвет',
    categories: 'Категории'
};

export const formatFiltersName = (name) => {
    return DICTIONARY[name] ?? '';
};