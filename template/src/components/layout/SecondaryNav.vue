<template>
  <v-tabs dark>
    <v-tabs-bar class="primary">
      <v-tabs-slider class="white"></v-tabs-slider>
      <v-tabs-item
          v-for="item in menuItems" :key="item.name"
          :to="item.link"
          exact>
        \{{ item.name }}
      </v-tabs-item>
    </v-tabs-bar>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      menuItems: state => state.navigation.secondaryNav
    })
  }
}
</script>

<style lang="scss">
.application .theme--dark.tabs .tabs__item {
  font-weight: 500;
  outline: 0;

  &:hover {
    color: #fff;
  }
}
</style>
