import VueRouter from "vue-router";
import PhoneBook from "./pages/PhoneBook.vue";
import Contact from "./pages/Contact.vue";

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: PhoneBook
    },
    {
      path: "/contact/:id",
      component: Contact
    },
  {
    path:'/*',
    component: PhoneBook
  }
  ],
  mode: "hash"
});
