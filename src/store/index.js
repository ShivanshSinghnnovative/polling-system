import { createStore } from "vuex";
import api from "../composables/deatailsApi.js"
export default createStore({
  state: {
    user: null,
    token: null,
    roles: [],
    signErr: null,
    loginError: null,
    polls: [],
    singlePoll: null
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
    },
    setSinglePoll(state, poll) {
      state.singlePoll = poll
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    setUserDetails(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
      state.token = JSON.parse(localStorage.getItem('token'))
    },
    setPoll(state, poll) {
      if (state.polls.length) {
        let list = state.polls.concat(poll)
        state.polls = list
      } else {
        state.polls = poll;
      }
    },
    clearPolls(state) {
      state.polls = []
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
    async removePoll({ state }, { id }) {
      try {
        await api.delete(`poll/${id}`);
      } catch (error) {
        console.log(error);
        console.log(state);
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
    async getPolls({ commit }, { pageNo, limit }) {
      try {
        const response = await api.get(`poll/list/${pageNo}?limit=${limit}`,);
        commit('setPoll', response.data.rows);
      } catch (error) {
        console.error("Error in getPolls action:", error);
      }
    },
    async getPollById({ commit }, { id }) {
      try {
        const res = await api.get(`poll/${id}`);
        commit('setSinglePoll', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updatePollTitle({ state }, { title, createdBy, pollId }) {
      try {
        await api.put(`poll/${pollId}`, {
          title: title,
          createrBy: createdBy
        })
      } catch (error) {
        console.log(error, state.pollLimit)
      }
    },
    async addPoll({ commit, state }, { title, options }) {
      try {
        await api.post("poll/add", {
          title: title,
          options: options
        });
        commit('setupdateTitle', title);
      } catch (error) {
        console.error("Error in addPoll action:", error);
        console.log(state)
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
        commit('setUserDetails')
      } catch (error) {
        console.log(error);
        commit('setLoginError', error.response.data.message);
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
    getAllPolls: (state) => state.polls,
    getSinglePoll: (state) => state.singlePoll
  },
  modules: {},
});
