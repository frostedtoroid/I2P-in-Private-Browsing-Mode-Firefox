var titlepref = chrome.i18n.getMessage("titlePreface");
var titleprefpriv = chrome.i18n.getMessage("titlePrefacePrivate");
var webpref = chrome.i18n.getMessage("webPreface");
var webprefpriv = chrome.i18n.getMessage("webPrefacePrivate");
var routerpref = chrome.i18n.getMessage("routerPreface");
var routerprefpriv = chrome.i18n.getMessage("routerPrefacePrivate");
var mailpref = chrome.i18n.getMessage("mailPreface");
var mailprefpriv = chrome.i18n.getMessage("mailPrefacePrivate");
var torrentpref = chrome.i18n.getMessage("torrentPreface");
var torrentprefpriv = chrome.i18n.getMessage("torrentPrefacePrivate");
var tunnelpref = chrome.i18n.getMessage("i2ptunnelPreface");
var tunnelprefpriv = chrome.i18n.getMessage("i2ptunnelPrefacePrivate");
var localpref = chrome.i18n.getMessage("localPreface");
var localprefpriv = chrome.i18n.getMessage("localPrefacePrivate");

function onContextsGot(contexts) {
  var ids = [];
  for (let context of contexts) {
    console.log(`Name: ${context.name}`);
    ids.push(context.name);
  }
  console.log("Checking new contexts");
  if (ids.indexOf(titlepref) == -1) {
    browser.contextualIdentities
      .create({
        name: titlepref,
        color: "orange",
        icon: "fingerprint"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(webpref) == -1) {
    browser.contextualIdentities
      .create({
        name: webpref,
        color: "red",
        icon: "circle"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(routerpref) == -1) {
    browser.contextualIdentities
      .create({
        name: routerpref,
        color: "blue",
        icon: "briefcase"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(tunnelpref) == -1) {
    browser.contextualIdentities
      .create({
        name: tunnelpref,
        color: "green",
        icon: "tree"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(mailpref) == -1) {
    browser.contextualIdentities
      .create({
        name: mailpref,
        color: "yellow",
        icon: "briefcase"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(torrentpref) == -1) {
    browser.contextualIdentities
      .create({
        name: torrentpref,
        color: "purple",
        icon: "chill"
      })
      .then(onCreated, onNotCreated);
  }
  if (ids.indexOf(localpref) == -1) {
    browser.contextualIdentities
      .create({
        name: localpref,
        color: "red",
        icon: "fence"
      })
      .then(onCreated, onNotCreated);
  }
}

function onContextsError() {
  console.log("Error finding contextual identities, is the API enabled?");
}

function onCreated(context) {
  console.log(`New identity's ID: ${context.cookieStoreId}.`);
}

function onNotCreated(context) {
  console.log(`identity ID: ${context.cookieStoreId} not created`);
}

browser.contextualIdentities.query({}).then(onContextsGot, onContextsError);

var gettingInfo = browser.runtime.getPlatformInfo();
gettingInfo.then(got => {
  if (got.os != "android") {
    browser.windows.onCreated.addListener(themeWindow);
    browser.windows.onFocusChanged.addListener(themeWindow);
    browser.windows.onRemoved.addListener(themeWindow);
    browser.tabs.onUpdated.addListener(themeWindowByTab);
    browser.tabs.onActivated.addListener(themeWindowByTab);
  }
});

function themeWindowByTab(tabId) {
  function tabWindow(tab) {
    var gettingPlatformInfo = browser.runtime.getPlatformInfo();
    gettingPlatformInfo.then(got => {
      if (got.os == "android") {
        let getwindow = browser.tabs.get(tab.tabId);
        getwindow.then(themeWindow);
      } else {
        let getwindow = browser.windows.get(tab.windowId);
        getwindow.then(themeWindow);
      }
    });
  }
  if (typeof tabId === "number") {
    let tab = browser.tabs.get(tabId);
    tab.then(tabWindow);
  } else {
    tabWindow(tabId);
  }
}

function isEmpty(obj) {
  if (obj === undefined || obj === null) {
    return true;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

var oldtheme = null;

var getOldTheme = async function getOldTheme() {
  let foundtheme = await browser.theme.getCurrent();
  if (!isEmpty(foundtheme)) {
    oldtheme = foundtheme;
    console.log("Found old theme", oldtheme);
  }
  return oldtheme;
};

getOldTheme();

function themeWindow(window) {
  // Check if the window is in private browsing
  function onThemeError() {
    console.log("got theme", oldtheme);
    browser.theme.update(oldtheme);
  }
  function logTabs(tabInfo) {
    function onContextGotTheme(context) {
      if (context.name == titlepref) {
        console.log("Active in I2P window");
        if (window.incognito) {
          browser.theme.update(window.id, {
            colors: {
              frame: "#FFC56D",
              toolbar: "#FFC56D"
            }
          });
        } else {
          browser.theme.update(window.id, {
            colors: {
              frame: "#FFC56D",
              toolbar: "#FFC56D"
            }
          });
        }
      } else if (context.name == routerpref) {
        console.log("Active in Router Console window");
        if (window.incognito) {
          browser.theme.update(window.id, {
            colors: {
              frame: "#A4C8E1",
              toolbar: "#A4C8E1"
            }
          });
        } else {
          browser.theme.update(window.id, {
            colors: {
              frame: "#A4C8E1",
              toolbar: "#A4C8E1"
            }
          });
        }
      } else if (context.name == tunnelpref) {
        console.log("Active in Hidden Services Manager window");
        if (window.incognito) {
          browser.theme.update(window.id, {
            colors: {
              frame: "#D9D9D6",
              toolbar: "#D9D9D6"
            }
          });
        } else {
          browser.theme.update(window.id, {
            colors: {
              frame: "#D9D9D6",
              toolbar: "#D9D9D6"
            }
          });
        }
      } else if (context.name == mailpref) {
        console.log("Active in Web Mail window");
        if (window.incognito) {
          browser.theme.update(window.id, {
            colors: {
              frame: "#F7E59A",
              toolbar: "#F7E59A"
            }
          });
        } else {
          browser.theme.update(window.id, {
            colors: {
              frame: "#F7E59A",
              toolbar: "#F7E59A"
            }
          });
        }
      } else if (context.name == torrentpref) {
        console.log("Active in Bittorrent window");
        if (window.incognito) {
          browser.theme.update(window.id, {
            colors: {
              frame: "#A48FE1",
              toolbar: "#A48FE1"
            }
          });
        } else {
          browser.theme.update(window.id, {
            colors: {
              frame: "#A48FE1",
              toolbar: "#A48FE1"
            }
          });
        }
      } else {
        console.log("Not active in I2P window");
        if (isEmpty(oldtheme)) {
          browser.theme.reset();
        } else {
          browser.theme.update(window.id, oldtheme);
        }
      }
    }
    if (
      tabInfo[0].cookieStoreId != "firefox-default" &&
      tabInfo[0].cookieStoreId != "firefox-private"
    ) {
      browser.contextualIdentities
        .get(tabInfo[0].cookieStoreId)
        .then(onContextGotTheme, onThemeError);
    } else if (isEmpty(oldtheme)) {
      browser.theme.reset();
    } else {
      browser.theme.update(window.id, oldtheme);
    }
  }

  var querying = browser.tabs.query({
    currentWindow: true,
    active: true
  });
  querying.then(logTabs, onThemeError);
}

function setTitle(window) {
  // Check if the window is in private browsing
  function onContextError() {
    console.log("Context Error");
  }
  function logTabs(tabInfo) {
    function onContextGotTitle(context) {
      if (context.name == titlepref) {
        console.log("Active in I2P window");

        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: titleprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: titlepref + ": "
          });
        }
      } else if (context.name == webpref) {
        console.log("Active in Web window");
        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: webprefpriv + " - "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: webpref + " - "
          });
        }
      } else if (context.name == routerpref) {
        console.log("Active in Router Console window");
        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: titleprefpriv + " - " + routerprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: titlepref + " - " + routerpref + ": "
          });
        }
      } else if (context.name == tunnelpref) {
        console.log("Active in Hidden Services Manager window");

        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: titleprefpriv + " - " + tunnelprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: titlepref + " - " + tunnelpref + ": "
          });
        }
      } else if (context.name == mailpref) {
        console.log("Active in I2P Web Mail window");

        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: titleprefpriv + " - " + mailprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: titlepref + " - " + mailpref + ": "
          });
        }
      } else if (context.name == torrentpref) {
        console.log("Active in I2P Torrent window");

        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: titleprefpriv + " - " + torrentprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: titlepref + " - " + torrentpref + ": "
          });
        }
      } else if (context.name == localpref) {
        console.log("Active in Localhost window");

        if (window.incognito) {
          browser.windows.update(window.id, {
            titlePreface: localprefpriv + " - " + localprefpriv + ": "
          });
        } else {
          browser.windows.update(window.id, {
            titlePreface: localpref + " - " + localpref + ": "
          });
        }
      }
    }

    if (
      tabInfo[0].cookieStoreId != "firefox-default" &&
      tabInfo[0].cookieStoreId != "firefox-private"
    ) {
      browser.contextualIdentities
        .get(tabInfo[0].cookieStoreId)
        .then(onContextGotTitle, onContextError);
    } else if (window.incognito) {
      browser.windows.update(window.id, {
        titlePreface: ""
      });
    } else {
      browser.windows.update(window.id, {
        titlePreface: ""
      });
    }
  }

  var querying = browser.tabs.query({
    currentWindow: true,
    active: true
  });
  querying.then(logTabs, onContextError);
}

