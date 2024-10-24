import AllPatients from "views/AllPatients";
import Index from "views/Index.js";
import NewPatient from "views/NewPatient";
import Settings from "views/Settings";
import Tests from "views/Tests";
import Login from "views/auth/Login";
import Register from "views/auth/Register";

var routes = [
  // **************Admin Pages************
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/new-patient",
    name: "New Patient",
    icon: "ni ni-single-02 text-orange",
    component: NewPatient,
    layout: "/admin",
  },
  {
    path: "/all-patients",
    name: "All Patients",
    icon: "ni ni-bullet-list-67 text-blue",
    component: AllPatients,
    layout: "/admin",
  },
  {
    path: "/tests",
    name: "Tests",
    icon: "ni ni-atom text-green",
    component: Tests,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-red",
    component: Settings,
    layout: "/admin",
  },
  // **************Auth Pages************
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    isMenu: false,
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  //   isMenu: false,
  // },
];
export default routes;
