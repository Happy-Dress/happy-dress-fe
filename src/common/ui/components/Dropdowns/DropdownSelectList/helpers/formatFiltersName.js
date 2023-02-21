const DICTIONARY = {
    models: 'Модель',
    materials: 'Материал',
    colors: 'Цвет',
    categories: 'Категории',
    sizes: 'Размер'
};

export const formatFiltersName = (name) => {
    return DICTIONARY[name] ?? '';
};
