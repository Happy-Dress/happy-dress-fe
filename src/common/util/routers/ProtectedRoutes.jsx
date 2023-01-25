import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasters } from '../../ui/contexts/ToastersContext';

const PrivateRoutes = (props) => {

    const { showToasterError } = useToasters();
    const isAuth = !!localStorage?.Authorization;

    if (!isAuth && props?.errorMessage){
        showToasterError(props.errorMessage);
    }

    return(
        isAuth ? <Outlet/> : <Navigate to="/admin/sign-in"/>
    );
};

PrivateRoutes.propTypes = {
    errorMessage: PropTypes.string,
};

export default PrivateRoutes;