import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import CreateProfile from "../components/common/CreateProfile";
import EditProfile from "../components/common/EditProfile";
import AddExperience from "../components/common/AddExperience";
import Education from "../components/common/Education";
import Profiles from "../components/common/Profiles";
import Profile from "../components/common/Profile";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Landing",
        component: Landing
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/create-profile",
        name: "CreateProfile",
        component: CreateProfile
      },
      {
        path: "/edit-profile",
        name: "EditProfile",
        component: EditProfile
      },
      {
        path: "/add-experience",
        name: "AddExperience",
        component: AddExperience
      },
      {
        path: "/add-education",
        name: "Education",
        component: Education
      },
      {
        path: "/profiles",
        name: "Profiles",
        component: Profiles
      },
      {
        path: "/profile/:handle",
        name: "Profile",
        component: Profile
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
