import { GetRequest } from "../utils/tool";
import { get, post } from "../utils/main";
import { getSolution,calSbData,getRandomCompany } from "../utils/api/createOrder";
import { getUserInfo } from '../utils/api/personal';
import "../utils/main";
import { wage, month } from "./config";
import "./index.scss";
const configData = {};
const calculateData = {
  baseSalary: null,
  startMonth: null,
  addSb: true,
  sbIsNew: true,
  addGjj: true,
  gjjIsNew: true,
  addSalary: true,
};
const getUserInfoFunc = async()=>{
    const { code, data } = await get(getUserInfo);
    if(code === 200){
        const {userName,userHouseHold,useIdCard} = data
        document.getElementById('userName').innerHTML=userName;
        document.getElementById('useIdCard').innerHTML=useIdCard;
        document.getElementById('userHouseHold').innerHTML=userHouseHold;
    }
}
const getRandomCompanyFunc = async()=>{
    const { city } = GetRequest();
    const { code, data } = await get(getRandomCompany,{
        // city
    });
    if(code === 200){
        const {cityName,corpName} = data
        document.getElementById('cityName').innerHTML=cityName;
        document.getElementById('corpName').innerHTML=corpName;
    }
}
const calSbDataFunc = async() =>{
    [...document.querySelectorAll('.seleted-checkbox')].forEach((item)=>{
        calculateData[item.name] = item.checked
    })
    const { code, data } = await post(calSbData,{
        ...calculateData,
        baseSalary:configData.wage,
        startMonth:configData.startMonth,
    });
    if (code === 200) {
        //跳转
      }
}
const getSolutionFunc = async () => {
  const { code, data } = await get(getSolution);
  console.log(code, data);
  if (code === 200) {
    //
    document.querySelector('.create-order-seleted').style="display:block;"
    initSwitchFunc();
  }
};
const initPicker = (buttonId, resultId, data) => {
  let picker = new mui.PopPicker();
  picker.setData(data);
  picker.pickers[0].setSelectedValue("fourth", 2000);
  let showUserPickerButton = document.getElementById(buttonId);
  let result = document.getElementById(resultId);
  showUserPickerButton.addEventListener(
    "tap",
    function (event) {
      picker.show(function (items) {
        result.innerText = items[0];
        configData[resultId] = items[0];
        if (configData["month"] && configData["wage"]) {
          getSolutionFunc();
        }
        //return false;
      });
    },
    false
  );
};
const initSwitchFunc = () => {
  document
    .getElementById("shebao-switch")
    .addEventListener("toggle", function (event) {
      if (event.detail.isActive) {
        console.log("你启动了开关");
      } else {
        console.log("你关闭了开关");
      }
    });
  document
    .getElementById("gongjijin-switch")
    .addEventListener("toggle", function (event) {
      if (event.detail.isActive) {
        console.log("你启动了开关");
      } else {
        console.log("你关闭了开关");
      }
    });
    document
    .getElementById("calculate-btn")
    .addEventListener("tap", function (event) {
        calSbDataFunc();
    });
    
};
const initCreateOrder = () => {
    getUserInfoFunc();
  getRandomCompanyFunc();
  initPicker("paymonth", "month", month);
  initPicker("paywage", "wage", wage);
  //initSwitchFunc();
};
initCreateOrder();
