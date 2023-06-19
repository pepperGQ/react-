import axios from "axios";

let request = axios.create({
    baseURL: "/api/", //基准地址
    timeout: 5000
})

//拦截请求
request.interceptors.request.use((config)=>{
    return config
})

//拦截响应
request.interceptors.response.use((response)=>{
    return response
},function(err){
    return Promise.reject(error)
})
export default request
