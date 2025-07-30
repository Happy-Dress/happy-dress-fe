import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPreviousRoute } from '../store/slices/routeTrackerSlice';

const withRouteTracker = (Component) => (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const previousRoute = useSelector(state => state.routeTracker.previousRoute);

    useEffect(() => {
        if (previousRoute !== location.pathname) {
            dispatch(setPreviousRoute(location.pathname));
        }
    }, []);
    
    return <Component {...props}/>;
};

export default withRouteTracker;