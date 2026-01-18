interface users{
id:number;
name:string;
salary:number;
}
let userData : users={
id:101,
name:"Niti",
salary:54545,
}
// react props , state management a

interface Animal {
  name: string;
  sound(): void;
}
class Dog implements Animal {
  constructor(public name: string) {}
  sound() {
    console.log(`${this.name} says: Woof!`);
  }
}
let obj = new Dog("dfdf");
obj.sound();