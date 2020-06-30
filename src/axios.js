import axios from 'axios';
import QS from 'qs';
import {
  Message
} from 'element-ui';
import router from './router'
const $axios = axios.create({
  baseURL: process.env.VUE_API_URL,
  timeout: 4000
});
// const baseURL = 'https://a.rsd123.com/index.php'
// const baseExportURL = 'https://a.rsd123.com/uploads/test/'
const baseURL = 'http://tiantianxsg.com:39888/index.php'
const baseExportURL = 'http://tiantianxsg.com:39888/uploads/test/'

//请求拦截
$axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
    // 此处应根据具体业务写token
    const token = localStorage.getItem('token')
    if (localStorage.getItem('token')) {
      // config.headers['http-userid'] = localStorage.getItem('uid')
      // config.headers['http-token'] = token
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    return config;
  },
  function (error) {
    // Message.error(error);
    return Promise.reject(error);
  }
);
// 添加响应拦截器
$axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.data.status.code === 200) {
      return Promise.resolve(response);
    } else {
      if (response.data.status.code == 5030) {
        return false
      } else if (response.data.status.code == 1003) {
        Message.error('登录过期，请重新登录!');
        localStorage.clear('')
        sessionStorage.clear('')
        router.replace('/login')
        return
      } else {
        return Promise.reject(response);
      }
    }
  },
  // 服务器状态码不是200的情况 
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          Message.error('网络错误');
          break;
        case 5030:
          console.log(error.response.status)
          break;
        // 401: 未登录    
        // 未登录则跳转登录页面，并携带当前页面的路径    
        // 在登录成功后返回当前页面，这一步需要在登录页操作。    
        case 401:
          break;
        // 403 token过期    
        // 登录过期对用户进行提示    
        // 清除本地token和清空vuex中token对象    
        // 跳转登录页面    
        case 403:
          Message.error(error.response.status.remind);
          // 清除token     
          localStorage.removeItem('token');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面     
          break;
        // 404请求不存在    
        case 404:
          Message.error('网络请求不存在');
          break;
        case 1003:
          Message.error('登录过期，请重新登录!');
          localStorage.clear('')
          sessionStorage.clear('')
          router.replace('/login')
          break;
        // 其他错误，直接抛出错误提示    
        default:
          return Promise.reject(error.response);
      }
    }
  }
);
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post (url, data) {
  return new Promise((resolve, reject) => {

    $axios.post(`${baseURL}${url}`, QS.stringify(data || {}))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function $post (url, params) {
  return new Promise((resolve, reject) => {
    $axios.post(`${baseURL}${url}${'?' + QS.stringify(params)}`)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function $get (url) {
  window.location.href = `${baseExportURL}${url}`
}
export function postFormData (url, params) {
  window.location.href = `${baseURL}${url}?uid=${params}`
}

export function exportData (url, params) {
  let param = QS.stringify(params)
  window.location.href = `${baseURL}${url}${'?'}${param}`
}
export function upload (params) {
  let file = new FormData()
  file.append('image', params)
  return new Promise((resolve, reject) => {
    $axios.post(`${baseURL}/uploadimg/moreupload`, file)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export function uploadFile (url, params) {
  let file = new FormData()
  file.append('uid', localStorage.getItem('uid'))
  file.append('file', params)
  return new Promise((resolve, reject) => {
    $axios.post(`${baseURL}${url}`, file)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
export default $axios;