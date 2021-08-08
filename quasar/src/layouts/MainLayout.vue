<template>
  <q-layout view="lhr Lpr fFf">
    <FirebaseAuth />
    <q-drawer side="left" v-model="leftDrawer">
      <LeftSidebar></LeftSidebar>
    </q-drawer>

    <q-footer>
      <Footer></Footer>
    </q-footer>

    <!-- added relative-position class to make some screensize-dependent things work -->
    <q-page-container class="layout_body relative-position">
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LeftSidebar from 'components/LeftSidebar'
import Footer from 'components/Footer'
import FirebaseAuth from 'src/components/FirebaseAuth'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawer: true
    }
  },
  components: {
    FirebaseAuth,
    LeftSidebar,
    Footer
  }
}
</script>

<style>
</style>
