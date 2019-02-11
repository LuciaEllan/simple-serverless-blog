<template>
  <q-layout view="lhr Lpr fFf">
    <q-drawer side="left" v-model="leftDrawer">
      <LeftSidebar></LeftSidebar>
    </q-drawer>

    <q-footer>
      <Footer></Footer>
    </q-footer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import LeftSidebar from 'components/LeftSidebar'
import Footer from 'components/Footer'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawer: true
    }
  },
  components: {
    LeftSidebar,
    Footer
  }
}
</script>

<style>
</style>
