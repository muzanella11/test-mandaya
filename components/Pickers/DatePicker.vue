<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormated"
        label="Tanggal Lahir Anda"
        outlined
        single-line
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer />
      <v-btn text color="primary" @click="menu = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false
    }
  },

  computed: {
    dateFormated () {
      return this.date ? moment(this.date).format('DD MMM YYYY') : ''
    }
  },

  watch: {
    date (val) {
      this.$emit('input', val)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      setTimeout(() => {
        this.date = this.value
      }, 800)
    }
  }
}
</script>
