import axios from './base'

function resumeList(param) {
  return axios.post('/resume/resumeService.action', {
    service: 'resumeList',
    data: JSON.stringify(param)
  })
}
function response(promise, callback) {
  promise.then(res => {
    // console.log('response =>' + res.data)
    // if (res.data && res.data.code_ === 0) {
    //     return calback([])
    // }
    return callback([res.status, res.data])
  }).catch(error => {
    if (error.response) {
      return callback([error.response.status, error.response.data])
    } else {
      return callback(['-1', error.message])
    }
  })
}

function resumeList(param, callback) {
  response(resumeList(param), callback)
}
export default {
  resumeList,
}