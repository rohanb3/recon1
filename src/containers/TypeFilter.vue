<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t(title)"
      boundaries-selector=".orders-table"
      name="name"
      :items="typesList"
      :useQuickBtn="false"
      :useSearchField="false"
      :show-clear-button="true"
      @select="toggleItem"
      @clearAll="onClearAllItemDisplayed"
    />
  </div>
</template>

<script>
import TableFilter from '@/components/TableFilter';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

export default {
  name: 'TypeFilter',
  mixins: [tableFilterAutocomplete],
  props: {
    tableName: {
      type: String,
      required: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    },
    translationKeys: {
      type: Object,
      required: true,
    },
  },
  components: {
    TableFilter,
  },
  mounted() {
    this.loadTypesList();
  },
  data() {
    return {
      [this.filterName]: [],
    };
  },
  computed: {
    typesList() {
      return this[this.filterName].map(({ id, name, selected }) => {
        const translationKey = [this.translationKeys][name];
        return {
          id,
          name: translationKey ? this.$t(translationKey) : name,
          selected,
        };
      });
    },
  },
  methods: {
    loadTypesList() {
      this.loading = true;
      this.loadData()
        .then(data => {
          this[this.filterName] = data;
          this.displayPreselectItems();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
