import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.withCredentials = true;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

const dog = {
  list: () => fetch("ddd"),
  deleteDog: (picSeq) => axios.delete(`/api/dog/${picSeq}`),
  // deleteDog: (picSeq) => fetch(`/api/doc/${picSeq}`),
  addBookmark: (picSeq) => axios.post(`/api/dog/${picSeq}/bookmark`),
  unBookmark: (picSeq) => axios.delete(`/api/dog/${picSeq}/bookmark`),
  loadBookmark: () => axios.get("/api/dog/bookmarks"),
};

const user = {
  login: (form) => axios.post("/api/user/login", { ...form }),
  logout: () => axios.post("/logout"),
};

export default {
  dog,
  user,
};
