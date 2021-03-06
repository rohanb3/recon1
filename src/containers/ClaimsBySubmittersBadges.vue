<template>
  <div class="disputes-by-submitters-badges">
    <top-submitter-by-approve-rate :data="byApprove" />
    <top-submitter-by-rejection-rate :data="byRejection" />
  </div>
</template>

<script>
import badgeLoadData from '@/mixins/badgeLoadData';

import { TABLE_NAMES } from '@/constants';

import { getClaimsStatistics } from '@/services/disputesRepository';
import transformDataFromResponse from '@/services/disputesBySubmitters/transformDataFromResponse';
import { errorMessage } from '@/services/notifications';

import TopSubmitterByRejectionRate from '@/components/tableBadges/TopSubmitterByRejectionRate';
import TopSubmitterByApproveRate from '@/components/tableBadges/TopSubmitterByApproveRate';

export default {
  name: 'ClaimsBySubmittersBadges',
  mixins: [badgeLoadData],
  components: {
    TopSubmitterByRejectionRate,
    TopSubmitterByApproveRate,
  },
  data() {
    return {
      tableName: TABLE_NAMES.CLAIMS_BY_SUBMITTERS,
      statistics: {},
    };
  },
  computed: {
    byApprove() {
      return this.statistics.byApprove || {};
    },
    byRejection() {
      return this.statistics.byRejection || {};
    },
  },
  methods: {
    async loadData(filters) {
      try {
        const response = await getClaimsStatistics(filters);
        this.statistics = transformDataFromResponse(response);
      } catch (e) {
        errorMessage();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.disputes-by-submitters-badges {
  margin: 0 13px 10px;
  display: flex;
  align-items: center;
  .disputes-by-submitters-badge /deep/ {
    margin-right: 22px;
    padding: 2px 8px 3px 6px;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-radius: 4px;
    color: #1657a8;
    .block {
      &:not(:last-child) {
        padding-right: 11px;
        border-right: 2px solid rgba(22, 87, 168, 0.2);
      }
      &:not(:first-child) {
        padding-left: 9px;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    .title-block {
      width: 105px;
    }
    .name-block {
      max-width: 250px;
      min-width: 88px;
      text-align: center;
    }
    .percent-block {
      max-width: 65px;
      min-width: 33px;
      font-size: 24px;
      font-weight: 500;
      &-empty {
        font-weight: 400;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
