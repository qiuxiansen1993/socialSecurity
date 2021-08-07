import "../utils/main"
import './index.scss';
document.getElementById("view-order").addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/PayCost/index.html`
  });
document.getElementById("updata-indo").addEventListener("tap", function () {
    window.location = `${document.location.protocol}//${window.location.host}/MyInfo/index.html?back=Home`
});
  