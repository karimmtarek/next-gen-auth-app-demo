document.addEventListener('DOMContentLoaded', () => {
  var data = document.getElementById('shopify-app-init').dataset;
  var AppBridge = window['app-bridge'];
  var createApp = AppBridge.default;
  window.app = createApp({
    apiKey: data.apiKey,
    shopOrigin: data.shopOrigin
  });
  window.shop = data.shopOrigin

  var actions = AppBridge.actions;
  var TitleBar = actions.TitleBar;
  TitleBar.create(window.app, {
    title: data.page
  });
});
