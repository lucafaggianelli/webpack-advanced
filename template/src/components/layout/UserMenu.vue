<template>
  <v-card v-if="profile"
      flat>
    <v-list two-line>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="profile.photoURL" :alt="profile.displayName">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title :html="profile.displayName"></v-list-tile-title>
          <v-list-tile-sub-title :html="profile.jobTitle"></v-list-tile-sub-title>
        </v-list-tile-content>

        <v-menu offset-y>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile :to="{ name: 'user-profile' }">
              <v-list-tile-action>
                <v-icon>account_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile :to="{ name: 'user-preferences' }">
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Preferences</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click="signOut()">
              <v-list-tile-action>
                <v-icon class="red--text">power_settings_new</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'profile'
    ]),
    organization () {
      return this.$store.state.organizations.name
    }
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$router.go('/login')
      }).catch((error) => {
        console.warn('Can\'t logout', error)
      })
    }
  }
}

</script>
