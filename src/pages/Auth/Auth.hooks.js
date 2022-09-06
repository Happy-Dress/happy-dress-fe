export const isLatinAndNumber = (text) => {
    return [...text].every((char) => /[a-z0-9]/i.test(char));
};

export const isPasswordValid = (text) => {
    return [...text].every((char) => /[a-z0-9?!&/.,”']/i.test(char));

};

export const validation = (login, password) => {
    const errors = {
        login: '',
        password: '',
    };
    if (!isLatinAndNumber(login)) errors.login = 'Имя должно содержать латинские буквы и цифры';
    if (login.length > 35) errors.login = 'Имя не может превышать 35 символов';
    if (!isPasswordValid(password)) errors.password = 'Пароль должен содержать латинские буквы, цифры и символы ? ! & / . , ” \'';
    if (password.length > 15) errors.password = 'Пароль не может превышать 15 символов';

    return errors;
};

export const hasError = (errors) => Object.values(errors).some((err) => err !== '');

export const fetchDummyUser = (login, password) => {
    return new Promise((res, rej) => {
        if ((login === 'ddd' && password === 'ddd') || (login ==='test' && password ==='test')) {
            setTimeout(() => {
                res('user');
            }, 500);
        } else {
            setTimeout(() => {
                rej('error');
            }, 500);
        }
    });
};
