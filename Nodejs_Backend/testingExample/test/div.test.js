const {expect} = require("chai");
describe("divide of two number",()=>{
    it("should divide two numbers correctly",()=>{
        const div=(a,b)=>a/b;
        expect(div(4,2)).to.equal(2);
    })
})