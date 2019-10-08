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

export function addPopupBackgroundShadow(shadowClassName) {
  if (shadowClassName === 'application--wrap') {
    addBackgroundShadow();
    return;
  }

  const shadowClass = `.${shadowClassName}`;
  const elementShadow = document.querySelector(shadowClass);
  if (elementShadow) {
    elementShadow.classList.add('shadow-overlay');
  }
}

export function removePopupBackgroundShadow(shadowClassName) {
  if (shadowClassName === 'application--wrap') {
    removeBackgroundShadow();
    return;
  }

  const shadowClass = `.${shadowClassName}`;
  const elementShadow = document.querySelector(shadowClass);
  if (elementShadow) {
    elementShadow.classList.remove('shadow-overlay');
  }
}
