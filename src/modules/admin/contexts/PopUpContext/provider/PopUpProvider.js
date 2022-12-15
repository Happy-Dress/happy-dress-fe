import { useState } from 'react';
import PropTypes from 'prop-types';
import { PopUpContext } from '../PopUpContext';
import PopUp from '../../../components/PopUp';

const PopUpProvider = (props) => {

    const [popUp, setPopUp] = useState(null);

    const showPopUp = (type, message) => {
        setPopUp(<PopUp classification={type} text={message}/>);
        // setTimeout(() =>{
        //     setPopUp(null);
        // }, 5000);
    };

    const closePopUp = () => {
        setPopUp(null);
    };

    return (
        <PopUpContext.Provider value={{ showPopUp, closePopUp }}>
            {props.children}
            {popUp && popUp}
        </PopUpContext.Provider>
    );

};

PopUpProvider.propTypes = {
    children: PropTypes.element
};

export default PopUpProvider;