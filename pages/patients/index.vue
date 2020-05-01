<template>
  <div class="l-list">
    <v-card>
      <v-card-text>
        <v-row
          no-gutters
          class="list__head"
        >
          <v-col
            cols="9"
          />

          <v-col
            cols="3"
            class="text-lg-right"
          >
            <v-btn
              color="primary"
              @click="openDialog('createPatients')"
            >
              + Tambah
            </v-btn>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            cols="12"
          >
            <v-simple-table
              class="c-table"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Id
                    </th>
                    <th class="text-left">
                      Avatar
                    </th>
                    <th class="text-left">
                      Nama Lengkap
                    </th>
                    <th class="text-left">
                      Tanggal Lahir
                    </th>
                    <th class="text-left">
                      Dibuat
                    </th>
                    <th class="text-left">
                      Dimodifikasi
                    </th>
                    <th class="text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="isLoading"
                  >
                    <tr
                      v-for="(item, index) in 8"
                      :key="index"
                    >
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="avatar"
                          :tile="false"
                          style="padding: 8px 0;"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                      <td>
                        <v-skeleton-loader
                          ref="skeleton"
                          :boilerplate="false"
                          type="table-cell"
                          :tile="false"
                          class="mx-auto"
                        />
                      </td>
                    </tr>
                  </template>

                  <template
                    v-else
                  >
                    <tr
                      v-for="(item, index) in entries"
                      :key="index"
                    >
                      <td>
                        {{ item.id }}
                      </td>
                      <td>
                        <img
                          :alt="item.firstName"
                          :src="item.avatar"
                          width="50px"
                        >
                      </td>

                      <td>
                        {{ `${item.firstName} ${item.lastName}` }}
                      </td>

                      <td>
                        {{ birthDate(item) }}
                      </td>

                      <td v-html="createdOrModified(item)" />

                      <td v-html="createdOrModified(item, 'modified')" />

                      <td>
                        <ul class="list__action">
                          <li>
                            <a
                              href="javascript:;"
                              @click="openDetail(item, 'detailPatients')"
                            >
                              <v-icon>
                                mdi-eye-outline
                              </v-icon>
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:;"
                              @click="openDetail(item, 'updatePatients')"
                            >
                              <v-icon>
                                mdi-square-edit-outline
                              </v-icon>
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:;"
                              @click="openDetail(item, 'deletePatients')"
                            >
                              <v-icon>
                                mdi-trash-can-outline
                              </v-icon>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>

                    <tr
                      v-if="entries.length === 0"
                      class="text-lg-center"
                    >
                      <td colspan="7">
                        No Data Showing :(
                      </td>
                    </tr>
                  </template>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <dialog-create-patients
      dialog-name="createPatients"
      @success="onCreateSuccess"
    />
    <dialog-update-patients
      dialog-name="updatePatients"
      @success="onUpdateSuccess"
    />
    <dialog-delete-patients
      dialog-name="deletePatients"
      @success="onDeleteSuccess"
    />
    <dialog-detail-patients
      dialog-name="detailPatients"
    />
  </div>
</template>

<script>
import moment from 'moment'
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import MixinsDialog from '~/mixins/MixinsDialog'
import * as PATIENTTYPES from '~/store/modules/patients/types'
import DialogCreatePatients from '~/components/Dialog/DialogCreatePatients'
import DialogDetailPatients from '~/components/Dialog/DialogDetailPatients'
import DialogUpdatePatients from '~/components/Dialog/DialogUpdatePatients'
import DialogDeletePatients from '~/components/Dialog/DialogDeletePatients'

export default {
  components: {
    DialogCreatePatients,
    DialogDetailPatients,
    DialogUpdatePatients,
    DialogDeletePatients
  },

  mixins: [
    MixinsDialog
  ],

  data () {
    return {
      //
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.isLoading.list
    }),

    ...mapGetters({
      entries: PATIENTTYPES.GET_ENTRIES_PATIENTS
    })
  },

  mounted () {
    this.init()
  },

  methods: {
    ...mapActions({
      fetchResources: PATIENTTYPES.FETCH_PATIENTS,
      fetchDetailPatient: PATIENTTYPES.FETCH_DETAIL_PATIENTS
    }),

    ...mapMutations({
      setPatientState: PATIENTTYPES.SET_STATE
    }),

    init () {
      this.fetchResources()
    },

    birthDate (item) {
      return moment(item.dateOfBirth).format('DD MMM YYYY')
    },

    createdOrModified (item, action) {
      const person = action === 'modified' ? item.modifiedBy : item.createdBy
      const date = action === 'modified' ? item.modifiedOn : item.createdOn

      return `${moment(date).format('DD MMM YYYY')}<br>${person}`
    },

    openDetail (item, dialogName) {
      this.setPatientState({ accessor: 'activePatientId', value: item.id })
      this.openDialog(dialogName)
      this.fetchDetailPatient(item.id)
    },

    onCreateSuccess () {
      this.fetchResources()
    },

    onUpdateSuccess () {
      this.fetchResources()
    },

    onDeleteSuccess () {
      this.fetchResources()
    }
  }
}
</script>
