import { get, post } from "../utils/main";
import {
  getSbDetailDataByMonth,
  getSbDetailDataByYear,
  getSbStartEndMonth,
  getSbBasicInfo,
} from "../utils/api/viewTool";
import "./index.scss";
const VSbSumDataMap = ["yanglao", "yiliao"];
const TDetailYangLaoMap = ['type', 'month', 'base', 'companyName']
const handleRefreshEvent = () => {
  document
    .getElementById("refresh")
    .addEventListener("tap", async function (e) {
      window.location = `${document.location.protocol}//${
        window.location.host
      }${"/sbinfo/querySbData.php?refresh=1"}`;
    });
};
const handleUserEvent = ()=>{
    document
    .getElementById("toUser")
    .addEventListener("tap", async function (e) {
      mui('#content-box')[0].classList.add('hidden');
      document.getElementById("user-info").style = 'display:block;'
    });
}
const getSbBasicInfoFunc = async () => {
  const { code, data } = await get(getSbBasicInfo);
  if (code == 200) {
    const {
      TInfoShebao: { name, idNumber },
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
    document.getElementById("userInfo").innerHTML = `${name} (${idNumber})`;
    document.getElementById("monthCount").innerHTML = `${monthCount}个月`;
    
  }
};
const init = () => {
  handleRefreshEvent();
  handleUserEvent();
  getSbBasicInfoFunc();
};
init();
