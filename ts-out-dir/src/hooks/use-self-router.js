import router from '@/router';
export const getQueryParam = () => {
    const route = router.currentRoute;
    if (route.value?.query.params) {
        return JSON.parse(route.value.query);
    }
};
export const routerPush = (name, params) => {
    let data = {};
    if (params) {
        data = params;
    }
    else {
        data = {};
    }
    router.push({
        name,
        query: JSON.stringify(data)
    });
};
export const routerReplace = (name, params) => {
    let data = {};
    if (params) {
        data = {
            params: JSON.stringify(params)
        };
    }
    else {
        data = {};
    }
    router.replace({
        name,
        query: data
    });
};
export const routerBack = () => {
    router.go(-1);
};
