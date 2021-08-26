import { get, post } from "../utils/main";
import {
  getSbDetailDataByMonth,
  getSbDetailDataByYear,
  getSbStartEndMonth,
  getSbBasicInfo,
} from "../utils/api/viewTool";
import "./index.scss";
const VSbSumDataMap = ["yanglao", "yiliao"];
const TDetailYangLaoMap = ["type", "month", "base", "companyName"];
const TInfoShebaoMap = [
  "name",
  "gender",
  "idNumber",
  "ddyljg1",
  "ddyljg2",
  "ddyljg3",
  "ddyljg4",
  "ddyljg5",
  "companyInfo",
];
const handleRefreshEvent = () => {
  document
    .getElementById("refresh")
    .addEventListener("tap", async function (e) {
      window.location = `${document.location.protocol}//${
        window.location.host
      }${"/sbinfo/querySbData.php?type=sb&refresh=1"}`;
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
      }${"/SbViewDateList/index.html"}`;
  })
};
const getSbBasicInfoFunc = async () => {
  mui.showLoading("正在提交..","div");
  const { code, data } = await get(getSbBasicInfo);
  mui.hideLoading();
  if (code == 200) {
    const {
      TInfoShebao,
      monthCount,
      VSbSumData,
      TDetailYangLao,
    } = data;
    VSbSumDataMap.forEach((item) => {
      document.getElementById(item).innerHTML = VSbSumData?.[item + ""];
    });
    
    TDetailYangLaoMap.forEach((item) => {
      document.getElementById(item).innerHTML = TDetailYangLao?.[item + ""];
    });
    TInfoShebaoMap.forEach((item) => {
        document.getElementById(item).innerHTML = TInfoShebao?.[item + ""] || '-';
      });
    document.getElementById("userInfo").innerHTML = `${TInfoShebao.name} (${TInfoShebao.idNumber})`;
    document.getElementById("monthCount").innerHTML = `${monthCount}个月`;
  }
};
const init = () => {
  handleRefreshEvent();
  handleUserEvent();
  getSbBasicInfoFunc();
};
init();
