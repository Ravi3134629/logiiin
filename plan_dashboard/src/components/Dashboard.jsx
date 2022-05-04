import React from "react";
import upgradePlan from "../utils/upgradePlan";
import "./Dashboard.css";
import PlanCard from "./PlanCard";
function Dashboard({ plans, user }) {
  const [active_plan, setActivePlan] = React.useState(null);
  const [unactive, setUnActivePlan] = React.useState(null);

  React.useEffect(() => {
    setActivePlan(
      plans && plans.filter((plan) => plan.priority === user.active_plan)[0]
    );
    setUnActivePlan(
      plans && plans.filter((plan) => plan.priority !== user.active_plan)
    );
  }, [plans]);

  const handleUpgrade = (priority) => {
    upgradePlan(priority, active_plan.priority)
      .then((r) => {
        console.log(r);
        const { success, message } = r;
        if (!success) {
          alert(message);
        } else {
          window.location.href = "/";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="dashboard">
      {active_plan && (
        <>
          <h3>Active Plan</h3>
          <div className="my_active_plan">
            <PlanCard
              name={active_plan.name}
              active={true}
              price={active_plan.price}
            />
          </div>
        </>
      )}
      {unactive && (
        <>
          <h3>Plans</h3>
          <div className="dashboard_plans">
            {unactive.map((plan) => {
              return (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  plan={plan}
                  handleUpgrade={handleUpgrade}
                  price={plan.price}
                  active={false}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
