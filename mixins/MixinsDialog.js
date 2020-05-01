import {
  mapMutations
} from 'vuex'
import * as ROOTTYPES from '~/store/types'

export default {
  props: {
    dialogName: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      //
    }
  },

  methods: {
    ...mapMutations({
      setState: ROOTTYPES.SET_STATE
    }),

    openDialog (dialogName) {
      this.setState({ accessor: `dialog.${dialogName}`, value: true })
    },

    closeDialog (dialogName) {
      this.setState({ accessor: `dialog.${dialogName}`, value: false })
    }
  }
}