var gettingListenerInfo = browser.runtime.getPlatformInfo();
gettingListenerInfo.then(got => {
  function onPlatformError() {
    console.log("Error finding platform info");
  }
  if (got.os != "android") {
    browser.windows.onCreated.addListener(() => {
      chrome.storage.local.get(function() {
        setupProxy();
      });
    });
    browser.tabs.onCreated.addListener(() => {
      var getting = browser.windows.getCurrent({
        populate: true
      });
      getting.then(setTitle, onPlatformError);
    });
    browser.tabs.onActivated.addListener(() => {
      var getting = browser.windows.getCurrent({
        populate: true
      });
      getting.then(setTitle, onPlatformError);
    });
  }
});
/*
var gettingInfo = browser.runtime.getPlatformInfo();
gettingInfo.then(got => {
  if (got.os != "android") {
    browser.tabs.onCreated.addListener(() => {
      var getting = browser.windows.getCurrent({
        populate: true
      });
      getting.then(setTitle, onError);
    });
  }
});
var gettingInfo = browser.runtime.getPlatformInfo();
gettingInfo.then(got => {
  if (got.os != "android") {
    browser.tabs.onActivated.addListener(() => {
      var getting = browser.windows.getCurrent({
        populate: true
      });
      getting.then(setTitle, onError);
    });
  }
});
*/
function handleUpdated(updateInfo) {
  if (updateInfo.theme) {
    console.log(`Theme was applied: ${updateInfo.theme}`);
  } else {
    console.log("Theme was removed");
  }
}

browser.theme.onUpdated.addListener(handleUpdated);
