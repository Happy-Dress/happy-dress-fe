export const formatFiltersName = (name) => {
    switch (name) {
    case 'models':
        return  'Модель';
    case 'materials':
        return 'Материал';
    case 'colors':
        return  'Цвет';
    case 'categories':
        return  'Категории';
    }
};