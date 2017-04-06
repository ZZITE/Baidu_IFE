
// ES6 Syntax
Object.prototype.data = {};

class Observer {
  constructor(obj) {
    this.walk(obj);
}

  walk(obj) {
    Object.keys(obj).forEach(key => {
      if(typeof obj[key] === "object"){return Observer.prototype.walk(obj[key]);}
      Object.defineProperty(data,key, {
        get:() => { console.log("You are visiting the attribute: "+ key+" - "+obj[key]); return obj[key];},
        set:newValue => { console.log("You are updating the attribute: "+ key+" - "+ newValue); obj[key] = newValue; }
        });
    });
   }
}
/* Test Case */
var person1 = new Observer({
  name:"lin", age:23, 
  address:{add1:"China",add2:"FZ"} 
});
person1.data.add1
Console
