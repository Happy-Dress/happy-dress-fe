import { useState } from 'react';
import PropTypes from 'prop-types';
import { TosterContext } from '../TosterContext';
import Toster from '../../../components/Toster';

const TosterProvider = (props) => {

    const [popUp, setPopUp] = useState(null);

    const showPopUp = (type, message) => {
        setPopUp(<Toster classification={type} text={message}/>);
        // setTimeout(() =>{
        //     setPopUp(null);
        // }, 5000);
    };

    const closePopUp = () => {
        setPopUp(null);
    };

    return (
        <TosterContext.Provider value={{ showPopUp, closePopUp }}>
            {props.children}
            {popUp && popUp}
        </TosterContext.Provider>
    );

};

TosterProvider.propTypes = {
    children: PropTypes.element
};

export default TosterProvider;