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
    if (store.state.token) {
        next({ name: 'dashboard' });
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
       next({ name: 'dashboard' });
       this.$store.dispatch('login', data);
       return;
   }
}

 export const isLogged = (to, from, next) => {
     if (store.state.token) {
         next({ name: 'dashboard' });
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
        next({ name: 'dashboard' });
        this.$store.dispatch('login', data);
        return;
    }
 }

 export const protectLoggedRoutes = (to, from, next) => {
     if (store.state.idToken) {
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
     } else {
        //Verificar se a store tem dados, se não, atualizar a pagina
        if (store.state.token) {
            next();
            return;
        }
        else{
            console.log("OOOO");
            
        }
        
         next();
     }

 }