/**
 * 
 * @ZZITE 
 * 
 */

//总是获取鼠标位置
$(document).ready(function() {
  document.onmousemove = mouseMove;
  //点击右键菜单选项或页面空白处重新隐藏右键菜单
  $("#menu label").click(function() {
    $("#menu").css("visibility","hidden");
  });
  $("body").click(function() {
    $("#menu").css("visibility","hidden");
  });
});

var mouseX;
var mouseY;

function mouseMove(ev) {
  ev = ev || window.event;
  var mousePos = mouseCoords(ev);
  mouseX = mousePos.x;
  mouseY = mousePos.y;
}

function mouseCoords(ev) {
  if(ev.pageX || ev.pageY) {
    return {x:ev.pageX,y:ev.pageY};
  } //兼容IE8及更早的浏览器
    return {
      x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

function rightClick() {
  var clientWidth = document.body.clientWidth;
  var divHeight = 200;
  var menuWidth = 150;
  var menuHeight = 31 * $("#menu label").length;
  $("#menu").css("visibility", "visible");
  $("#menu").css("left",mouseX > clientWidth - menuWidth ? mouseX - menuWidth : mouseX);
  if (mouseY <= divHeight) {
    $("#menu").css("top",mouseY > divHeight - menuHeight ? mouseY - menuHeight : mouseY);
    //禁用原先鼠标右键
    self.event.returnValue = false;
  }
}