import { get, post } from "../utils/main";
import { GetRequest } from "../utils/tool";
import { calSb, calGjj, calTax, getCsi } from "../utils/api/tool";
import { getCityList } from "../utils/api/createOrder";
import "./index.scss";
let city = "";
let typeInfo = "";
let csi = "";
const wagesresult = document.querySelector(".wagesresult-box");
const viewContent = document.getElementById("view-content");
const csiBtn = document.getElementById("csi-btn");
const baseSalary = document.getElementById("baseSalary");
const getCityListFunc = async () => {
  const { code, data } = await get(getCityList);
  if (code === 200) {
    initPicker("cityopen", "city", data);
  }
};
const getCsiFunc = async () => {
  const { type } = GetRequest();
  if (type == 1) {
    return;
  }
  const { code, data } = await get(getCsi, { city });
  baseSalary.value = '';
  if (code === 200) {
    const { baseGjj, baseYanglao,maxBaseYanglao,maxGjjBase } = data;
    csi = type == 3 ? baseYanglao : type == 2 ? baseGjj : "";
    csiBtn.style = "display:block;";
    document.getElementById("baseSalary").setAttribute('placeholder',type == 3 ?`基数${baseYanglao}-${maxBaseYanglao}`:type == 2 ?`基数${baseGjj}-${maxGjjBase}`:'')
  }
};
csiBtn.addEventListener(
  "tap",
  function (event) {
    console.log(111)
    document.getElementById("baseSalary").value = csi;
  },
  false
);
const initPicker = (buttonId, resultId, data) => {
  let picker = new mui.PopPicker();
  picker.setData(data);
  // picker.pickers[0].setSelectedValue("fourth", 2000);
  let showUserPickerButton = document.getElementById(buttonId);
  let result = document.getElementById(resultId);
  showUserPickerButton.addEventListener(
    "tap",
    function (event) {
      picker.show(function (items) {
        result.innerText = items[0];
        city = items[0];
        getCsiFunc();
      });
    },
    false
  );
};

