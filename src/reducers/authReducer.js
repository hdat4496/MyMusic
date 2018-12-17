import { Action } from "../helpers/constants";

const initialState = {
    username: '',
    token: '',
    fullname: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case Action.LOGIN:
            return action.authObj;
        case Action.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default auth;