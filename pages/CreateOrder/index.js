import { GetRequest } from "../utils/tool";
import { get, post } from "../utils/main";
import {
  getSolution,
  calSbData,
  getRandomCompany,
  getFeeInfo,
  submitOrder,
  getSalaryMonthList
} from "../utils/api/createOrder";
import { getUserInfo } from "../utils/api/personal";
import "../utils/main";
// import { wage, month } from "./config";
import "./index.scss";
const configData = {};
const calculateData = {
  addSb: true,
  sbIsNew: true,
  addGjj: true,
  gjjIsNew: true,
  addSalary: true,
};
let FeeInfo = [];
let CalSbDataInfo = {};
let canSelectWage = true;
let serverCostIdx = 0;
let mainTotleCost = 0;// 社保+公积金+工资总数
const getUserInfoFunc = async () => {
  const { code, data } = await get(getUserInfo);
  if (code === 200) {
    const { userName, userHouseHold, userIdCard } = data.userInfo;
    document.getElementById("userName").innerHTML = userName;
    document.getElementById("userIdCard").innerHTML = userIdCard;
    document.getElementById("userHouseHold").innerHTML = userHouseHold;
  }
};
const getRandomCompanyFunc = async () => {
  const { city } = GetRequest();
  const { code, data } = await get(getRandomCompany, {
    city
  });
  if (code === 200) {
    const { cityName, corpName } = data;
    document.getElementById("cityName").innerHTML = cityName || "";
    document.getElementById("corpName").innerHTML = corpName || "";
  }
};
const getFeeInfoFunc = () => {
  return new Promise(async (resove, reject) => {
    const { code, data } = await post(getFeeInfo, {});
    if (code === 200) {
      resove(data);
      document.getElementById("service-charge-info").innerHTML = data[0]?.sum;
      FeeInfo = data;
    } else {
      reject(null);
    }
  });
};
const calSbDataFunc = async () => {
  const _seletedCheckbox = document.querySelectorAll(".seleted-checkbox");
  [..._seletedCheckbox].forEach((item) => {
    calculateData[item.name] = item.checked;
  });
  const { code, data,msg } = await post(calSbData, {
    ...calculateData,
  });
  const feeData = await getFeeInfoFunc();
  if (code === 200) {
    //跳转
    canSelectWage = false;
    document.querySelector(".create-order-seleted").style = "display:none;";
    document.querySelector(".submit-content").style = "display:block;";
    // 展示
    CalSbDataInfo = data
    const { sb ={}, gjj = {}, salary = {} } = data;

    mainTotleCost = Number(salary?.total||0) + Number(gjj?.total||0) + Number(sb?.total||0)
    document.getElementById("sb-cost").innerHTML = sb?.total || '-';
    document.getElementById("gjj-cost").innerHTML = gjj?.total || '-';
    document.getElementById("salary-cost").innerHTML = salary?.total || '-';
    document.getElementById("totle-cost").innerHTML =
    mainTotleCost + (feeData?.[0]?.sum || 0);
      initSubmitEvent();
  }else{
    mui.toast(msg||'请求异常，请稍后重试');
  }
};
const renderServerChargeLi = ()=>{
  const render = FeeInfo.map((item,index)=>{
    return `<li data-id="${item.id}" data-sum="${item.sum}" data-idx="${index}" class="mui-table-view-cell ${index===Number(serverCostIdx)&&'mui-selected'}"><a class="mui-navigate-right"><div style="display:flex;justify-content: space-between;"><div style="text-align:left;"><span>${item.title}</span><p>${item.fromM2M}</p></div><div><span style="color:lightcoral;">${item.sum}元</span></div></div></a></li>`
  }).join('')
  return render
}
const initSubmitEvent = async() => {
  document
    .querySelector(".cost-view")
    .addEventListener("tap", function (event) {
      mui.alert(`
    <div style="text-align:left;">
    <p style="font-size:16px;text-align:center;">业务办理说明</p>
    <p>1、五险一金需同时缴纳</p>
    <p>2、请上传有效的身份证反正面</p>
    <p>3、如有问题请致电我们</p>
    </div>
    `);
    });
  document
    .getElementById("service-charge")
    .addEventListener("tap", function (event) {
      mui.confirm(`
      <ul class="mui-table-view mui-table-view-radio service-charge-sel">${renderServerChargeLi()}</ul>
    `);
    var list = document.querySelector('.mui-table-view.mui-table-view-radio');
    list.addEventListener('selected',function(e){
      serverCostIdx = e.detail.el.getAttribute('data-idx')
      document.getElementById("totle-cost").innerHTML = mainTotleCost+Number(e.detail.el.getAttribute('data-sum'))
    }); 
    });
    document
    .getElementById("submit-btn-click").addEventListener("tap", async function (event) {
      const { code,msg } = await post(submitOrder,{
        feeType:FeeInfo?.[serverCostIdx]?.id,
        otherinfo:''
      });
      if (code === 200) {
        mui.toast(msg || '提交成功~');
      }else{
        mui.toast('提交失败，请稍后重试！');
      }
    });
    document.getElementById('sbView').addEventListener("tap", function (event) {
      if(!CalSbDataInfo.sb){
        return 
      }
      const { sb:{itemList,total,month} } = CalSbDataInfo
      
    mui.alert(`
    <div class="alert-content">
    ${(`
    <div class="mui-row">
      <div class="mui-col-sm-3">
        <li class="mui-table-view-cell">
            <a>
                项目
            </a>
        </li>
      </div>
      <div class="mui-col-sm-3">
        <li class="mui-table-view-cell">
            <a>
                基数
            </a>
        </li>
      </div>
      <div class="mui-col-sm-3">
        <li class="mui-table-view-cell">
            <a>
                公司
            </a>
        </li>
      </div>
      <div class="mui-col-sm-3">
        <li class="mui-table-view-cell">
            <a>
                个人
            </a>
        </li>
      </div>
  </div>`)}
    ${itemList.map((item)=>{
      return (`
      <div class="mui-row">
        <div class="mui-col-sm-3">
          <li class="mui-table-view-cell">
              <a>
                  ${item.itemName || '-'}
              </a>
          </li>
        </div>
        <div class="mui-col-sm-3">
          <li class="mui-table-view-cell">
              <a>
                  ${item.base || '-'}
              </a>
          </li>
        </div>
        <div class="mui-col-sm-3">
          <li class="mui-table-view-cell">
              <a>
                  ${item.company || '-'}
              </a>
          </li>
        </div>
        <div class="mui-col-sm-3">
          <li class="mui-table-view-cell">
              <a>
                  ${item.personal || '-'}
              </a>
          </li>
        </div>
    </div>`)
    }).join('')}
    <div class="sb-label">
      <div class="sb-label_title">
        <p style="font-size:14px;font-weight:600;">社保费用</p>
        <p>截止扣费日期：${month || '-'}</p>
      </div>
      <div class="sb-label_total">￥${total}</div>
    </div>
    </div>
    `);
    })
    document.getElementById('gjjView').addEventListener("tap", function (event) {
      if(!CalSbDataInfo.gjj){
        return 
      }
      const { gjj:{companyValue,personalValue,base,isNew,total,month} } = CalSbDataInfo
      
      mui.alert(`
    <div class="alert-content">
    <div class="sb-label">
      <div class="sb-label_title">
        <p style="font-size:14px;font-weight:600;">公积金费用</p>
        <p>截止扣费日期：${month || '-'}</p>
      </div>
      <div class="sb-label_total">￥${total}</div>
    </div>
    <div style="color:#000;text-align:left;">
      <p style="color:#000;font-size:10px;">公司缴纳：${companyValue}</p>
      <p style="color:#000;font-size:10px;">个人缴纳：${personalValue}</p>
    </div>
    </div>
    `);
    })
    document.getElementById('gzView').addEventListener("tap", async function (event) {
      if(!CalSbDataInfo.salary){
        return 
      }
      const { salary:{baseSalary,salaryDate,total,tax,salary,otherFee} } = CalSbDataInfo;
      mui.alert(`
    <div class="alert-content">
    <div class="sb-label">
      <div class="sb-label_title">
        <p style="font-size:14px;font-weight:600;">订单金额</p>
        <p>截止扣费日期：${salaryDate || '-'}</p>
      </div>
      <div class="sb-label_total">￥${total}</div>
    </div>
    <div style="color:#000;text-align:left;">
      <p style="color:#000;font-size:10px;">当月应缴税额：${baseSalary}</p>
      <p style="color:#000;font-size:10px;">当月实发金额：${total}</p>
      <p style="color:#000;font-size:10px;">其他费用：${otherFee}</p>
    </div>
    </div>
    `);
    })
};

