<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer side="left" :breakpoint="800" v-model="leftDrawer">
      <q-list no-border inset-delimiter>
        <q-list-header>Left drawer</q-list-header>
        <q-item>
          <q-item-main label="Image here" />
        </q-item>
        <q-item>
          <q-item-side icon="code" />
          <q-item-main label="Profile here" sublabel="Some details" />
        </q-item>
        <q-item to="/">
          <q-item-side icon="code" />
          <q-item-main label="Home" sublabel="Public main page" />
        </q-item>
        <q-item to="/edit">
          <q-item-side icon="code" />
          <q-item-main label="Write post" sublabel="Add one" />
        </q-item>
      </q-list>
    </q-layout-drawer>

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
export default {
  name: 'ReadPost',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
</style>
