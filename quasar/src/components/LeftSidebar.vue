<template>
  <q-list no-border class="q-pl-md q-py-lg">
    <q-item class="row justify-center">
      <img src="@/assets/profile.png" />
    </q-item>
    <q-item class="text-center">
      <q-item-section>
        <q-item-label>Lucia Ellan</q-item-label>
        <q-item-label caption>Wannabe data engineer of all trades</q-item-label>
      </q-item-section>
    </q-item>
    <q-item />
    <q-separator />
    <q-item />
    <q-item to="/" exact>
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Home</q-item-label>
        <q-item-label caption>Public main page</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/post/xTAHFozFARaKmClbGzXf" exact>
      <q-item-section avatar>
        <q-icon name="gamepad" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Scoreboard</q-item-label>
        <q-item-label caption>Personal scoreboard for archive</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable @click.native="openURL('https://v1.quasar-framework.org/introduction-to-quasar')">
      <q-item-section avatar>
        <q-icon name="code" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Quasar v1 Doc</q-item-label>
        <q-item-label caption>Bookmark for convenience</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LeftSidebar',
  methods: {
    openURL
  }
}
</script>

<style>

</style>
