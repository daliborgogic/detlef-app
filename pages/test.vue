<template lang="pug">
pre {{foo}}
</template>

<script>
export default {
  computed: {
    foo () {
      return this.$store.state.posts
    }
  }
}
</script>
