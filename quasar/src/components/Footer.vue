<template>
  <q-toolbar class="col-8">
    <q-toolbar-title class="text-center">
      <span class="q-px-xl">Get in touch!</span>
      <q-btn class="q-mx-md" icon="fab fa-facebook-square" label="Facebook" color="secondary" @click.native="openURL('https://www.facebook.com/lucia.ellan')"></q-btn>
      <q-btn class="q-mx-md" icon="email" label="Email" color="secondary" @click.native="openURL('mailto:lucia@luciaellan.com')"></q-btn>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Footer',
  methods: {
    openURL
  }
}
</script>

<style>

</style>
