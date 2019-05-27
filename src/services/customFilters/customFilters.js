import between, { OPERATOR_NAME as BETWEEN } from './operators/between';

export const OPERATORS = {
  BETWEEN,
};

const rangeFilters = new Map();
rangeFilters.set(OPERATORS.BETWEEN, between);

const filters = {
  range: rangeFilters,
};

export default filters;
