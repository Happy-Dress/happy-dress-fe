import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToasters } from '../../ui/contexts/ToastersContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const PrivateRoutes = (props) => {

    const { showToasterError } = useToasters();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem('Authorization'));

    const saveTokens = (response) => {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem('Authorization', `Bearer ${newAccessToken}`);
        localStorage.setItem('refreshToken', newRefreshToken);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('secure/auth/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            });
            saveTokens(response);
        };

        const localStorageToken = localStorage.getItem('Authorization');
        const token = localStorageToken ? jwtDecode(localStorageToken) : '';
        const millisecondsInterval = (token.exp - token.iat) * 1000 - 60000;
        const interval = setInterval(fetchData, millisecondsInterval);

        return () => {
            clearInterval(interval);
            axios.interceptors.response.eject(interceptorResponse);
        };
    }, []);

    const refreshTokenAndRetry = async (error) => {
        try {
            const originalRequest = error.config;
            originalRequest._retry = true;
            const response = await axios.post('secure/auth/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            }, { _retry: true });
            saveTokens(response);
            return axios(originalRequest);
        } catch (refreshError) {
            setIsUserAuthenticated(false);
            localStorage.removeItem('Authorization');
            localStorage.removeItem('refreshToken');
            return Promise.reject(refreshError);
        }
    };

    const interceptorResponse = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401 && error.config.headers?.Authorization && !error.config._retry) {
                return await refreshTokenAndRetry(error);
            }
            return Promise.reject(Array.isArray(error.response?.data?.message) ?
                error.response.data.message[0]
                : (error.response.data.message || error?.response?.data?.error|| error.message));
        }
    );

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