// 강화값
var current_enhance = 0; // 현재 강화
var result_enhance = 0; // 다음 강화
var count = 1; // 시도 횟수
var black = 0; // 0: 강화, 1: 흑마법
var doll = 0; // 0: 액막이 사용안함, 1: 액막이 사용함
// 전제조건, 30강 이상인 경우 자동 흑마법 부여 및 액막이 사용 가능

// 소모값
var low_stone = 0; // 하급 강화석
var middle_stone = 0; // 중급 강화석
var high_stone = 0; // 상급 강화석
var used_doll = 0; // 액막이 인형
var max = 0; // 강화 최대치
var thirty = 0; // 29->30강 도달 횟수

// 확률 및 재화
// 강화 확률 0~39
var probList = [100, 80, 70, 60, 50, 45, 40, 35, 30, 25,
                65, 65, 55, 45, 45, 35, 35, 25, 25, 15,
                65, 65, 55, 45, 45, 35, 35, 25, 25, 15,
                40, 35, 30, 25, 20, 15, 15, 15, 15, 15]

// 소모 강화석
var stonList = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3]

// 소모 액막이
var dollList = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2]


var $top = document.getElementById('top');
  var $centered = document.getElementById('centered');
  var $button1 = document.getElementById('button1');
  var $button2 = document.getElementById('button2');
  var $multiple = document.getElementById('multiple');
  var $isdoll = document.getElementById('isdoll');

var $used = document.getElementById('used');
  var $used_table = document.getElementById('used_table');
    var $low_stone = document.getElementById('low_stone');
    var $middle_stone = document.getElementById('middle_stone');
    var $high_stone = document.getElementById('high_stone');
    var $used_doll = document.getElementById('used_doll');

var $log = document.getElementById('log');
  var $log_head = document.getElementById('log_head');
  var $log_display = document.getElementById('log_display');
    var $log_table = document.getElementById('log_table');

var $maximum = document.getElementById('maximum');
  var $max_count = document.getElementById('max_count');
  var $max_enhance = document.getElementById('max_enhance');
  var $num_thirty = document.getElementById('num_thirty');


// 1회 강화
function single_enhance(current_enhance){
  if(current_enhance <= 9){
    low_enhance(current_enhance);
    display_results();
    whois_maximum();
    $low_stone.innerHTML = low_stone;
  }
  else if(current_enhance <= 19){
    middle_enhance(current_enhance);
    display_results();
    whois_maximum();
    $middle_stone.innerHTML = middle_stone;
  }
  else if(current_enhance <= 29){
    high_enhance(current_enhance);
    display_results();
    whois_maximum();
    is_thirty();
    $high_stone.innerHTML = high_stone;
  }
  else if(current_enhance >= 30 && !isdoll.checked){
    dark_enhance(current_enhance);
    display_results();
    whois_maximum();
    $high_stone.innerHTML = high_stone;
  }else if(current_enhance >= 30 && isdoll.checked){
    doll_enhance(current_enhance);
    display_results();
    whois_maximum();
    $high_stone.innerHTML = high_stone;
    $used_doll.innerHTML = used_doll;
  }
  count += 1
}

// 일괄 강화
function multiple_enhance(multiple){
  for (let i = 0; i < multiple; i++){
      single_enhance(current_enhance);
  }
}

function display_results(){
  row = $log_table.insertRow(-1);
  var cell_0 = row.insertCell(0);
    cell_0.innerHTML = count;
    cell_0.className = "col1";
  var cell_1 = row.insertCell(1);
    cell_1.innerHTML = current_enhance;
    cell_1.className = "col2";
  var cell_2 = row.insertCell(2);
    cell_2.innerHTML = result_enhance;
    cell_2.className = "col3";
  var cell_3 = row.insertCell(3);
    cell_3.innerHTML = probList[current_enhance] + " %";
    cell_3.className = "col4";
  var cell_4 = row.insertCell(4);
    if(current_enhance >= result_enhance){
      cell_4.innerHTML = "실패";
      cell_4.className = "col5";
    } else {
      cell_4.innerHTML = "성공";
      cell_4.className = "col5";
    }
  current_enhance = result_enhance;
  $log_display.scrollTop = $log_display.scrollHeight;
  $centered.innerHTML = "+" + current_enhance;
}

function whois_maximum(){
  if(max < current_enhance){
    max = current_enhance;
    $max_count.innerHTML = count;
    $max_enhance.innerHTML = current_enhance;
  }
}

function is_thirty(){
  if(current_enhance == 30){
    thirty += 1;
    $num_thirty.innerHTML = thirty;
  }
}

// 확률에 따른 강화
function enhance(current_enhance, prob, black = 0, doll = 0){
  const ranNum = Math.floor((Math.random() * 99) + 1)
  if(prob >= ranNum){
    return current_enhance + 1
  }
  else if (prob < ranNum && black == 1 && doll == 0){
    return current_enhance -10
  }
  else{
    return current_enhance
  }
}

// 하급 강화 (0~9 강)
function low_enhance(current_enhance) {
  switch(current_enhance){
    case current_enhance:
      result_enhance = enhance(current_enhance, probList[current_enhance]);
      low_stone += stonList[current_enhance%10];
      break;
  }
}

// 중급 강화 (10~19강)
function middle_enhance(current_enhance) {
  switch(current_enhance){
    case current_enhance:
      result_enhance = enhance(current_enhance, probList[current_enhance]);
      middle_stone += stonList[current_enhance%10];
      break;
  }
}

// 고급 강화 (20~29강)
function high_enhance(current_enhance) {
  switch(current_enhance){
    case current_enhance:
      result_enhance = enhance(current_enhance, probList[current_enhance]);
      high_stone += stonList[current_enhance%10];
      break;
  }
}

// 흑마법 강화 (30~강)
function dark_enhance(current_enhance) {
  switch(current_enhance){
    case current_enhance:
      result_enhance = enhance(current_enhance, probList[current_enhance], black = 1);
      high_stone += 3;
      break;
  }
}

// 액막이 강화
function doll_enhance(current_enhance) {
  switch(current_enhance){
    case current_enhance:
      result_enhance = enhance(current_enhance, probList[current_enhance], black = 1, doll = 1);
      high_stone += 3;
      used_doll += dollList[current_enhance-30]
      break;
  }
}

$button1.onclick = function() {
  single_enhance(current_enhance);
}

$button2.onclick = function() {
  multiple_enhance(parseInt($multiple.value));
}
