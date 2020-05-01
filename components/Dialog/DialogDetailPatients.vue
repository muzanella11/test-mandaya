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
        Lihat Data Pasien

        <v-spacer />

        ID:{{ activePatientId }}
      </v-card-title>

      <v-divider />

      <v-card-text v-if="isLoadingDetail">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-card-text>

      <v-card-text v-else>
        <v-row>
          <v-col cols="6">
            <label>
              Nama Depan :
            </label>
          </v-col>
          <v-col cols="6">
            {{ detailPatient.firstName }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Nama Belakang :
            </label>
          </v-col>
          <v-col cols="6">
            {{ detailPatient.lastName }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Tanggal Lahir :
            </label>
          </v-col>
          <v-col cols="6">
            {{ birthDate(detailPatient) }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Avatar
            </label>
          </v-col>
          <v-col
            cols="6"
            class="c-upload"
          >
            <img
              :src="detailPatient.avatar"
              class="upload__preview"
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Keluarga :
            </label>
          </v-col>
          <v-col cols="6">
            <ul
              v-if="familyPatient.length > 0"
              class="dialog__list"
            >
              <li
                v-for="(itemFamily, indexFamily) in familyPatient"
                :key="indexFamily"
              >
                {{ itemFamily.fullName }}
              </li>
            </ul>

            <template v-else>
              - Tidak Ada Data Keluarga -
            </template>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Pengguna Obat :
            </label>
          </v-col>
          <v-col cols="6">
            <ul
              v-if="medicineUsagePatient.length > 0"
              class="dialog__list"
            >
              <li
                v-for="(itemMedicine, indexMedicine) in medicineUsagePatient"
                :key="indexMedicine"
              >
                {{ itemMedicine.medicineName }}
              </li>
            </ul>

            <template v-else>
              - Tidak Ada Data Pengguna Obat -
            </template>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="actionCloseDialog"
        >
          Tutup
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
      //
    }
  },

  computed: {
    ...mapGetters({
      isShown: ROOTTYPES.GET_DIALOG_DETAIL_PATIENTS
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
      fetchMedicineUsagePatient: PATIENTSTYPES.FETCH_MEDICINE_USAGE_PATIENTS
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

    actionCloseDialog () {
      this.setPatientState({ accessor: 'activePatientId', value: '' })
      this.closeDialog(this.dialogName)
    }
  }
}
</script>
