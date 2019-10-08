export function addBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.add('blurred');
  }
}

export function removeBackgroundBlur() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.remove('blurred');
  }
}

export function addBackgroundShadow() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.add('shadow-overlay');
  }
}

export function removeBackgroundShadow() {
  const applicationWrap = document.querySelector('.application--wrap');
  if (applicationWrap) {
    applicationWrap.classList.remove('shadow-overlay');
  }
}

export function addPopupBackgroundShadow() {
  const disputeHistory = document.querySelector('.dispute-history');
  if (disputeHistory) {
    disputeHistory.classList.add('shadow-overlay');
  } else {
    addBackgroundShadow();
  }
}

export function removePopupBackgroundShadow() {
  const disputeHistory = document.querySelector('.dispute-history');
  if (disputeHistory) {
    disputeHistory.classList.remove('shadow-overlay');
  } else {
    removeBackgroundShadow();
  }
}
