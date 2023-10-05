import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    roles: [],
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
    },
    setUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
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
        state.signErr = null;
        state.signupError = null;
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/register`, {
          email: email,
          firstName: firstName,
          lastName: lastName,
          roleId: roleId,
          password: password,
        });
      } catch (error) {
        if (error.response.data.errors) {
          state.signupError = error.response.data.errors;
        } else {
          state.signErr = error.response.data;
          state.signupError = null;
        }
      }
    },

    async login({ state, commit }, { email, password }) {
      state.loginError = null
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}user/login`,
          { email: email, password: password }).then(res => {
            localStorage.setItem('userToken', JSON.stringify(res.data.token))
            localStorage.setItem('user', JSON.stringify(res.data.user))
            state.loginError = null
          })
        commit('setUser')
      } catch (error) {
        state.loginError = error.response.data.message
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
  },
  modules: {},
});
