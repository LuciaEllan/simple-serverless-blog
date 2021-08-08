<template>
  <q-toolbar>
    <q-toolbar-title class="text-center">
      <span class="q-pr-lg q-ml-sm">Get in touch!</span>
      <q-btn v-for="contact in contacts" :key="contact.label" class="q-mx-sm" :icon="contact.icon" :label="isSmallScreen ? '' : contact.label" color="secondary" @click="openURL(contact.url)"></q-btn>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import { openURL } from 'quasar'
import BlogConfig from '@/configs/blog-config'

export default {
  name: 'Footer',
  data () {
    return {
      contacts: BlogConfig.contacts
    }
  },
  computed: {
    isSmallScreen () {
      return this.$q.screen.lt.sm
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>

</style>
