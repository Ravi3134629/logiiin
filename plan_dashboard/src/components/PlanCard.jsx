import React from "react";
import "./PlanCard.css";
function PlanCard({ name, active, plan, handleUpgrade, price }) {
  return (
    <div className={`plan_card ${active && "active_card"}`}>
      <div className="plan_card_body">
        <h3>{name}</h3>
        <p>${price}</p>
        {active ? null : (
          <button
            className={`${name.toLowerCase() + "__btn"}`}
            onClick={() => {
              handleUpgrade(plan.priority);
            }}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
