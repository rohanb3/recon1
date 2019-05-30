<template>
  <v-container fluid class="disput-statistic">
    <v-layout row>
      <v-flex>
        <p class="table-name">Total Disputes Statistic</p>
      </v-flex>
    </v-layout>
    <v-layout class="statistic" fluid>
      <div class="table-wrapper">
        <div class="table-header">
          <v-layout row>
            <v-flex>Total Disputes</v-flex>
            <v-flex>
              <div class="label">Total quantity</div>
              <p>80</p>
            </v-flex>
            <v-flex>
              <div>Percentage</div>
              <p>80%</p>
            </v-flex>
            <v-flex>
              <div>Total comission difference</div>
              <p>1200</p>
            </v-flex>
          </v-layout>
        </div>
        <div class="table-body">
          <v-layout row>
            <v-flex> <span class="mark-status green"></span> Waited Spectrum answer </v-flex>
            <v-flex>80</v-flex>
            <v-flex>80%</v-flex>
            <v-flex>1200</v-flex>
          </v-layout>
          <v-layout row>
            <v-flex> <span class="mark-status blue"></span> Waited Spectrum answer </v-flex>
            <v-flex>80</v-flex>
            <v-flex>80%</v-flex>
            <v-flex>1200</v-flex>
          </v-layout>
        </div>
      </div>
      <div class="pie-chart"></div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'DisputStatistic',
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.disput-statistic {
  @include table-base-container;

  background-color: #fff;
  margin-top: 30px;
  padding: 12px 20px;

  .table-name {
    font-size: 14px;
    color: $table-statistic-header-color;
  }
}

.statistic {
  border: 2px solid $table-statistic-border-color;
  border-radius: 4px;
  margin: 3px 0 17px;
}

.table-wrapper {
  padding: 0 26px 0 26px;
  flex-grow: 1;
}

.table-header {
  .flex {
    align-self: flex-end;
    color: $table-statistic-header-color;
    font-size: 14px;
    font-weight: bold;

    & > div {
      color: $table-statistic-subtitle-color;
      font-size: 10px;
    }

    &:not(:first-child) {
      border-left: 1px solid $table-statistic-separator-color;
      border-right: 1px solid $table-statistic-separator-color;
      text-align: center;
      width: 20%;
    }

    &:first-child {
      font-weight: bold;
      width: 30%;
    }
  }
}

.table-body {
  .flex {
    color: $table-statistic-body-color;
    font-size: 14px;
    padding: 8px 0;

    &:not(:first-child) {
      border-left: 1px solid $table-statistic-separator-color;
      border-right: 1px solid $table-statistic-separator-color;
      text-align: center;
      width: 20%;
    }
    &:first-child {
      width: 30%;
    }

    .mark-status {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.green {
        background: $base-green;
      }

      &.orange {
        background: $base-orange;
      }

      &.blue {
        background: $base-blue;
      }

      &.grey {
        background: $table-disabled-row-color;
      }
    }
  }
}

.pie-chart {
  width: 250px;
}
</style>
