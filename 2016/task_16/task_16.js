var $ = function(id) {
  return document.getElementById(id);
};

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据（当输入为新城市时）或者更新一条数据（当输入为旧城市时）
 */
function addAqiData() {
  var city, score;
  if ((city = validateCityInput()) === null) return;
  //console.log(city);
  if ((score = validateScoreInput()) === null) return;
  //console.log(score);

  //if both ok, then insert or update a record in the aqiData map
  aqiData[city] = score;
  console.log(aqiData);

  //do not forget to clear the correct input and its tips
  clearInput();
}

function validateCityInput() {
  var city = $("aqi-city-input").value.trim();
  if (city === "") {
    $("city-input-error").innerHTML = "请先输入";
    return null;
  } else if (!/^[a-zA-Z\u4e00-\u9fa5]{2,10}$/.test(city)) {
    $("city-input-error").innerHTML = "城市名必须是2到10位的中英文字符组成";
    return null;
  } else {
    $("city-input-error").innerHTML = '<img src="images/ok.png" />';
    return city;
  }

}

function validateScoreInput() {
  var input = $("aqi-score-input").value.trim();
  var score = Number(input);
  if (input === "") {
    $("score-input-error").innerHTML = "请先输入";
    return null;
  } else if (!(/^\d+$/.test(input)) || (score < 0) || (score > 1000)) {
    $("score-input-error").innerHTML = "空气质量指数输入必须为0-1000之间的整数值";
    return null;
  } else {
    $("score-input-error").innerHTML = '<img src="images/ok.png" />';
    return score;
  }
}

function clearInput() {
  $("aqi-city-input").value = "";
  $("aqi-score-input").value = "";
  $("city-input-error").innerHTML = "";
  $("score-input-error").innerHTML = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var contentStr = "";
  if (Object.getOwnPropertyNames(aqiData).length > 0) { //when there at least one record
    contentStr += "<thead> <tr> <th>城市</th><th>空气质量</th><th>操作</th> </tr> </thead>";
    contentStr += "<tbody>";
    for (var city in aqiData) {
      contentStr += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }
    contentStr += "</tbody>";
  }
  $("aqi-table").innerHTML = contentStr;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var btnList = $("aqi-table").querySelectorAll("tbody tr td button");
  //console.log(btnList);
  for (var i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", delBtnHandle);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  //the "this" pointer remembered which button has been clicked
  var city = this.parentNode.parentNode.firstElementChild.innerHTML;

  //delete the recode of this city from the aqiData
  delete aqiData[city];
  console.log(aqiData);

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").addEventListener("click", addBtnHandle);

  // the validation process will be triggered when each input control loss the focus
  $("aqi-city-input").addEventListener("blur", validateCityInput);
  $("aqi-score-input").addEventListener("blur", validateScoreInput);

}

init();