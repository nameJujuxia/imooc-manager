import JSONP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JSONP(options.url, {
        param: 'callback'
      }, (err, response) => {
        if (response.status === 'success') {
          resolve(response.results)
        } else {
          if (err) {
            reject(err.message);
          } else {
            reject(response.status)
          }
        }
      })
    })
  }

  static ajax(options) {
    const baseURL = 'https://www.easy-mock.com/mock/5cd3e5ca9412184628109f28/mockapi';
    const loadingDom = document.getElementById('ajaxLoading');
    options.isShowLoading !== false && (loadingDom.style.display = 'block');
    return new Promise((resolve, reject) => {
      axios({
        method: options.method || 'get',
        url: options.url,
        baseURL,
        timeout: 6000,
        data: options.data || '',
        params: options.params || '',
      }).then(res => {
        options.isShowLoading !== false && (loadingDom.style.display = 'none');
        let { data } = res;
        if (res.status === 200) {
          if (data.code === '0') {
            resolve(data)
          } else {
            Modal.info({
              title: '提示!',
              content: data.errMsg
            })
          }
        } else {
          reject(res.data)
        }
      })
    })
  }
}