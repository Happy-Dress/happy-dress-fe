export const COLOR_ADD_ACTIONS = {
    ADD_NAME: 'ADD_NAME',
    UPDATE_COLOR: 'UPDATE_COLOR'
};

export const colorReducer = (state, action) => {
    switch (action.type) {
        case COLOR_ADD_ACTIONS.ADD_NAME:
            return {
                ...state,
                name: action.payload
            };
        case COLOR_ADD_ACTIONS.UPDATE_COLOR:
            return {
                ...state,
                [action.payload.type]: action.payload.value
            };
    }
};
