<template>
  <div class="additional-info-block-form">
    <v-layout row mb-2>
      <v-flex md6>
        <v-select
          append-icon="expand_more"
          :label="$t('dispute.dispute.type')"
          required
          :validate-on-blur="true"
        ></v-select>
        <v-textarea
          name="input-7-1"
          :label="$t('dispute.submitter.comment')"
          value="Triple Play Select — Charter, 4HD box,
Wifi Router Included, New Number
Private 508-459-0523"
          hint="Hint text"
        ></v-textarea>
      </v-flex>
      <v-flex md6 ml-5>
        <browse-files />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BrowseFiles from '@/components/BrowseFiles/BrowseFiles';

export default {
  name: 'AdditionalInfoBlockForm',
  components: {
    BrowseFiles,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.additional-info-block-form {
  padding: 20px 40px 0 24px;
  border-right: 2px solid $content-background-color;
}
</style>
