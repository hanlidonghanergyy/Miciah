import browser, { Tabs } from "webextension-polyfill";

export function getExtensionTabs() {
  return browser.tabs.query({
    currentWindow: true,
    url: browser.runtime.getURL("**"),
  });
}

export async function getActiveTab() {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs.length > 0 ? tabs[0] : null;
}

export function onActiveTabChanged(callback: (tab: Tabs.Tab) => void) {
  const currentWindowPromise = browser.windows.getCurrent();
  currentWindowPromise.catch(console.error);

  let activeTabId: number | null = null;

  const handleActivated = (activeInfo: Tabs.OnActivatedActiveInfoType) => {
    currentWindowPromise.then((currentWindow) => {
      if (activeInfo.windowId === currentWindow.id) {
        activeTabId = activeInfo.tabId;
        browser.tabs.get(activeInfo.tabId).then(callback).catch(console.error);
      }
    });
  };

  const handleUpdated = (
    tabId: number,
    changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
    tab: browser.Tabs.Tab,
  ) => {
    if (!activeTabId || activeTabId !== tabId) return;

    if (changeInfo.url || changeInfo.favIconUrl) {
      callback(tab);
    }
  };

  browser.tabs.onActivated.addListener(handleActivated);
  browser.tabs.onUpdated.addListener(handleUpdated);

  return () => {
    browser.tabs.onActivated.removeListener(handleActivated);
    browser.tabs.onUpdated.removeListener(handleUpdated);
  };
}
