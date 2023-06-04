export const PRODUCT_CARD_DICTIONARY = {
    TITLE: 'Карта товара',
    BREADCRUMBS: [
        { id: 0, link: '/domain/home', linkTitle: 'Главная' },
        { id: 1, link: '../products-settings', linkTitle: 'Управление товаром' },
    ],
    NEW_PRODUCT: 'Новый товар',
    SELECT_MORE_ONE: 'Выбрано более 1',
    OK: 'Сохранить',
    CANCEL: 'Отмена',
    FIELDS: {
        NAME: {
            ID: 'dressName',
            PLACEHOLDER: 'Введите название',
            NAME: 'dressName',
            LABEL: 'Название',
            ERROR_MESSAGE: 'Введите название',
        },
        CATEGORY: {
            PLACEHOLDER: 'Категория',
            NAME: 'category',
            LABEL: 'Категория',
            ERROR_MESSAGE: 'Выберите категорию',
        },
        MODEL: {
            PLACEHOLDER: 'Модели',
            NAME: 'model',
            LABEL: 'Тип модели',
            ERROR_MESSAGE: 'Выберите тип модели',
        },
        MATERIAL: {
            PLACEHOLDER: 'Материал',
            NAME: 'materials',
            LABEL: 'Материал',
            ERROR_MESSAGE: 'Выберите материал',
        },
        DESCRIPTION: {
            PLACEHOLDER: 'Введите текст',
            NAME: 'description',
            LABEL: 'Описание',
            ERROR_MESSAGE: 'Введите описание',
        },
        MAIN_IMAGE_URL: {
            PLACEHOLDER: '',
            NAME: 'mainImageUrl',
            LABEL: '',
            ERROR_MESSAGE: 'Выберите фото',
        },
        MAIN_IMAGE_FILE: {
            NAME: 'mainImageFile',
        },
    },
    ERROR: 'Невозможно найти товар с id:',
    UNKNOWN_ERROR: 'Ошибка',
    NOT_CHOSEN: 'Не выбрано',
    SUCCESS_MESSAGE: 'Фото успешно добавлено',
    PRODUCT_SAVED: 'Продукт успешно сохранен',
};
