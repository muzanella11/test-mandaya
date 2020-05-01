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
        Tambah Data Pasien
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <label>
              Nama Depan
            </label>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="entry.firstName"
              label="Nama Depan Anda"
              outlined
              single-line
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Nama Belakang
            </label>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="entry.lastName"
              label="Nama Belakang Anda"
              outlined
              single-line
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Tanggal Lahir
            </label>
          </v-col>
          <v-col cols="6">
            <date-picker
              :value="entry.birthDate"
              @input="setBirthDate"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <label>
              Avatarssss
            </label>
          </v-col>
          <v-col
            cols="6"
            class="c-upload"
          >
            <img
              :src="previewSrc"
              class="upload__preview"
            >

            <v-btn
              :loading="isLoading"
              :disabled="isLoading"
              color="blue-grey"
              class="ma-2 white--text"
            >
              Upload
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
              <input
                type="file"
                accept="image/*"
                @input="getFile($event)"
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          color="primary"
          text
          @click="actionCloseDialog"
        >
          Tutup
        </v-btn>

        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          color="primary"
          @click="submit"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import MixinsDialog from '~/mixins/MixinsDialog'
import * as ROOTTYPES from '~/store/types'
import * as PATIENTTYPES from '~/store/modules/patients/types'
import DatePicker from '~/components/Pickers/DatePicker'

export default {
  components: {
    DatePicker
  },

  mixins: [
    MixinsDialog
  ],

  data () {
    return {
      isLoading: false,
      image: null,
      previewSrc: null,
      imageBase64: null,
      entry: {
        firstName: '',
        lastName: '',
        birthDate: '',
        avatar: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      isShown: ROOTTYPES.GET_DIALOG_CREATE_PATIENTS
    })
  },

  watch: {
    'image' (val) {
      if (val) {
        this.toBase64(val).then(response => {
          this.imageBase64 = response
        }, () => {
          this.imageBase64 = null
        })
      } else {
        this.imageBase64 = null
      }
    }
  },

  methods: {
    ...mapActions({
      submitData: PATIENTTYPES.CREATE_DATA_PATIENTS
    }),

    setBirthDate (val) {
      this.entry.birthDate = val
    },

    getFile (val) {
      this.image = val.target.files[0]

      if (!this.image) {
        this.previewSrc = null

        return
      }

      this.previewSrc = URL.createObjectURL(this.image)
    },

    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },

    actionCloseDialog () {
      this.pruneAll()
      this.closeDialog(this.dialogName)
    },

    pruneAll () {
      this.isLoading = false
      this.image = null
      this.previewSrc = null
      this.imageBase64 = null
      this.entry = {
        firstName: '',
        lastName: '',
        birthDate: '',
        avatar: ''
      }
    },

    submit () {
      this.entry.avatar = this.imageBase64

      this.isLoading = true
      this.submitData(this.entry)
        .then(() => {
          this.isLoading = false
          this.actionCloseDialog()
          this.$emit('success', true)
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
