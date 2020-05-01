import * as PATIENTSTYPES from './types'
import * as ROOTTYPES from '~/store/types'
import Api from '~/api'

export default {
  [PATIENTSTYPES.FETCH_PATIENTS] ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: true })
      Api.patients.list()
        .then(response => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'entries', value: response.data })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false })
          resolve(response)
        }, error => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'entries', value: [] })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.FETCH_DETAIL_PATIENTS] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: true })
      Api.patients.detail(id)
        .then(response => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'detailPatient', value: response.data })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false })
          resolve(response)
        }, error => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'detailPatient', value: {} })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.FETCH_FAMILY_PATIENTS] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.family', value: true })
      Api.patients.families(id)
        .then(response => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'familyPatient', value: response.data })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.family', value: false })
          resolve(response)
        }, error => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'familyPatient', value: {} })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.family', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.FETCH_MEDICINE_USAGE_PATIENTS] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.medicineUsage', value: true })
      Api.patients.medicineUsage(id)
        .then(response => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'medicineUsagePatient', value: response.data })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.medicineUsage', value: false })
          resolve(response)
        }, error => {
          commit(PATIENTSTYPES.SET_STATE, { accessor: 'medicineUsagePatient', value: {} })
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.medicineUsage', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.CREATE_DATA_PATIENTS] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true })
      Api.patients.create(data)
        .then(response => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          resolve(response)
        }, error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.UPDATE_DATA_PATIENTS] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true })
      Api.patients.update(data)
        .then(response => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          resolve(response)
        }, error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          reject(error)
        })
    })
  },

  [PATIENTSTYPES.DELETE_DATA_PATIENTS] ({ commit }, id) {
    return new Promise((resolve, reject) => {
      // commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true })
      Api.patients.delete(id)
        .then(response => {
          // commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          resolve(response)
        }, error => {
          // commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false })
          reject(error)
        })
    })
  }
}
