export const executeWhenReady = (func) => {
  if (document.readyState !== "loading") {
    func();
  } else {
    document.addEventListener("DOMContentLoaded", func);
  }
};

export const updateQueryString = (key, value) => {
  const baseUrl = window.location.protocol + "//" + window.location.host;
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.set(key, value);

  window.history.replaceState(
    {},
    "",
    `${baseUrl}${url.pathname}?${params.toString()}`
  );
};

export const removeQueryString = (key) => {
  const baseUrl = window.location.protocol + "//" + window.location.host;
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  let hasParams = true;

  params.delete(key);

  if (params.keys().next().done) {
    hasParams = false;
  }

  window.history.replaceState(
    {},
    "",
    `${baseUrl}${url.pathname}${hasParams ? `?` : ''}${params.toString()}`
  );
}

export const modalFocusTrap = (containerElement) => {
  const focusableElements = containerElement.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  containerElement.addEventListener('keydown', (event) => {
    const isTabPressed = event.key === 'Tab' || event.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}