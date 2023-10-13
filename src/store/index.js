import { createStore } from "vuex";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});
api.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
export default createStore({
  state: {
    user: null,
    token: null,
    roles: [],
    signErr: null,
    loginError: null,
    polls: [],
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
    setUser(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
      state.token = JSON.parse(localStorage.getItem('token'))
    },
    setPoll(state, polls) {
      state.polls = polls;
    }
  },
  actions: {
    async fetchRoles({ commit }) {
      try {
        const response = await api.get("role/list");
        commit("setRoles", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    async signup({ state }, { email, firstName, lastName, roleId, password }) {
      try {
        state.signErr = null
        await api.post("user/register", {
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

    async getPolls({ commit }) {
      try {
        const response = await api.get("poll/list/1?limit=4",);
        console.log(response)
        commit('setPoll', response.data.rows);

      } catch (error) {
        console.error("Error in getPolls action:", error);
      }
    },
    async addPoll({ title, options }) {
      try {
        await api.post("poll/add", {
          title: title,
          options: options
        });

      } catch (error) {
        console.error("Error in addPoll action:", error);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        commit('clearLoginError');
        const response = await api.post("user/login", {
          email: email,
          password: password,
        });
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        commit('setUser')
      } catch (error) {
        console.log(error);
        commit('setLoginError', error.response.data.message);
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
    getPoll: (state) => state.polls,
  },
  modules: {},
});
