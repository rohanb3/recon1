<template>
  <v-container fluid grid-list-md class="dispute-page">
    <vue-perfect-scrollbar :settings="scrollSettings">
      <div class="dispute-page-wrapper">
        <div class="dispute-toolbar">
          <div class="dispute-title">{{ $t('dispute.page.title') }}</div>
        </div>
        <v-layout row wrap>
          <v-flex xs6 class="general-information-form">
            <general-information-form />
            <additional-info-block-form />
          </v-flex>
          <v-flex xs6 class="customer-information-wrapper">
            <customer-information-form />
            <div class="save-button-wrapper">
              <v-btn small depressed class="button-cancel-dispute">{{ $t('cancel') }}</v-btn>
              <v-btn small depressed class="button-save-dispute">{{ $t('save.as.draft') }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn small depressed class="button-create-dispute">{{
                $t('create.new.dispute')
              }}</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </vue-perfect-scrollbar>
  </v-container>
</template>

<script>
import AdditionalInfoBlockForm from '@/components/AdditionalInfoBlockForm';
import CustomerInformationForm from '@/components/CustomerInformationForm';
import GeneralInformationForm from '@/components/GeneralInformationForm';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'DisputePage',
  components: {
    AdditionalInfoBlockForm,
    CustomerInformationForm,
    GeneralInformationForm,
    VuePerfectScrollbar,
  },
  data() {
    return {
      scrollSettings: {
        suppressScrollX: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.dispute-page {
  @include table-base-container;
  height: 95vh;
  margin: 20px;
}

.dispute-page /deep/ {
  .required label::after {
    content: ' *';
    opacity: 0.6;
    color: $base-red;
  }

  .v-select__slot {
    .v-icon {
      color: $base-blue;
    }
  }
}

.dispute-page-wrapper {
  height: 90vh;
}

.dispute-toolbar {
  @include table-base-toolbar;
  padding: 0;
}

.dispute-title {
  @include table-base-title;
}

.save-button-wrapper {
  display: flex;
  margin: 20px;

  .v-btn--depressed {
    color: $base-white;
    text-transform: none;

    &.button-cancel-dispute {
      background: $button-blue-color;
    }

    &.button-save-dispute {
      background: $button-yellow-color;
    }

    &.button-create-dispute {
      background: $base-green;
    }
  }
}

.customer-information-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
