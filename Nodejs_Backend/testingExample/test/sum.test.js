const {expect} = require("chai");
describe("sum of two number",()=>{
    it("should add two numbers correctly",()=>{
        const sum=(a,b)=>a+b;
        expect(sum(2,4)).to.equal(6);
    })
})