<template>
  <div class="column justify-between no-wrap full-height q-pl-md q-py-lg">
    <q-list no-border>
      <q-item class="row justify-center">
        <img src="@/assets/profile.png" />
      </q-item>
      <q-item class="text-center">
        <q-item-section>
          <q-item-label>Lucia Ellan</q-item-label>
          <q-item-label caption>Wannabe data engineer of all trades</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="text-center">
        <q-item-section>
          <q-item-label caption>
            <span class="text-italic">Lucia Ellan</span> is an online persona and<br />
            may not reflect real identity in some ways.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="text-center">
        <q-item-section>
          <q-item-label caption>
            This profile image is created at:<br />
            <a href="https://make.girls.moe/" target="_blank">MakeGirlsMoe</a>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-my-md" />
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
          <q-item-label caption>Powered by Quasar framework</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <RootActionList />
  </div>
</template>

<script>
import { openURL } from 'quasar'
import RootActionList from 'components/RootActionList'

export default {
  name: 'LeftSidebar',
  components: {
    RootActionList
  },
  methods: {
    openURL
  }
}
</script>

<style>

</style>
