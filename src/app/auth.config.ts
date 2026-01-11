import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/wea5',
    loginUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/auth',
    logoutUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/logout',
    tokenEndpoint: 'http://localhost:8080/realms/wea5/protocol/openid-connect/token',
    sessionCheckIFrameUrl: 'http://localhost:8080/realms/wea5/protocol/openid-connect/login-status-iframe.html',
    userinfoEndpoint: 'http://localhost:8080/realms/wea5/protocol/openid-connect/userinfo',

    clientId: 'wea5-demo',
    redirectUri: window.location.origin,
    silentRefreshRedirectUri: window.location.origin,
    scope: 'profile email',
    silentRefreshTimeout: 5000,
    timeoutFactor: 0.25,
    sessionChecksEnabled: true,
    showDebugInformation: true,
    clearHashAfterLogin: false,
};
