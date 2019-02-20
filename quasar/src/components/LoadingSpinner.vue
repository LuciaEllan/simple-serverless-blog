<template>
  <div class="absolute-center">
    <q-spinner-comment :size="size" :color="color" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: { type: String, default: '2em' },
    color: { type: String, default: 'accent' }
  }
}
</script>
