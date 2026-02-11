const {expect} = require("chai");
describe("subtract of two number",()=>{
    it("should sub two numbers correctly",()=>{
        const sub=(a,b)=>a-b;
        expect(sub(4,2)).to.equal(2);
    })
})