import browser from "webextension-polyfill";

import { isPopup } from "lib/ext/view";
import { getMainURL } from "lib/ext/utils";
import { Destination, toHash, navigate } from "lib/navigation";

export async function isSidePanelEnalbed() {
  try {
    const current = await chrome.sidePanel.getPanelBehavior();

    return current.openPanelOnActionClick;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function toggleSidePanel() {
  try {
    const enabled = await isSidePanelEnalbed();

    if (!enabled) {
      await chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: true,
      });

      const currentWindow = await browser.windows.getCurrent();
      await chrome.sidePanel.open({ windowId: currentWindow.id! });

      window.close();
    } else {
      await chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: false,
      });

      const currentWindow = await browser.windows.getCurrent();
      await chrome.action.openPopup({ windowId: currentWindow.id! });

      window.close();

      // await new Promise((r) => setTimeout(r, 1000));
    }
  } catch (err) {
    console.error(err);
    alert(
      "Failed to toggle side panel - browser doesnt support it or permission not granted",
    );
  }
}

export async function openInTab(to?: Destination, merge?: boolean | string[]) {
  if (!isPopup()) {
    if (to) navigate(to);
    return;
  }

  return openInTabStrict(to, merge);
}

export async function openInTabStrict(
  to?: Destination,
  merge?: boolean | string[],
  anotherWindow = false,
) {
  try {
    const mainTabs = await browser.tabs.query({
      currentWindow: !anotherWindow,
      url: getMainURL("**"),
    });

    if (mainTabs.length > 0) {
      const tab = mainTabs[0];

      const tabHash = tab.url && new URL(tab.url).hash.slice(1);
      const tabUsp = tabHash && new URLSearchParams(tabHash);
      const newTabHash = tabUsp && toHash(to ?? {}, merge, tabUsp);
      const newTabUrl = getMainURL(`#${newTabHash ?? ""}`);

      browser.tabs.update(
        tab.id,
        tab.url === newTabUrl
          ? { active: true }
          : { url: newTabUrl, active: true },
      );
    } else {
      const currentTabs = !anotherWindow
        ? await browser.tabs.query({
            currentWindow: true,
            active: true,
          })
        : [];

      const hash = to && toHash(to);
      const url = getMainURL(`#${hash ?? ""}`);

      if (
        currentTabs.length > 0 &&
        currentTabs[0].url &&
        (currentTabs[0].url.includes("://newtab") ||
          currentTabs[0].url.includes("://startpageshared"))
      ) {
        const tab = currentTabs[0];
        browser.tabs.update(
          tab.id,
          tab.url === url ? { active: true } : { url, active: true },
        );
      } else {
        browser.tabs.create({ url, active: true });
      }
    }
  } catch (err) {
    console.error(err);
  }

  if (!anotherWindow) {
    window.close();
  }
}
