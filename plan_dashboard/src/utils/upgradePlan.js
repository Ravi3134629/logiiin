import axios from "axios";

const upgradePlan = async (priority, current_priority) => {
  try {
    const r = await axios.put(
      `http://localhost:5000/api/auth/upgrade/plan/${priority}/${current_priority}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default upgradePlan;
