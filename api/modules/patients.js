import axios from 'axios'
import endpoint from '../endpoint'
import resource from '../resource'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'PATIENTS'

export default {
  list () {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_LIST`
    const request = resource.get(`${endpoint.patients.index}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  detail (id) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_DETAIL`
    const request = resource.get(`${endpoint.patients.index}/${id}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  families (id) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_FAMILIES`
    const request = resource.get(`${endpoint.patients.index}/${id}/families`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  medicineUsage (id) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_MEDICINE_USAGE`
    const request = resource.get(`${endpoint.patients.index}/${id}/medicineusage`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  create (data) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_CREATE`
    const request = resource.post(`${endpoint.patients.index}`, data, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  update (payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_UPDATE`
    const request = resource.put(`${endpoint.patients.index}/${payload.id}`, payload.data, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  delete (id) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_DELETE`
    const request = resource.delete(`${endpoint.patients.index}/${id}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
