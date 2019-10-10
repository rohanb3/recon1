<template>
  <router-link v-if="link" :to="link">{{ value }}</router-link>
  <span v-else>{{ value }}</span>
</template>

<script>
export default {
  props: ['link', 'value'],
};
</script>
