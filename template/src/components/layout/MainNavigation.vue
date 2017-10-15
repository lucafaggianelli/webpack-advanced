<template>
  <v-navigation-drawer
      v-model="showSidebar"
      app
      persistent
      clipped
      enable-resize-watcher
      light>
    <user-menu></user-menu>
    <v-divider></v-divider>

    <v-list dense>
      <template v-for="item in mainNav" >
        <v-list-group v-if="item.items" :key="item.name">
          <v-list-tile slot="item" :to="item.link">
            <v-list-tile-action>
              <v-icon>\{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" :key="subItem.name"
              :to="subItem.link">
            <v-list-tile-content>
              <v-list-tile-title v-text="subItem.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>\{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else :to="item.link" :key="item.name">
          <v-list-tile-action>
            <v-icon>\{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

     <footer class="fixed">
      <template v-if="userPlan.id === 'free'">
        <v-divider></v-divider>
        <v-subheader>
          \{{ userPlan.name }} plan
          <v-spacer></v-spacer>
          <v-btn
              class="accent--text"
              outline
              :to="{ name: 'billing' }">
            Upgrade
          </v-btn>
        </v-subheader>
      </template>
      <v-divider></v-divider>
      <v-subheader class="py-3 grey lighten-4 grey--text text--darken-1">
        \{{ config.title }} v\{{ config.version }} &copy; \{{ year }}
      </v-subheader>
    </footer>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import config from '@/config'
import UserMenu from './UserMenu'

export default {
  name: 'Sidebar',
  props: {
    show: Boolean
  },
  components: {
    UserMenu
  },
  data: function () {
    return {
      config,
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState('navigation', [
      'mainNav'
    ]),
    ...mapGetters('user', [
      'userPlan'
    ]),
    showSidebar: {
      get () { return this.$store.state.navigation.showSidebar },
      set (show) { this.$store.commit('navigation/showSidebar', show) }
    }
  }
}
</script>

<style lang="scss">
footer.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0 !important;
  p {
    margin: 0;
  }
}
</style>
