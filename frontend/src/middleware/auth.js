import store from "@/store/store";

const getDataStorage = _ => {
    const encodedData = localStorage.getItem('data');
    if (!encodedData) {
        return false;
    }

    const decodedData = atob(encodedData);
    const data = JSON.parse(decodedData);
    data.expiresIn = new Date(data.expiresIn);


    return data;
}

const isLogged2 = (to, from, next) => {
    if (store.state.user.token) {
        next();
        return;
    }

    const data = getDataStorage();

    if (!data) {
        next();
        return;
    }

    const now = new Date();

    if (now >= data.expiresIn) {
    next();
} else {
    //    this.$store.dispatch('login', data);
        store.state.user = data.data;
    next();
    return;
}
}

export const isLogged = (to, from, next) => {    
    if (store.state.user.token) {
        next({name: "dashboard", replace: true});
        return;
    }

    const data = getDataStorage();

    if (!data) {
        next();
        return;
    }

    const now = new Date();

    if (now >= data.expiresIn) {
        next();
    } else {
        next({ name: 'dashboard', replace: true });
        store.state.user = data.data;        
        return;
    }
}

export const protectLoggedRoutes = (to, from, next) => {
    if (store.state.user.idToken) {
        next();
        return;
    }

    const data = getDataStorage();

    if (!data) {
        next({ name: 'signin' });
        return;
    }

    const now = new Date();

    if (now >= data.expiresIn) {
        next({ name: 'signin' });
        return;
    } 
    
    isLogged2(to, from, next);
}