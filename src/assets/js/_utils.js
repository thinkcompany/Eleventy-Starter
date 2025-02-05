export const executeWhenReady = (func) => {
  if (document.readyState !== "loading") {
    func();
  } else {
    document.addEventListener("DOMContentLoaded", func);
  }
};