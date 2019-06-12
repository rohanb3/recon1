import { DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES } from '@/constants';

export default data => {
  const byApprove = data.find(
    item => item.topBy === DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES.BY_APPROVE
  );
  const byRejection = data.find(
    item => item.topBy === DISPUTES_BY_SUBMITTERS_STATISTICS_TYPES.BY_REJECTION
  );

  return {
    byApprove,
    byRejection,
  };
};
