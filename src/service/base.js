import http from 'axios'
import qs from 'qs'
// import * as _ from '../util/tool'
http.defaults.timeout = 10000; //响应时间
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
http.defaults.baseURL = 'http://10.0.0.65:8080/dxracer-eom-web';    //配置接口地址
// http.defaults.withCredentials = true
//POST传参序列化(添加请求拦截器)
http.interceptors.request.use((config) => {
    debugger
	//在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    alert("错误的传参", 'fail');
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
http.interceptors.response.use((res) =>{
    //对响应数据做些事
    debugger
    console.log(res)
    console.log(res.status)
     alert(res.status)
    if(res.status != 200){
        alert("300")
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    alert("网络异常", 'fail');
    return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
                    debugger    
    return new Promise((resolve, reject) => {
        http.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
export default{
    http,
    signin(params){
        debugger
        return fetch('/user/login', params)        
    },
    ajax(params){
        debugger
         return fetch('/servlet/customer_need/list', {limit:10,offset:0,customer_name:"",company_name:"",tel:"",start_time:"",end_time:"",status:"",}) 
    }
} 