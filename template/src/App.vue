<template>
  <v-app light>
    <main-navigation></main-navigation>

    <v-toolbar
        app
        fixed
        clipped-left
        class="primary"
        dark
        :dense="!!secondaryNav">
      <v-toolbar-side-icon @click.stop="toggleSidebar()" />

      <v-toolbar-title
          class="hidden-sm-and-down"
          v-html="config.title">
        <router-link to="/" class="white--text mr-4">
        </router-link>
      </v-toolbar-title>

      <v-toolbar-title v-html="$route.meta.title || pageTitle || $route.name">
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <global-search></global-search>

      <v-toolbar-items class="hidden-sm-and-down" v-if="!profile">
        <v-btn
            :href="{ path: '/login', query: { redirect: $route.path } }"
            flat>
          Login
        </v-btn>
      </v-toolbar-items>

      <secondary-nav v-if="secondaryNav" slot="extension"></secondary-nav>
    </v-toolbar>

    <main>
      <v-content>
        <v-container fluid grid-list-lg>
          <router-view></router-view>
        </v-container>
      </v-content>
      <global-snackbar></global-snackbar>
    </main>

  </v-app>
</template>

<script>
import config from '@/config'
import { mapMutations, mapState } from 'vuex'
import GlobalSearch from '@/components/layout/GlobalSearch'
import GlobalSnackbar from '@/components/layout/GlobalSnackbar'
import MainNavigation from '@/components/layout/MainNavigation'
import SecondaryNav from '@/components/layout/SecondaryNav'

export default {
  name: 'MainLayout',
  components: {
    GlobalSearch,
    GlobalSnackbar,
    MainNavigation,
    SecondaryNav{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  data{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
    return {
      config{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  },
  computed: {
    ...mapState('navigation', [
      'secondaryNav',
      'pageTitle'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    ]),
    ...mapState('user', [
      'profile'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    ]){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  methods: {
    ...mapMutations('navigation', [
      'toggleSidebar'{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    ]){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  mounted{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
    this.$store.commit('navigation/setMainNav'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
