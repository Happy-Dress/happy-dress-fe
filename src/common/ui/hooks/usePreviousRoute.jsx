import { useSelector } from 'react-redux';

export const usePreviousRoute = () => {

    return {
        previousRoute: useSelector(state => state.routeTracker.previousRoute),
    };

};