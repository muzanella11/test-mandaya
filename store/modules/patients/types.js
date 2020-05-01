// const NAMESPACE = `GLOBAL` // NAMESPACE MUST BE UNIQUE ACCROSS PROJECT
const NAMESPACE = 'PATIENTS'

/** ************************ For Mutations ***************************************/
export const SET_STATE = `${NAMESPACE}_SET_STATE`
/*******************************************************************************/

/** ************************ For Actions ****************************************/
export const FETCH_PATIENTS = `${NAMESPACE}_FETCH_PATIENTS`
export const FETCH_DETAIL_PATIENTS = `${NAMESPACE}_FETCH_DETAIL_PATIENTS`
export const FETCH_FAMILY_PATIENTS = `${NAMESPACE}_FETCH_FAMILY_PATIENTS`
export const FETCH_MEDICINE_USAGE_PATIENTS = `${NAMESPACE}_FETCH_MEDICINE_USAGE_PATIENTS`

export const CREATE_DATA_PATIENTS = `${NAMESPACE}_CREATE_DATA_PATIENTS`
export const UPDATE_DATA_PATIENTS = `${NAMESPACE}_UPDATE_DATA_PATIENTS`
export const DELETE_DATA_PATIENTS = `${NAMESPACE}_DELETE_DATA_PATIENTS`
/*******************************************************************************/

/** ************************ For Getters ****************************************/
export const GET_ENTRIES_PATIENTS = `${NAMESPACE}_GET_ENTRIES_PATIENTS`
/*******************************************************************************/
