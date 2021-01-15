import axios from "axios";
import router from "../../../router/index";

export default {
  async createTeam({ dispatch }, payload) {
    try {
      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      await axios.post(`${url}/teams`, payload, config);
      await dispatch("user/setUserTeams", {}, { root: true });
      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  },
  async setTeamDetails({ commit }, id) {
    try {
      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      const { data } = await axios.get(`${url}/teams/${id}`, config);
      commit('setTeamDetails', data)
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateTeam({ dispatch }, payload) {
    try {
      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      await axios.put(`${url}/teams/${payload.id}`, payload, config);
      await dispatch("user/setUserTeams", {}, { root: true });
      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteTeam({ dispatch }, id) {
    try {
      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      await axios.delete(`${url}/teams/${id}`, config);
      await dispatch("user/setUserTeams", {}, { root: true });
      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  },
};
