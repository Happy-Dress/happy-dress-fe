import * as yup from 'yup';
import { LOGIN_ERROR_MESSAGES as LOG_ERRORS} from './Auth.dictionary';
import { PASSWORD_ERROR_MESSAGES as PASS_ERRORS} from './Auth.dictionary';

export const schema = yup.object({
    login: yup.string()
        .required(LOG_ERRORS.REQUIRED)
        .min(4, LOG_ERRORS.MIN_LENGTH)
        .max(35, LOG_ERRORS.MAX_LENGTH)
        .matches(/^[a-z0-9]+$/i, LOG_ERRORS.NOT_REQUIRED_SYMBOLS),
    password: yup.string()
        .required(PASS_ERRORS.REQUIRED)
        .min(4, PASS_ERRORS.MIN_LENGTH)
        .max(15, PASS_ERRORS.MAX_LENGTH)
        .matches(/^[a-z0-9?!&/.,”']+$/i, PASS_ERRORS.NOT_REQUIRED_SYMBOLS),
}).required();
