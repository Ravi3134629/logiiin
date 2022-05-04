const Plan = require("../models/plans");
const router = require("express").Router();

router
  .get("/all", async (req, res) => {
    const plans = await Plan.find();
    return res.status(200).send(plans);
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const plan = await Plan.findOne({ _id: id });
    return plan;
  })
  .post("/add", async (req, res) => {
    const { name, price, priority } = req.body;
    const newPlan = new Plan({ name, price, priority });

    newPlan
      .save()
      .then(() => {
        return res.status(200).send(newPlan);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });

module.exports = router;
