import axios from 'axios'

export default function request(config){
  const instance =  axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });
  //请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err =>{
    console.log(err);
  });
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  //发生真正的网络请求
  return instance(config);
}

