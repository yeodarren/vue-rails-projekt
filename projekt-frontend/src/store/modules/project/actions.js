import axios from "axios";
import router from "../../../router";

export default {
  async createProject({ dispatch }, payload) {
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

      await axios.post(`${url}/projects`, payload, config);
      dispatch("user/setUserProjects", {}, { root: true });

      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  },

  async setProjectDetails({ commit }, id) {
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

      const { data } = await axios.get(
        `${url}/projects/${id}`,
        config
      );
      commit("setProjectDetails", data);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateTitle({ commit }, title) {
    commit("updateTitle", title);
  },
  updateDescription({ commit }, description) {
    commit("updateDescription", description);
  },
  async updateProject({ dispatch }, payload) {
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

      await axios.put(
        `${url}/projects/${payload.id}`,
        payload,
        config
      );
      dispatch("user/setUserProjects", {}, { root: true });
      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  },
  async deleteProject({ dispatch }, id){
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

      await axios.delete(
        `${url}/projects/${id}`,
        config
      );
      dispatch("user/setUserProjects", {}, { root: true });
      router.push("/profile");
    } catch (error) {
      throw new Error(error);
    }
  }
};
