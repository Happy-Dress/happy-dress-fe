const AUTHORIZATION_FORM_DICTIONARY = {
    ENTRY_LABEL: 'ВХОД',
    HELP_YOUR_NAME_LABEL: 'Ваше Имя',
    HELP_PASSWORD_LABEL: 'Пароль',
    BUTTON_ENTER_LABEL: 'Войти',
    MIN_CREDS_LENGTH: 4,
    MAX_LOGIN_LENGTH: 35,
    MAX_PASSWORD_LENGTH: 15,
    TOO_SHORT_LOGIN_MESSAGE: 'Слишком короткое имя',
    TOO_LONG_LOGIN_MESSAGE: 'Слишком длинное имя',
    WRONG_LOGIN: 'Неверное имя',
    TOO_SHORT_PASSWORD_MESSAGE: 'Слишком короткий пароль',
    TOO_LONG_PASSWORD_MESSAGE: 'Слишком длинный пароль',
    WRONG_PASSWORD: 'Неверный пароль',
    POST_PATH: 'http://localhost:8080/api/v1/auth/login',
};

export { AUTHORIZATION_FORM_DICTIONARY };