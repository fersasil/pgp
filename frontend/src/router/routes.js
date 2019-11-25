import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import PresentationLayout from "@/layout/dashboard/PresentationLayout.vue";

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";

import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

//Presentation page
import Welcome from "../pages/Welcome.vue";

//Auth pages
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";
// import SignUp from "@/pages/SignUp.vue";

//user pages
import UserProfile from "@/pages/UserProfile.vue";

//qrcode
import Qrcode from "@/pages/Qrcode.vue";

//Event Pages
import SelectedEvent from "@/pages/Event/SelectedEvent.vue";

//Middleware
import * as guards from "@/middleware/auth";


const routes = [{
        path: "/",
        component: PresentationLayout,
        beforeEnter: guards.isLogged,
        children: [{
                path: "/",
                name: "welcome",
                component: Welcome
            },
            {
                path: "/signup",
                name: "signup",
                component: SignUp
            },
            {
                path: "/signin",
                name: "signin",
                component: SignIn
            }
        ]
    },
    {
        path: "/u",
        beforeEnter: guards.protectLoggedRoutes,
        component: DashboardLayout,
        // redirect: "/dashboard",
        children: [{
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
                // redirect: "/u/perfil"
            },
            {
                path: "perfil",
                name: "user",
                component: UserProfile
            },
            {
                path: "qrcode",
                name: "qrcode",
                component: Qrcode
            },
            {
                path: "notifications",
                name: "notifications",
                component: Notifications
            },
            {
                path: "icons",
                name: "icons",
                component: Icons
            },
            {
                path: "maps",
                name: "maps",
                component: Maps
            },
            {
                path: "typography",
                name: "typography",
                component: Typography
            },
            {
                path: "table-list",
                name: "table-list",
                component: TableList
            },
            {
                path: "evento/:idEvent",
                name: "SelectedEvent",
                component: SelectedEvent
            }
        ]
    },
    { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;