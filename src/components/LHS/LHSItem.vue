<template>
  <v-list-tile>
    <v-list-tile-action v-if="item.action">
      <v-icon>{{ item.action }}</v-icon>
    </v-list-tile-action>
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
