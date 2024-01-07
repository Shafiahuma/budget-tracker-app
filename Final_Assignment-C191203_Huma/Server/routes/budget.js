var express = require("express");
const db = require("../database");
var router = express.Router();

/* GET Available Budget. */
router.get("/", async function (req, res, next) {
    const result =  await db.query("SELECT (SELECT SUM(value) FROM entries WHERE type = 'income') - (SELECT SUM(value) FROM entries WHERE type = 'expense') AS total_budget;");
  
      // Extract the total income from the query result
    const availableBudget = result.rows[0].total_budget;
    res.send(JSON.stringify(availableBudget));
});

router.get("/income", async function (req, res, next) {
    try {
      // Query to get the total income from the database
      const result =  await db.query("SELECT SUM(value) AS total_income FROM entries WHERE type = 'income';");
  
      // Extract the total income from the query result
      const totalIncome = result.rows[0].total_income;
  
      // Send the total income as a JSON response
      res.send(JSON.stringify(totalIncome));
    } catch (error) {
      console.error('Error fetching total income:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

/* GET Expense. */
router.get("/expense", async function (req, res, next) {
    try {
      // Query to get the total expense from the database
      const result =  await db.query("SELECT SUM(value) AS total_expense FROM entries WHERE type = 'expense';");
  
      // Extract the total expense from the query result
      const totalExpense = result.rows[0].total_expense;
      //console.log(totalExpense);
      // Send the total expense as a JSON response
      res.send(JSON.stringify(totalExpense));
    } catch (error) {
      console.error('Error fetching total expense:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
