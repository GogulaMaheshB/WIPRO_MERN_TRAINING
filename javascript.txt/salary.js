function calculateSalary() {
    let workingDays = Number(document.getElementById("days").value);
    let basicSal = Number(document.getElementById("basic").value);

    let bonus = 0.10 * basicSal;

    let grossSal = (basicSal / 22) * workingDays + bonus;

    let tax = 0.10 * grossSal;
    let netSal = grossSal - tax;

    document.getElementById("gross").innerText = grossSal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("net").innerText = netSal.toFixed(2);
}





