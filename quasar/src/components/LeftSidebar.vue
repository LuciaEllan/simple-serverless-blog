<template>
  <q-list no-border inset-delimiter>
    <q-item class="row justify-center">
      <img src="@/assets/profile.png" />
    </q-item>
    <q-item class="text-center">
      <q-item-main label="Lucia Ellan" sublabel="Wannabe data engineer of all trades" />
    </q-item>
    <q-item><!-- an empty item --></q-item>
    <q-item separator to="/" exact>
      <q-item-side icon="code" />
      <q-item-main label="Home" sublabel="Public main page" />
    </q-item>
    <q-item to="/edit" exact>
      <q-item-side icon="code" />
      <q-item-main label="Write post" sublabel="Add one" />
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
