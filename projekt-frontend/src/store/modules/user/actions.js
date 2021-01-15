import axios from "axios";
import router from "../../../router/index";

export default {
  async login({ commit }, user) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      const { data } = await axios.post(`${url}/login`, user);

      commit("setUserInfo", data);

      commit("setError", null);
      localStorage.setItem("userInfo", JSON.stringify(data));

      router.push("/profile");
    } catch (error) {
      commit("setError", "Invalid email or password");
      throw new Error(error);
    }
  },

  async register({ commit }, user) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";
      const { data } = await axios.post(`${url}/register`, user);

      commit("setUserInfo", data);

      commit("setError", null);
      localStorage.setItem("userInfo", JSON.stringify(data));

      router.push("/profile");
    } catch (error) {
      commit("setError", "Invalid email or password");
      throw new Error(error);
    }
  },

  logout({ commit }) {
    localStorage.removeItem("userInfo");
    commit("setUserInfo", null);
    router.push("/");
  },

  async updateUserInfo({ commit }) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${url}/auto_login`, config);
      commit("setUserInfo", data);
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateUser({ commit }, payload) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      // const { token } = JSON.parse(localStorage.userInfo);
      const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      const token = userInfoFromStorage?.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${url}/user/${payload.id}`,
        payload,
        config
      );

      commit("setUserInfo", data);
      router.push("/profile");
    } catch (error) {
      throw new Error(error)
    }
  },

  updateUserName({ commit }, name) {
    commit("updateUserName", name);
  },

  updateUserEmail({ commit }, email) {
    commit("updateUserEmail", email);
  },

  async setUsers({ commit }) {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? "https://projektapp575.herokuapp.com/api"
          : "http://localhost:3000/api";

      const { data } = await axios.get(`${url}/users`);
      commit("setUsers", data);
    } catch (error) {
      throw new Error(error);
    }
  },

  setUserTeams({ dispatch }) {
    dispatch("updateUserInfo");
  },

  setUserProjects({ dispatch }) {
    dispatch("updateUserInfo");
  },
};
