import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

export const userIsAuth = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.users.isLogged === true,
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const userIsNotAuth = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.users.isLogged === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
});