export const CATALOG_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ALL_FILTERS: 'SET_ALL_FILTERS',
    REPLACE_CATEGORY: 'REPLACE_CATEGORY',
    SET_BASE_FILTER: 'SET_BASE_FILTER',
    UPDATE_CURRENT_FILTER: 'UPDATE_CURRENT_FILTER',
    REMOVE_CURRENT_FILTER: 'REMOVE_CURRENT_FILTER'
};

export const catalogReducer = (state, action) => {
    switch (action.type) {
        case CATALOG_ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case CATALOG_ACTIONS.SET_ALL_FILTERS:
            return {
                ...state,
                loading: false,
                filters: action.payload
            };
        case CATALOG_ACTIONS.REPLACE_CATEGORY:
            return {
                ...state,
                currentFilters: {
                    ...state.currentFilters,
                    categories: [action.payload]
                }
            };
        case CATALOG_ACTIONS.SET_BASE_FILTER:
            return {
                ...state,
                currentFilters: action.payload
            };
        case CATALOG_ACTIONS.UPDATE_CURRENT_FILTER:
            return  {
                ...state,
                currentFilters: {
                    ...state.currentFilters,
                    [action.payload.category]: action.payload.value
                }
            };
        case CATALOG_ACTIONS.REMOVE_CURRENT_FILTER:
            return {
                ...state,
                currentFilters: {
                    ...action.payload
                }
            };
        default:
            return state;
    }
};
