<template>
  <q-layout view="lhr Lpr fFf">
    <q-layout-drawer side="left" v-model="leftDrawer">
      <LeftSidebar></LeftSidebar>
    </q-layout-drawer>

    <q-layout-footer>
      <q-toolbar>
        <q-toolbar-title>
          Footer
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import LeftSidebar from 'components/LeftSidebar'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawer: true
    }
  },
  components: {
    LeftSidebar
  }
}
</script>

<style>
</style>
