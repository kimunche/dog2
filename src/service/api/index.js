import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const dog = {
  list: () => fetch("ddd"),
  deleteDog: (picSeq) => axios.delete(`/api/dog/${picSeq}`),
  // deleteDog: (picSeq) => fetch(`/api/doc/${picSeq}`),
  addBookmark: (picSeq) => axios.post(`/api/dog/${picSeq}/bookmark`),
  unBookmark: (picSeq) => axios.delete(`/api/dog/${picSeq}/bookmark`),
  loadBookmark: () => axios.get("/api/dog/bookmarks"),
};

export default {
  dog,
};
