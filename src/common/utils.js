export function debounce (fu , delay=100){
  //自定义防抖动函数
  let timer = null;
  return (...args) => {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fu.apply(this, args);
    }, delay);
  }
}

export function delayTime(fu, delay){
  let timer = null;
  return (...args) => {
    if(timer)clearTimeout(timer);
    timer = setTimeout(() =>{
      fu.apply(this, args)
    }, delay)
  }
}

//时间戳转换时间格式
export function formatDate(date, fmt) {
  //1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    console.log(RegExp.$1.length);
  }

  //2.获取月，日，时，分，秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      console.log(RegExp.$1.length);
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


















