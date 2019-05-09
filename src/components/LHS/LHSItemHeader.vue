<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: ['item'],
};
</script>
