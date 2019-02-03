<template>
  <q-page class="flex flex-center row">
    <q-tabs class="col-12 col-md-10 col-lg-8" style="min-height: 600px;" inverted>
      <!-- Tabs - notice slot="title" -->
      <q-tab default slot="title" name="tab-edit" label="Edit" />
      <q-tab slot="title" name="tab-preview" label="Preview" />
      <!-- Targets -->
      <q-tab-pane name="tab-edit">
        <div class="col-12 col-md-8 shadow-2">
          <q-input type="text" class="q-my-sm q-pa-sm" v-model="title" placeholder="Post title" hide-underline />
        </div>
        <div class="col-12 col-md-8 shadow-2">
          <q-input type="textarea" class="q-my-sm q-pa-sm" v-model="body" placeholder="Write your post here" rows="16" hide-underline />
        </div>
        <div class="col-12 col-md-8 shadow-2">
          <q-chips-input class="q-my-sm q-pa-sm" v-model="tags" placeholder="Tags (Write and hit ENTER to add)" hide-underline />
        </div>
      </q-tab-pane>
      <q-tab-pane name="tab-preview">
        Some preview content here
      </q-tab-pane>
    </q-tabs>
    <div class="col-12 col-md-10 col-lg-8">
      <q-btn>Save this post... maybe?</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      body: '',
      tags: []
    }
  }
}
</script>

<style>

</style>
