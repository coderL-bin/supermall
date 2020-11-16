export function debounce (fu , delay){
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




















