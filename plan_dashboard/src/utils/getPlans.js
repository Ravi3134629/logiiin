import axios from "axios";

const getPlans = async () => {
  try {
    const r = await axios.get("http://localhost:5000/api/plan/all");
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getPlans;
