function formatterTime(date){
  return date ? new Date(date).toLocaleString('zh-CN').replace(/\//g, "-") : ""
}
function compareArray(array1,array2,key){//compareArray为比较两个数组 array1为父 key为对比字段
  let array = []
  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array2.length; j++) {
      if(array1[i][key] == array2[j][key]) array.push(array1[i])
    }
  }
  return array
}
function copyObject(obj){
  return obj ? JSON.parse(JSON.stringify(obj)) : {}
}
function delElement(array,key,value){//删除array中某个元素
  if (!array || !(array instanceof Array) ) {
    return
  }
  for (var i = 0; i < array.length; i++) {
    if(array[i][key] == value){
      array.splice(i,1)
      return array
    }
  }
}
function updateElement(array,key,obj){//更新array中某个元素
  if (!array || !(array instanceof Array) ) {
    return
  }
  for (var i = 0; i < array.length; i++) {
    if(array[i][key] == obj[key]){
      Object.assign(array[i],obj)
      return array
    }
  }
}
function getValueofKeys(data, key){//getValueofKeys支持object.data的形式
  let arrayItem = data
  if (!key) return arrayItem
  if (key.indexOf(".") !== -1) {
    let newKey = key.split(".")
    for (var j = 0; j < newKey.length; j++) {
      if (!arrayItem) {
        break;
      }
      arrayItem = arrayItem[newKey[j]]
    }
  } else {
    arrayItem = data[key]
  }
  return arrayItem
}
const payMethod=["现金","欠单","用户账户","微信","支付宝","银行卡"]
const orderStatus={"0": "初始态", "5": "配货失败" ,"7": "审核失败" ,"10": "审核成功", "20": "完成配货", "21": "部分配货", "30": "已完成"}
const horderStatus={"0": "待处理", "3": "已驳回" ,"10": "已配货" ,"20": "已发货", "30": "已完成"}
const retOrderStatus=["初始化","取货","完成","退款"]

var windowListener=(func)=>{
  $(document).keypress(function (evt) {//全局监听事件，模拟系统弹窗
    if (evt.keyCode == '13') func()
    return true
  });
}
/*
msg 提示文案，alertClick alert框关闭回调
*/
function Alert(msg,alertClick){
  windowListener(onAlertClick)
  this.alertClick= alertClick
  $('body').append(alertView(msg))
}
function onAlertClick(){
  $(document).unbind('keypress');
  $('#alertViewBody').addClass("fadeOutUp")
  setTimeout(()=>{
    $('#alertView').remove()
  },300)//此处与css样式的animation一样，需一同修改
  this.alertClick && this.alertClick()
}
function alertView(msg){
  return "<div id=\'alertView\' class=\"modal modal-primary\" style=\"display:block;\">"+
  "<div style=\"position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000\" onClick=\"onAlertClick()\"></div>"+
  "<div class=\"modal-content fadeInDown animated fast\" id=\'alertViewBody\' style=\"position:fixed;top: 0;left: 0;right: 0;z-index:1050;background-color:white;width:20%;margin:auto;margin-top:5%\">"+
  "<div class=\'modal-header\'>"+
  "<button type=\'button\' class=\'close\' onClick=\"onAlertClick()\">×</button>"+
  "<h4 class=\'modal-title\'>提示</h4></div>"+
  "<div class=\'modal-body\'>"+msg+
  "<div style=\"text-align:right;margin-top:20px\">"+
  "<a class=\'btn btn-blue\'  onClick=\"onAlertClick()\">确定</a>"+
  "</div>"+
  "</div>"+
  "</div>"+
  "</div>";
}


