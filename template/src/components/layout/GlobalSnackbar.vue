<template>
  <v-snackbar
      :timeout="3000"
      :color="context"
      v-model="show">
    {{ message }}
    <v-btn light flat @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      context: state => state.alert.context,
      message: state => state.alert.message
    }),
    show: {
      get () { return this.$store.state.alert.show },
      set (value) { this.$store.commit('closeAlert') }
    }
  }
}
</script>

<style>

</style>
