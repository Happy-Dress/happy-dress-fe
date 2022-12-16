import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToasterContext } from '../ToasterContext';
import Toaster from '../../../components/Toaster';

const ToasterProvider = (props) => {

    const [toaster, setToaster] = useState(null);
    
    const showToasterError = (message) => {
        showToaster('Error', message);
    };
    
    const showToasterNotification = (message) => {
        showToaster('Notification', message);
    };

    const showToasterSuccess = (message) => {
        showToaster('Success', message);
    };

    const showToaster = (type, message) => {
        setToaster(<Toaster classification={type} text={message}/>);
        setTimeout(() =>{
            setToaster(null);
        }, 5000);
    };

    const closeToster = () => {
        setToaster(null);
    };

    return (
        <ToasterContext.Provider value={{ showToasterError, showToasterNotification, showToasterSuccess, closeToster }}>
            {props.children}
            {toaster && toaster}
        </ToasterContext.Provider>
    );

};

ToasterProvider.propTypes = {
    children: PropTypes.element
};

export default ToasterProvider;