const {expect} = require("chai");
describe("Salary Calculation",()=>{
    it("salary net Pay",()=>{
        const basicPay=15000;
        const tax=basicPay*(10/100);
        const pf=basicPay*(10/100);
        const netSalary=()=>basicPay-tax-pf;

        
        expect(netSalary()).to.equal(12000);


    })
}) 