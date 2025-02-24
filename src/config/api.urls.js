const BETA_URL = "https://beta.mylocatorplus.com";
const ALPHA_URL = "https://alpha.mylocatorplus.com";

const __init__ = () => {
    if (window.location.origin.match("beta.mylocatorplus.com")) {
        return BETA_URL;
    }

    if (window.location.origin.match("alpha.mylocatorplus.com")) {
        return ALPHA_URL;
    }

    if (window.location.origin.match("localhost:")) {
        return ALPHA_URL;
    }

    return BETA_URL;
};

export const MAIN_DOMAIN_URL = __init__();

export const LOCAL_BACKEND = "http://localhost:6060";

const getAPIUrl = () =>
    window.location.href.match("localhost") !== null
        ? LOCAL_BACKEND
        : MAIN_DOMAIN_URL;

export const LARAVEL_BASE_URL = MAIN_DOMAIN_URL;
export const NODE_BASE_URL = getAPIUrl();
export const ASSESTS_URL = `${MAIN_DOMAIN_URL}/task-manager/assests`
export const WEB_SOCKETS_URL = `wss://alpha.mylocatorplus.com/gps/api/socket`;

export const LARAVEL_ENDPOINT = '/gateway/index.php/api-v1';
export const TASKMANAGER_ENDPOINT = '/task-manager/api/v1';
export const LOCATORMAIN_ENDPOINT = "/locator-main/api/v1";
export const TRACCAR_ENDPOINT = `/gps/api`;
export const REPORTS_ENDPOINT = `/locator-reports/api-v1/reports`;

