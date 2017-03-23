function Observer(obj) {
  this.walk(obj);
}

var p = Observer.prototype; //函数Observer的原型对象
p.data = {}; // 定义一个原型对象的属性data，这个属性被每个实例共享

// 定义原型对象的方法walk，这个方法会在每个实例对象创建时被调用
p.walk = function(obj) {
  Object.keys(obj).forEach(function(key) {
    if (typeof obj[key] === "object") {
      return p.walk(obj[key]);
    }
    Object.defineProperty(p.data, key, {
      get: function() {
        console.log("You are visiting the attribute: " + key + " - " + obj[key]);
        return obj[key];
      },
      set: function(newValue) {
        console.log("You are updating the attribute: " + key + " - " + newValue);
        obj[key] = newValue;
      }
    });
  });
};
/* Test Case */
var person1 = new Observer({
             name:"lin", age:23, 
             address:{add1:"China",add2:"FZ"} 
             });
person1.data.add1
Console