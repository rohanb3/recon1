/* eslint-disable no-param-reassign */
const SHIFT_TOOLTIP = 15;

function isShowTooltipBeforeCursor(x, offsetWidth) {
  return x + SHIFT_TOOLTIP + offsetWidth > window.innerWidth;
}

const tooltip = (el, { value: { x, y } }) => {
  el.style.top = `${y + SHIFT_TOOLTIP}px`;

  if (isShowTooltipBeforeCursor(x, el.offsetWidth)) {
    el.style.left = `${x - el.offsetWidth}px`;
  } else {
    el.style.left = `${x + SHIFT_TOOLTIP}px`;
  }
};

export default tooltip;