const calSbFunc = async (pram) => {
  const { code, data, msg } = await post(calSb, pram);
  if (code === 200) {
    viewContent.style = "display:none;";
    wagesresult.style = "display:block;";
    wagesresult.innerHTML = `
    <div class="wagesresult-top color-background">
            <div class="wagesresult-top1">
                <p style="text-align: center;">您共需缴纳(元)</p>
                <h1 style="padding-top:1rem;">
                    <span>￥</span><span id="sumPay" style="font-size: 3.6rem">${
                      data.total
                    }</span>
                </h1>
                <div class="socialresult-top-flex">
                    <div class="items">
                        <p>个人缴纳(元)</p>
                        <h2><span>￥</span><span class="personPayToatl">${
                          data.itemList[data.itemList.length - 1]?.personal
                        }</span></h2>
                    </div>
                    <div class="items">
                        <p>公司缴纳(元)</p>
                        <h2><span>￥</span><span class="enterprisePayToatl">${
                          data.itemList[data.itemList.length - 1]?.company
                        }</span></h2>
                    </div>
                </div>
            </div>
            <div class="wagesresult-top2">
                <p>
                    <span>缴费项目</span>
                    <span>社保</span>
                </p>
                <p>
                    <span>缴费城市</span>
                    <span id="cityName">${city}</span>
                </p>
            </div>
        </div>
        <div class="wagesresult-bottom qqxb-tools-table">
            <table class="z-CAT-section-money-table">
                <tbody><tr>
                    <th style="width:23%;">项目</th>
                    <th style="width:20%;">基数</th>
                    <th>公司</th>
                    <th>个人</th>
                </tr>
                ${data.itemList
                  .map((item, index) => {
                    const { itemName, base, company, personal } = item;
                    if (index === data.itemList.length - 1) {
                      return "";
                    }
                    return `
                    <tr>
                        <td id="categoryName">${itemName}</td>
                        <td id="enterpriseBase">${base}</td>
                        <td><span class="personPayToatl" style="color: #969699">${company}</span></td>
                        <td><span class="enterprisePayToatl" style="color: #969699">${personal}</span></td>
                    </tr>
                    `;
                  })
                  .join("")}
                <tr class="orange-tr">
                    <td>总计</td>
                    <td>-</td>
                    <td class="personPayToatl">${
                      data.itemList[data.itemList.length - 1]?.company
                    }</td>
                    <td class="enterprisePayToatl">${
                      data.itemList[data.itemList.length - 1]?.personal
                    }</td>
                </tr>
            </tbody></table>
        </div>
        <h5 class="wagesresult-bottom-h5">
            此结果仅供参考
        </h5>
    `;
  } else {
    mui.toast(msg);
  }
};
const calGjjFunc = async (pram) => {
  const { code, data, msg } = await post(calGjj, pram);
  if (code === 200) {
    viewContent.style = "display:none;";
    wagesresult.style = "display:block;";
    wagesresult.innerHTML = `
    <div class="wagesresult-top color-background">
    <div class="wagesresult-top1">
    <p style="text-align: center;">您共需缴纳(元)</p>
    <h1 style="padding-top:1rem;">
        <span>￥</span><span id="sumPay" style="font-size: 3.6rem">${data.total}</span>
    </h1>
    <div class="socialresult-top-flex">
        <div class="items">
            <p>个人缴纳(元)</p>
            <h2><span>￥</span><span class="personPayToatl">${data.personalValue}</span></h2>
        </div>
        <div class="items">
            <p>公司缴纳(元)</p>
            <h2><span>￥</span><span class="enterprisePayToatl">${data.companyValue}</span></h2>
        </div>
    </div>
</div>
<div class="wagesresult-top2">
    <p>
        <span>缴费项目</span>
        <span>社保</span>
    </p>
    <p>
        <span>缴费城市</span>
        <span id="cityName">${city}</span>
    </p>
</div>
    </div>
    <div class="wagesresult-bottom qqxb-tools-table">
            <table class="z-CAT-section-money-table">
                <tbody><tr>
                    <th style="width:23%;">项目</th>
                    <th style="width:20%;">基数</th>
                    <th>公司</th>
                    <th>个人</th>
                </tr>
                    <tr>
                        <td id="categoryName">公积金</td>
                        <td id="enterpriseBase">${data.base}</td>
                        <td><span class="personPayToatl" style="color: #969699">${data.companyValue}</span></td>
                        <td><span class="enterprisePayToatl" style="color: #969699">${data.personalValue}</span></td>
                    </tr>
            </tbody></table>
        </div>
        <h5 class="wagesresult-bottom-h5">
            此结果仅供参考
        </h5>
    `;
  } else {
    mui.toast(msg);
  }
};
const calTaxFunc = async (pram) => {
  const { code, msg, data } = await post(calTax, pram);

  if (code === 200) {
    viewContent.style = "display:none;";
    wagesresult.style = "display:block;";
    const { salaryDate, baseSalary, total, tax, salary, otherFee } = data;
    wagesresult.innerHTML = `
    <div class="alert-content">
    <div style="margin-bottom:10px;border:1px solid #eee;padding:10px;">
      <div class="alert-display-flex">
        <span>工资所属方案</span>
        <span>${city}职工个税</span>
      </div>
      <div class="alert-display-flex">
        <span>工资发放日期</span>
        <span>${salaryDate}</span>
      </div>
      <div class="alert-display-flex">
        <span>基数</span>
        <span>${baseSalary}</span>
      </div>
    </div>
    <div style="border:1px solid #eee;padding:10px;">
      <div>
        <div class="alert-display-flex">
          <span>缴费金额</span>
          <span style="color:#f0ad4e;font-size:15px;font-weight:500;">￥${total}</span>
        </div>
        <p class="date-as-of">截止扣费日期：2021-08-23</p>
      </div>
      <div>
        <div class="alert-display-flex">
          <span>当月应缴税额</span>
          <span>￥${tax}</span>
        </div>
        <div class="alert-display-flex">
          <span>当月实发金额</span>
          <span>￥${salary}</span>
        </div>
        <div class="alert-display-flex">
          <span>其他费用</span>
          <span>￥${otherFee}</span>
        </div>
      </div>
    </div>
    </div>
    <h5 class="wagesresult-bottom-h5">
            此结果仅供参考
        </h5>
    `;
  } else {
    mui.toast(msg);
  }
};
const initFunc = () => {
  const { type } = GetRequest();
  const titleName = document.getElementById("tool-name");
  const toolBtn = document.getElementById("tool-btn");
  typeInfo = type;
  if (type == 1) {
    titleName.innerHTML = "税工具";
  } else if (type == 2) {
    titleName.innerHTML = "公积金工具";
  } else if (type == 3) {
    titleName.innerHTML = "社保工具";
  }
  toolBtn.addEventListener(
    "tap",
    function (event) {
      var rootHtml = document.documentElement;
      rootHtml.style.fontSize = `${10}px`;
      const baseSalary = document.getElementById("baseSalary").value;
      if (!baseSalary || !city) {
        return mui.toast("请填全信息");
      }
      if (typeInfo == 1) {
        return calTaxFunc({
          baseSalary,
          city,
        });
      }
      if (typeInfo == 2) {
        return calGjjFunc({
          baseSalary,
          city,
        });
      }
      if (typeInfo == 3) {
        return calSbFunc({
          baseSalary,
          city,
        });
      }
    },
    false
  );
};
initFunc();
getCityListFunc();
