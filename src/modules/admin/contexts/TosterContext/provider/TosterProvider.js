import { useState } from 'react';
import PropTypes from 'prop-types';
import { TosterContext } from '../TosterContext';
import Toster from '../../../components/Toster';

const TosterProvider = (props) => {

    const [toster, setToster] = useState(null);

    const showToster = (type, message) => {
        setToster(<Toster classification={type} text={message}/>);
        setTimeout(() =>{
            setToster(null);
        }, 5000);
    };

    const closeToster = () => {
        setToster(null);
    };

    return (
        <TosterContext.Provider value={{ showToster, closeToster }}>
            {props.children}
            {toster && toster}
        </TosterContext.Provider>
    );

};

TosterProvider.propTypes = {
    children: PropTypes.element
};

export default TosterProvider;