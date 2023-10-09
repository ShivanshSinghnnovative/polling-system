import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    roles: [],
    signupError: null,
    signErr: null,
    loginError: null,
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
    },

  },
  actions: {
    async fetchRoles({ commit }) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}role/list`
        );
        commit("setRoles", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },


    async signup({ state }, { email, firstName, lastName, roleId, password }) {
      try {

        state.signErr = null
        state.signupError = null
        await axios.post('https://pollapi.innotechteam.in/user/register', {
          email: email,
          firstName: firstName,
          lastName: lastName,
          roleId: roleId,
          password: password
        });
      } catch (error) {
        if (error.response.data.errors) {
          state.signupError = error.response.data.errors
        }
        else {
          state.signErr = error.response.data
          state.signupError = null
        }
      }
    },

    async login({ state }, { email, password }) {
      try {
        state.loginError = null
        await axios.post('https://pollapi.innotechteam.in/user/login', {
          email: email,
          password: password,
        });
      }
      catch (error) {
        console.log(error);
        console.log("ldsnfksd", state)
        state.loginError = error.response.data.message
      }
    }


  },
  getters: {
    getRoles: (state) => state.roles,
  },
  modules: {},
});
