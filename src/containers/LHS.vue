<template>
  <nav class="lhs">
    <div class="lhs-header"></div>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <lhs-item-header :item="item"></lhs-item-header>
        </template>
        <div v-if="item.items">
          <lhs-item v-for="subItem in item.items" :item="subItem" :key="subItem.title"></lhs-item>
        </div>
      </v-list-group>
    </v-list>
  </nav>
</template>

<script>
import LhsItemHeader from '@/components/LHS/LHSItemHeader';
import LhsItem from '@/components/LHS/LHSItem';

export default {
  name: 'lhs',
  components: {
    LhsItemHeader,
    LhsItem,
  },
  data() {
    return {
      activeIndex: 0,
      items: [
        {
          action: 'search',
          title: 'Order Search',
          url: 'ValidatePagekey.aspx?akey=E819C48E-579F-4BBC-82CC-69C1E570E5DE',
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American', action: 'school' },
            { title: 'Sushi' },
          ],
        },
        {
          action: 'school',
          title: 'Education',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'directions_run',
          title: 'Family',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'healing',
          title: 'Health',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'content_cut',
          title: 'Office',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          items: [{ title: 'List Item' }],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

$lhs-background-color: #297fb8;
$lhs-text: rgba(255, 255, 255, 0.75);
$lhs-active-group-header-color: #26a69a;
$lhs-active-group-background-color: rgba(0, 0, 0, 0.15);

.lhs {
  .v-list {
    width: 100%;
    background-color: transparent;
    color: $lhs-text;
    padding: 0 10px;
  }

  .v-icon {
    color: $lhs-text;
  }

  .v-list__group--active {
    background-color: $lhs-active-group-background-color;
  }

  .v-list__group__header:hover,
  .v-list__group__items .v-list__tile:hover {
    color: $base-white !important;

    .v-icon {
      color: $base-white !important;
    }
  }

  .v-list__group__header--active {
    background-color: $lhs-active-group-header-color;
  }

  .v-list__group__header--active:hover {
    background-color: $lhs-active-group-header-color !important;
  }

  .v-list__group__header__append-icon .v-icon {
    font-size: 16px;
  }

  .v-list__group__header--active .v-list__group__header__append-icon .v-icon {
    transform: rotate(360deg);
  }

  .v-list__group__header__append-icon .v-icon {
    transform: rotate(270deg);
  }

  .v-list__group--active:after,
  .v-list__group--active:before {
    background-color: transparent !important;
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 51px !important;
  }

  .v-list__tile__title {
    font-weight: 500;
    font-size: 13px;
  }
}
</style>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

$lhs-background-color: #297fb8;
$lhs-text: rgba(255, 255, 255, 0.75);
$lhs-active-group-backgound-color: #26a69a;

.lhs {
  display: flex;
  flex-flow: column;
  align-items: center;
  a {
    text-decoration: none;
  }
  background-color: $lhs-background-color;
  font-weight: 500;
}

.lhs-header {
  height: 30px;
}
</style>
