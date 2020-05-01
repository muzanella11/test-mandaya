<template>
  <v-dialog
    :ref="dialogName"
    v-model="isShown"
    :persistent="true"
    scrollable
    width="450"
    content-class="c-dialog"
  >
    <v-card>
      <v-card-title
        primary-title
      >
        Hapus Data Pasien

        <v-spacer />

        ID:{{ activePatientId }}
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row class="dialog__delete">
          <v-col cols="12">
            <v-row>
              <v-col cols="12">
                <h3 class="delete__title">
                  Apakah Anda yakin ingin menghapus data berikut ?
                </h3>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-text>
                    <v-row no-gutters>
                      <v-col cols="2">
                        <img
                          :src="detailPatient.avatar"
                          class="delete__preview"
                        >
                      </v-col>
                      <v-col cols="10">
                        <v-row no-gutters>
                          <v-col cols="6">
                            Nama Lengkap :
                          </v-col>
                          <v-col cols="6">
                            <strong>
                              {{ detailPatient.firstName }} {{ detailPatient.lastName }}
                            </strong>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="6">
                            Tanggal Lahir :
                          </v-col>
                          <v-col cols="6">
                            <strong>
                              {{ birthDate(detailPatient) }}
                            </strong>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="actionCloseDialog"
        >
          Batal
        </v-btn>

        <v-btn
          color="primary"
          @click="actionDelete"
        >
          Ya
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import {
  mapGetters,
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
import MixinsDialog from '~/mixins/MixinsDialog'
import * as ROOTTYPES from '~/store/types'
import * as PATIENTSTYPES from '~/store/modules/patients/types'

export default {
  mixins: [
    MixinsDialog
  ],

  data () {
    return {
      isLoading: false
    }
  },

  computed: {
    ...mapGetters({
      isShown: ROOTTYPES.GET_DIALOG_DELETE_PATIENTS
    }),

    ...mapState({
      activePatientId: state => state.patients.activePatientId,
      detailPatient: state => state.patients.detailPatient,
      familyPatient: state => state.patients.familyPatient,
      medicineUsagePatient: state => state.patients.medicineUsagePatient,
      isLoadingDetail: state => state.isLoading.detail
    })
  },

  watch: {
    activePatientId (val) {
      if (val) {
        this.fetchFamilyPatient(this.activePatientId)
        this.fetchMedicineUsagePatient(this.activePatientId)
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    ...mapActions({
      fetchDetailPatient: PATIENTSTYPES.FETCH_DETAIL_PATIENTS,
      fetchFamilyPatient: PATIENTSTYPES.FETCH_FAMILY_PATIENTS,
      fetchMedicineUsagePatient: PATIENTSTYPES.FETCH_MEDICINE_USAGE_PATIENTS,
      deleteData: PATIENTSTYPES.DELETE_DATA_PATIENTS
    }),

    ...mapMutations({
      setRootState: ROOTTYPES.SET_STATE,
      setPatientState: PATIENTSTYPES.SET_STATE
    }),

    init () {
      //
    },

    birthDate (item) {
      return moment(item.dateOfBirth).format('DD MMM YYYY')
    },

    actionDelete () {
      this.isLoading = true

      this.deleteData(this.activePatientId)
        .then(() => {
          this.isLoading = false
          this.actionCloseDialog()
          this.$emit('success', true)
        })
        .catch(() => {
          this.isLoading = false
        })
    },

    actionCloseDialog () {
      this.setPatientState({ accessor: 'activePatientId', value: '' })
      this.closeDialog(this.dialogName)
    }
  }
}
</script>
