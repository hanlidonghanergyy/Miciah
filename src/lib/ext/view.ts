import browser from "webextension-polyfill";
import memoizeOne from "memoize-one";

export const isPopup = memoizeOne(
  () =>
    isPopupWindow() ||
    location.pathname.includes("popup.html") ||
    location.pathname.includes("sidepanel.html"),
);

export const isPopupWindow = memoizeOne(() => {
  const popups = browser.extension.getViews({ type: "popup" });
  return popups.includes(window);
});
