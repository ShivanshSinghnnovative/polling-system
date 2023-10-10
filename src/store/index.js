import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    user: null, 
    token: null, 
    roles: [],
    signErr: null,
    loginError: null,
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearLoginError(state) {
      state.loginError = null;
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
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/register`, {
          email: email,
          firstName: firstName,
          lastName: lastName,
          roleId: roleId,
          password: password
        });
      } catch (error) {
        state.signErr = error.response.data
        console.log(error)
      }
    },

    async login({ commit }, { email, password }) {
      try {
        commit('clearLoginError');
       const response =  await axios.post(`${process.env.VUE_APP_BASE_URL}user/login`, {
          email: email,
          password: password,
        });
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));

       
      } catch (error) {
        console.log(error);
        commit('setLoginError', error.response.data.message);
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
  },
  modules: {},
});
