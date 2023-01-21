import PropTypes from 'prop-types';
import { ToastersContext } from '../ToastersContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../styles/Toaster.module.scss';


const ToastersProvider = (props) => {

    const style = {
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: s.toaster_body,
    };

    const SuccessStyle = {
        className: s.toast_success,
        ...style,
    };

    const NotificationStyle = {
        className: s.toaster_notification,
        ...style,
    };

    const ErrorStyle = {
        className: s.toast_error,
        ...style,
    };

    const showToasterError = (message) => {
        toast(message, ErrorStyle);
    };

    const showToasterNotification = (message) => {
        toast(message, NotificationStyle);
    };

    const showToasterSuccess = (message) => {
        toast(message, SuccessStyle);
    };


    return (
        <ToastersContext.Provider value={{ showToasterError, showToasterNotification, showToasterSuccess }}>
            {props.children}
            <ToastContainer
                className={s.toaster_container}
                limit={6}
                autoClose={5000}/>
        </ToastersContext.Provider>
    );

};

ToastersProvider.propTypes = {
    children: PropTypes.element
};

export default ToastersProvider;