<template>
  <q-toolbar class="col-8">
    <q-toolbar-title class="text-center">
      <span class="q-px-xl">Get in touch!</span>
      <q-btn v-for="contact in contacts" :key="contact.label" class="q-mx-md" :icon="contact.icon" :label="isSmallScreen ? '' : contact.label" color="secondary" @click.native="openURL(contact.url)"></q-btn>
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
