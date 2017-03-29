function addEvent(elem, type, func) { //兼容浏览器差异
  if (elem.addEventListener) {
    elem.addEventListener(type, func);
  } else if (elem.attachEvent) {
	  elem.attachEvent("on" + type, func);
    } else {
	    elem["on" + type] = func;
      }
}
window.onload = function() {
  var arr = []; //初始放60个数字
  for (var num = 90; num > 30; num--) {
    arr.push(num);
  }
  var list = { //留个接口
    queue: arr, //队列
	push: function(num) { //左侧入 
      if (btnClick) {
	  alert("正在排序呢！");
	  return false;
	}
	if (this.queue.length >= 60) {
	  alert("太多了，不能再加了");
	  return false;
	}
	this.queue.push(num);
	this.paint();
	},
	unshift: function(num) { //右侧入
	  if (btnClick) {
	  alert("正在排序呢！");
	  return false;
	  }
	  if (this.queue.length >= 60) {
	  alert("太多了，不能再加了");
	  return false;
	  }
	  this.queue.unshift(num);
	  this.paint();
	},
	pop: function() { //左侧出
	  if (btnClick) {
	  alert("正在排序呢！");
	  return false;
	  }
			//本来内置函数想用this的，可是绑定上事件之后其this指向的对象就变了，指向按钮.
			//如果想直接用this,而不是list的话，可以在绑定的时候放进一个匿名函数里调用，避免this的指向改变。
			//list.shift方法用的以上原理，所以其可以直接用this;
	  if (list.queue.length === 0) {
	    alert("队列没有数字拉！亲");
		return false;
	  }
	  alert(list.queue.pop());
	  list.paint();
	},
    shift: function() { //右侧出
	  if (btnClick) {
	    alert("正在排序呢！");
		return false;
	  }
			//这个this的指向就没有改变。详细看最后俩个函数的绑定异同。
	  if (list.queue.length === 0) {
	    alert("队列没有数字拉！亲");
		return false;
	  }
	  alert(list.queue.shift());
	  list.paint();
	},
	del: function(num) { //删除指定的序号
	  if (btnClick) {
	    alert("正在排序呢！");
		return false;
	  }
	  this.queue.splice(num, 1);
	  this.paint();
	},
	paint: function() { //重绘
	  var str = list.queue.reduce(function(s, v) {
	    return s + "<div style='height:" + v + "px'></div>";
	  }, "");
	  container.innerHTML = str;
	  addDivEvent();
	}
  };
};