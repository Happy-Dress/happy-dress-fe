import PropTypes from 'prop-types';

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
        PRODUCT_COLOR_IMAGES: {
            NAME: 'productColorImages',
        }
    },
    ERROR: 'Невозможно найти товар с id:',
    UNKNOWN_ERROR: 'Ошибка',
    NOT_CHOSEN: 'Не выбрано',
    SUCCESS_MESSAGE: 'Фото успешно добавлено',
    PRODUCT_SAVED: 'Продукт успешно сохранен',
    SIZE_TEXT: 'Размер',
    COLOR_TEXT: 'Цвет',
    GALLERY_TEXT: 'Фотогалерея',
    EMPTY_GALLERY_TEXT: 'Изображения отсутствуют',
    EMPTY_COLOR_OBJECT: {
        id: -1000,
        name: 'Не выбрано',
        firstColor: '',
        orderNumber: -1000
    },
    EMPTY_SIZE_OBJECT: {
        id: -1000,
        sizeValue: -1000,
    },
    EMPTY_IMAGE_URL_OBJECT: {
        imageUrl: '',
    },
    COLOR_PROPTYPES: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        firstColor: PropTypes.string.isRequired,
        secondColor: PropTypes.string,
        orderNumber: PropTypes.number.isRequired,
    }),
    SIZE_PROPTYPES: PropTypes.shape({
        id: PropTypes.number.isRequired,
        sizeValue: PropTypes.number.isRequired,
    }),
};
