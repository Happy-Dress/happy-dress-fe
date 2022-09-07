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
