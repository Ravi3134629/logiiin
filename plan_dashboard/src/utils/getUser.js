import axios from "axios";

const getUser = async (token) => {
  try {
    const r = await axios.get("http://localhost:5000/api/auth/user", {
      headers: {
        Authorization: token,
      },
    });
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getUser;
