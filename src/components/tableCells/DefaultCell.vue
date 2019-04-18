<template>
  <div class="default-cell">
    {{ value }}
  </div>
</template>

<script>
import nestedFieldCell from "@/mixins/nestedFieldCell";

export default {
  name: "DefaultCell",
  mixins: [nestedFieldCell]
};
</script>