const getSolutionFunc = async () => {
  const {month,wage} = configData
  const { code, data } = await post(getSolution,{
    month,baseSalary:wage
  });
  if (code === 200) {
    const { companyGjj, personGjj, baseGjj,baseYanglao } = data;
    const { city } = GetRequest();
    document.querySelector(".create-order-seleted").style = "display:block;";
    document.getElementById("sbPlan").innerHTML = `${city}职工社保`;
    document.getElementById("sbBase").innerHTML = baseYanglao;
    document.getElementById("gjjPlan").innerHTML =
      city + "公积金(" + companyGjj * 100 + "%-" + personGjj * 100 + "%" + ")";
    document.getElementById("gjjBase").innerHTML = baseGjj;
    document.getElementById("xzPlan").innerHTML = `${city}个税`;
    document.getElementById("gongziDate").innerHTML = "当月25日";
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
      if (!canSelectWage) {
        mui.toast("标准和日期不可修改");
        return;
      }
      picker.show(function (items) {
        result.innerText = items[0];
        configData[resultId] = items[0];
        if (configData["month"] && configData["wage"]) {
          getSolutionFunc();
        }
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
        calculateData["sbIsNew"] = false;
      } else {
        calculateData["sbIsNew"] = true;
        console.log("你关闭了开关");
      }
    });
  document
    .getElementById("gongjijin-switch")
    .addEventListener("toggle", function (event) {
      if (event.detail.isActive) {
        calculateData["gjjIsNew"] = false;
        console.log("你启动了开关");
      } else {
        calculateData["gjjIsNew"] = true;
        console.log("你关闭了开关");
      }
    });
  document
    .getElementById("calculate-btn")
    .addEventListener("tap", function (event) {
      calSbDataFunc();
    });
};
const getSalaryMonthListFunc = async()=>{
  const { code, data } = await get(getSalaryMonthList);
  if(code ===200){
    const {salaryList,monthList} = data;
    initPicker("paymonth", "month", monthList);
    initPicker("paywage", "wage", salaryList);
  }
}
const initCreateOrder = () => {
  getUserInfoFunc();
  getRandomCompanyFunc();
  getSalaryMonthListFunc();
};
initCreateOrder();