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

    <RootActionButtons />
  </q-layout>
</template>

<script>
import RootActionButtons from 'components/RootActionButtons'
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
    RootActionButtons,
    LeftSidebar,
    Footer
  }
}
</script>

<style>
</style>
