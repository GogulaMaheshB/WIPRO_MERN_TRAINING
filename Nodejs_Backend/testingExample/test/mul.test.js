const {expect} = require("chai");
describe("Multiply of two number",()=>{
    it("should Multiply two numbers correctly",()=>{
        const mul=(a,b)=>a*b;
        expect(mul(2,4)).to.equal(8);
    })
})