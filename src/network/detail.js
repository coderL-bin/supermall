import request from "./request";

export function getDetail(iid){
  return request({
    url: '/detail',
    params : {
      iid
    }
  })
}

export class GoodsInfo {
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount= itemInfo.discountDesc;
    this.realPrice= itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

/*
class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
}

const p = new Person('codeL', 18);*/
