import Cookies from "js-cookies";
import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import getPlans from "../utils/getPlans";
import getUser from "../utils/getUser";

function Home() {
  const [user, setUser] = React.useState(null);
  const [plans, setPlans] = React.useState(null);
  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((u) => {
          console.log(u);
          setUser(u);
        })
        .catch((e) => {
          console.log(e);
        });

      // get all plans

      getPlans()
        .then((plans) => {
          console.log(plans);
          setPlans(plans);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);
  return (
    <div className="home">
      {user && (
        <>
          <Header user={user} setUser={setUser} company_name="Company" />
          <Dashboard plans={plans} user={user} />
        </>
      )}
    </div>
  );
}

export default Home;
