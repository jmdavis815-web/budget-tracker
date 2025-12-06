function calculateBudget() {
    // 1. Get numeric values (default to 0 if empty)
    let payCheck   = parseFloat(document.getElementById('payCheck').value)   || 0;
    let rent       = parseFloat(document.getElementById('rent').value)       || 0;
    let groceries  = parseFloat(document.getElementById('groceries').value)  || 0;
    let gas        = parseFloat(document.getElementById('gas').value)        || 0;
    let carPayment = parseFloat(document.getElementById('carPayment').value) || 0;
    let phoneBill  = parseFloat(document.getElementById('phoneBill').value)  || 0;

    // Sum of monthly bills
    let bills = rent + groceries + gas + carPayment + phoneBill;

    // 2. Determine pay frequency based on radio buttons
    let payFrequency = 0; // number of paychecks per month

    if (document.getElementById('weekly').checked) {
        payFrequency = 4;  // roughly 4 checks per month
    } else if (document.getElementById('biWeekly').checked) {
        payFrequency = 2;  // 2 checks per month
    } else if (document.getElementById('monthly').checked) {
        payFrequency = 1;  // 1 check per month
    }

    if (payFrequency === 0) {
        alert("Please select a pay frequency.");
        return;
    }

    // 3. Basic budget math
    let budget = payCheck * payFrequency;  // monthly income
    let savings = budget * 0.10;           // 10% savings
    let totalExpenses = bills + savings;
    let dailyBudget = (budget - totalExpenses) / 30; // approx 30 days

    // Avoid negative NaN weirdness
    if (isNaN(dailyBudget)) {
        alert("Please enter valid numbers for your paycheck and bills.");
        return;
    }

    // 4. Fill the results card
    const resultsCard = document.getElementById('resultsCard');
    const incomeEl = document.getElementById('resultIncome');
    const billsEl = document.getElementById('resultBills');
    const savingsEl = document.getElementById('resultSavings');
    const totalExpensesEl = document.getElementById('resultTotalExpenses');
    const dailyBudgetEl = document.getElementById('resultDailyBudget');
    const expenseProgress = document.getElementById('expenseProgress');

    incomeEl.textContent = `$${budget.toFixed(2)}`;
    billsEl.textContent = `$${bills.toFixed(2)}`;
    savingsEl.textContent = `$${savings.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
    dailyBudgetEl.textContent = `$${dailyBudget.toFixed(2)}`;

    // Progress bar: how much of income goes to expenses
    let percent = 0;
    if (budget > 0) {
        percent = (totalExpenses / budget) * 100;
    }
    percent = Math.max(0, Math.min(percent, 100)); // clamp 0–100

    expenseProgress.style.width = `${percent.toFixed(0)}%`;
    expenseProgress.setAttribute('aria-valuenow', percent.toFixed(0));
    expenseProgress.textContent = `${percent.toFixed(0)}%`;

    // Color tweak: if expenses < 70% income => green, 70–90 yellow, 90+ red
    if (percent < 70) {
        expenseProgress.className = "progress-bar bg-success";
    } else if (percent < 90) {
        expenseProgress.className = "progress-bar bg-warning";
    } else {
        expenseProgress.className = "progress-bar bg-danger";
    }

    // Show the card
    resultsCard.classList.remove('d-none');
}
