import { get, post } from "../utils/main";
import {
    getGjjDetailDataByYear,
    getGjjStatDataByYear,
    getGjjBasicInfo,
} from "../utils/api/viewTool";
import "./index.scss";

const TDetailInfoMap = [
"name",
"zjlx",
"zjhm",
"dwmc",
"grzhye",
"jczt"];
const TInfoGjjMap = [
  "name",
  "dwmc",
  "zjhm",
  "jczt",
  "grzhye",
  "grjcjs"
];
const handleRefreshEvent = () => {
  document
    .getElementById("refresh")
    .addEventListener("tap", async function (e) {
      window.location = `${document.location.protocol}//${
        window.location.host
      }${"/sbinfo/querySbData.php?type=gjj&refresh=1"}`;
    });
};
const handleUserEvent = () => {
  document.getElementById("toUser").addEventListener("tap", async function (e) {
    mui("#content-box")[0].classList.add("hidden");
    document.getElementById("user-info").style = "display:block;";
  });
  document.getElementById("back").addEventListener("tap", async function (e) {
    document.getElementById("user-info").style = "display:none;";
    mui("#content-box")[0].classList.remove("hidden");
  })
  document.getElementById("viewMonth").addEventListener("tap", async function (e) {
    window.location = `${document.location.protocol}//${
        window.location.host
      }${"/GjjViewDateList/index.html"}`;
  })
};
const getGjjBasicInfoFunc = async () => {
  const { code, data } = await get(getGjjBasicInfo);
  if (code == 200) {
    const {
        TInfoGongjijin,
        monthCount
    } = data;
    TDetailInfoMap.forEach((item) => {
      document.querySelector('.'+item).innerHTML = TInfoGongjijin?.[item + ""];
    });
    TInfoGjjMap.forEach((item) => {
        document.getElementById(item).innerHTML = TInfoGongjijin?.[item + ""] || '-';
      });
    document.getElementById("monthCount").innerHTML = `${monthCount}个月`;
  }
};
const init = () => {
  handleRefreshEvent();
  handleUserEvent();
  getGjjBasicInfoFunc();
};
init();
