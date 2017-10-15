<template>
  <v-menu
      v-model="showSearch"
      offset-y
      :close-on-content-click="false"
      bottom
      :nudge-top="-10"
      class="mr-2">
    <v-text-field
        slot="activator"
        v-model="search"
        @input="execSearch"
        label="Search"
        single-line
        solo
        clearable
        prepend-icon="search"
        class="global-search">
    </v-text-field>

    <v-card>
      <v-list>
        <template v-for="item in results">
          <v-list-tile avatar :key="item.id" v-if="item.profile" @click="onClickResult">
            <v-list-tile-avatar>
              <img class="white" :src="item.profile.photoURL"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.profile.displayName"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.profile.jobTitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import Fuse from 'fuse.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      search: null,
      showSearch: false,
      results: []
    }
  },
  computed: {
    ...mapState([
      'users'
    ])
  },
  methods: {
    execSearch (term) {
      this.showSearch = true
      this.results = this.fuseUsers.search(term)
    },
    onClickResult () {
      this.search = null
      this.results = []
      this.showSearch = false
    }
  },
  mounted () {
    this.fuseUsers = new Fuse(this.users, {
      keys: ['profile.displayName', 'profile.role'],
      defaultAll: false
    })
  },
  watch: {
    users () {
      this.fuseUsers = new Fuse(this.users, {
        keys: ['profile.displayName', 'profile.role'],
        defaultAll: false
      })
    }
  }
}
</script>

<style>

</style>
