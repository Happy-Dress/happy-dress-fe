import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasters } from '../../ui/contexts/ToastersContext';

const PrivateRoutes = (props) => {

    const { showToasterError } = useToasters();
    const isUserAuthenticated = !!localStorage?.Authorization;

    if (!isUserAuthenticated && props?.errorMessage){
        showToasterError(props.errorMessage);
    }

    return(
        isUserAuthenticated ? <Outlet/> : <Navigate to="/admin/sign-in"/>
    );
};

PrivateRoutes.propTypes = {
    errorMessage: PropTypes.string,
};

export default PrivateRoutes;