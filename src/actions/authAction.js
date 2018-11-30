import { Action} from "../helpers/constants";

export const login = (authObj) => ({ 
    type: Action.LOGIN, authObj 
});

export const logout = () => ({
    type: Action.LOGOUT
});
