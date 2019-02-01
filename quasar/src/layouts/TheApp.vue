<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-toolbar-title>
          Header?
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
        <FirebaseAuth></FirebaseAuth>
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) The Footer -->
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
import FirebaseAuth from 'components/FirebaseAuth'

export default {
  name: 'AppLayout',
  data () {
    return {}
  },
  components: {
    FirebaseAuth
  }
}
</script>

<style>
</style>