/*
info 提示文案，confirm confirm框点击回调取消false确定true，点击背景返回undefined
*/
function Confirm(info,confirm){
  windowListener(()=>onConfirmClick(true))
  this.confirm= confirm
  $('body').append(confirmView(info))
}
function onConfirmClick(value){
  $(document).unbind('keypress');
  $('#confirmViewBody').addClass("fadeOutUp")
  setTimeout(()=>{
    $('#confirmView').remove()
  },300)//此处与css样式的animation一样，需一同修改
  this.confirm && this.confirm(value)
}
function confirmView(info){
  return "<div id=\'confirmView\' class=\"modal modal-primary\" style=\"display:block;\">"+
  "<div style=\"position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000\" onClick=\"onConfirmClick()\"></div>"+
  "<div class=\"modal-content fadeInDown animated fast\" id=\'confirmViewBody\' style=\"position:fixed;top: 0;left: 0;right: 0;z-index:1050;background-color:white;width:20%;margin:auto;margin-top:5%\">"+
  "<div class=\'modal-header\'>"+
  "<button type=\'button\' class=\'close\' onClick=\"onConfirmClick()\">×</button>"+
  "<h4 class=\'modal-title\'>请选择</h4></div>"+
  "<div style=\"padding:20px;font-size:15px\">"+info+
  "<div style=\"margin-top:20px;text-align:right\">"+
  "<a class=\'btn btn-blue\'  onClick=\"onConfirmClick(false)\" style=\'margin-right:20px\'>取消</a>"+
  "<a class=\'btn btn-blue\'  onClick=\"onConfirmClick(true)\">确定</a>"+
  "</div>"+
  "</div>"+
  "</div>"+
  "</div>";
}


/*promptData{
info 提示文案，
defaultValue input默认值，
onSubmit onSubmit框点击回调(点击确定返回input值，取消false，背景undefined)
}
*/
  function Prompt(promptData){
  windowListener(()=>onPromptClick(true))
  this.onSubmit = promptData.onSubmit
  $('body').append(promptView(promptData.info,promptData.defaultValue))
  $('#promptInput')[0].focus()
}
function onPromptClick(value){
  $(document).unbind('keypress');
  $('#promptViewBody').addClass("fadeOutUp")
  if (value) {
    value = $('#promptInput').val()
  }
  setTimeout(()=>{
    $('#promptView').remove()
  },300)//此处与css样式的animation一样，需一同修改
  this.onSubmit && this.onSubmit(value)
}
function promptView(info,defaultValue){
  defaultValue = defaultValue || ""
  return "<div id=\'promptView\' class=\"modal modal-primary\" style=\"display:block;\">"+
  "<div style=\"position:fixed;width:100%;height:100%;top:0;left:0;z-index:1000\" onClick=\"onPromptClick()\"></div>"+
  "<div class=\"modal-content fadeInDown animated fast\" id=\'promptViewBody\' style=\"position:fixed;top: 0;left: 0;right: 0;z-index:1050;background-color:white;width:20%;margin:auto;margin-top:5%\">"+
  "<div class=\'modal-header\'>"+
  "<button type=\'button\' class=\'close\' onClick=\"onPromptClick()\">×</button>"+
  "<h4 class=\'modal-title\'>请输入</h4></div>"+
  "<div style=\"padding:20px;\">"+
  "<div style=\'font-size:15px;padding-bottom:5px\'>"+info+"</div>"+
  "<input id=\'promptInput\' value="+defaultValue+"></Input>"+
  "<div style=\"text-align: right;margin-top:20px\">"+
  "<a class=\'btn btn-blue\'  onClick=\"onPromptClick(false)\" style=\'margin-right:20px\'>取消</a>"+
  "<a class=\'btn btn-blue\'  onClick=\"onPromptClick(true)\">确定</a>"+
  "</div>"+
  "</div>"+
  "</div>";
}

function Toast(msg){
  $('body').append(toastView(msg))
  setTimeout(()=>{
    $('#toast').addClass("fadeOutUp")
    setTimeout(()=>{
      $('#toast').remove()
    },300)
  },3000)
}
function toastView(msg){
  return "<span id=\'toast\' class=\'fadeInDown animated fast\' style=\'position:fixed;min-width:200px;line-height:40px;left:10%;color:white;background-color:rgba(0,0,0,0.8);border-radius:5px;text-align:center;top:20%;z-index:2000\'>"+msg+"</span>"
}
