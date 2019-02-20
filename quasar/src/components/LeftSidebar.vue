<template>
  <div class="column justify-between no-wrap full-height q-pl-md q-py-lg">
    <q-list no-border>
      <q-item class="row justify-center">
        <img src="assets/profile.png" />
      </q-item>
      <q-item v-for="desc in profileDescriptions" :key="desc" class="text-center">
        <q-item-section avatar v-if="desc.icon !== undefined">
          <q-icon :name="desc.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-if="desc.title !== undefined" v-html="desc.title"></q-item-label>
          <q-item-label v-if="desc.caption !== undefined" v-html="desc.caption" caption></q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-my-md" />
      <template v-for="menu in leftMenus">
        <q-item :key="menu.title" v-if="menu.to !== undefined" :to="menu.to" exact>
          <q-item-section avatar v-if="menu.icon !== undefined">
            <q-icon :name="menu.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
            <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
          </q-item-section>
        </q-item>
        <q-item :key="menu.title" v-else-if="menu.href !== undefined" clickable @click.native="openURL(menu.href)">
          <q-item-section avatar v-if="menu.icon !== undefined">
            <q-icon :name="menu.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
            <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
          </q-item-section>
        </q-item>
        <q-item :key="menu.title" v-else>
          <q-item-section avatar v-if="menu.icon !== undefined">
            <q-icon :name="menu.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
            <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-if="isWritable">
        <template v-for="menu in leftAdminMenus">
          <q-item :key="menu.title" v-if="menu.to !== undefined" :to="menu.to" exact>
            <q-item-section avatar v-if="menu.icon !== undefined">
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
              <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
            </q-item-section>
          </q-item>
          <q-item :key="menu.title" v-else-if="menu.href !== undefined" clickable @click.native="openURL(menu.href)">
            <q-item-section avatar v-if="menu.icon !== undefined">
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
              <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
            </q-item-section>
          </q-item>
          <q-item :key="menu.title" v-else>
            <q-item-section avatar v-if="menu.icon !== undefined">
              <q-icon :name="menu.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="menu.title" v-html="menu.title"></q-item-label>
              <q-item-label caption v-if="menu.caption" v-html="menu.caption"></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </template>
    </q-list>
    <RootActionList />
  </div>
</template>

<script>
import { openURL } from 'quasar'
import RootActionList from 'components/RootActionList'
import BlogConfig from 'src/configs/blog-config'

export default {
  name: 'LeftSidebar',
  components: {
    RootActionList
  },
  data () {
    return {
      profileDescriptions: BlogConfig.profileDescriptions,
      leftMenus: BlogConfig.leftMenus,
      leftAdminMenus: BlogConfig.leftAdminMenus
    }
  },
  computed: {
    isWritable () {
      return this.$store.getters.isWritableUser
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>

</style>
