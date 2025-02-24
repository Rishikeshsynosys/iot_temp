import { getStorage } from "./LocalStorage";

export const getLaravelReqHeaders = () => {
    const token = getStorage("__token__");

    const headers = {
        Xtoken: token,
        "X-XSRF-TOKEN": token,
        "X-CSRF-TOKEN": token,
        "Access-Control-Allow-Origin": "*",
        withCredentials: true,
    };

    return headers
}

export const LaravelRequestHandler = async (apiFunc, data = {}) => {
    try {

        const headers = getLaravelReqHeaders();
        let requestData = data;

        const response = await apiFunc({ payload: requestData, headers}).unwrap();
        if (!response.responseCode) return response;

        if (response.responseCode === 401) {
            if (window.location.pathname !== "/login")
                window.location.href = "/login";

            throw new Error("Unauthorized");
        }

        if (response.responseCode !== 200)
            throw new Error(response.response || "Unexpected error");

        return response;
    } catch (error) {
        throw error;
    }
}


const getNodeRequestHeaders = () => {
    const makeId = (length) => {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const activeUser = getStorage("__user__", "object");
    var token = activeUser
        ? makeId(100) + "__" + activeUser.organisation.id + "__" + activeUser.id
        : "UnAuthorized";
        
    return { "X-master-auth": token, "client-type": "locatorWeb" };
}

export const NodeRequestHandler = async (apiFunc, data = {}) => {
    try {
        const headers = getNodeRequestHeaders();
        const response = await apiFunc({ payload: data, headers }).unwrap();

        if (!response.code) return response;

        if (response.code === 401) {
            if (window.location.pathname !== "/login")
                window.location.href = "/login";

            throw new Error("Unauthorized");
        }

        if (response.code !== 200)
            throw new Error(response?.data || "Unexpected error");

        return response?.data;
    } catch (error) {
        throw error;
    }
}