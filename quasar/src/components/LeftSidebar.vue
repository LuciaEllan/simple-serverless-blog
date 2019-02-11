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
    <q-item separator to="/" exact>
      <q-item-section avatar>
        <q-icon name="code" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Home</q-item-label>
        <q-item-label caption>Public main page</q-item-label>
      </q-item-section>
    </q-item>
    <q-item to="/edit" exact>
      <q-item-section avatar>
        <q-icon name="code" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Write post</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'LeftSidebar'
}
</script>

<style>

</style>
