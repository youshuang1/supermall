import axios from "axios";

export function request(config){
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

  //axios 的拦截器
  instance.interceptors.request.use(config => {
    //1:比如config中的一些信息不符合服务器的要求
    //2：
    return config;
  },error => {
    console.log(error);
    //比如每次发送网络请求时，都希望在界面中显示一个请求的图标（等待层）
    //3：某些网络请求，登录，必须携带一些特殊的信息（token）
    console.log(config);
    return config;
  })
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  return instance(config)
}

