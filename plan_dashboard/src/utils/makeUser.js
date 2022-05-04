import axios from "axios";

const createUser = async (data) => {
  try {
    const r = await axios.post("http://localhost:5000/api/auth/signup", data);
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default createUser;
