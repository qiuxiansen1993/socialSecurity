var Mock = require("mockjs");
Mock.mock("/baseData/getCityList.php", "get", {
  code: 200,
  msg: "操作成功！",
  data: ["杭州", "北京"],
});
Mock.mock('/baseData/getRandomCompany.php', "get", {
    code: 200,
    msg: "操作成功！",
    data: {"id":1,"cityName":"北京","areaName":"昌平区","corpName":"北京立伟人力资源有限公司","enable":"1"},
  });
  Mock.mock('/user/getUserInfo.php', "get", {
    code: 200,
    msg: "操作成功！",
    data: {
        "headImg":"",
        "nickName":"",
        "userName":"小二郎",
        "userMobile":"",
        "userHouseHold":"河北秦皇岛",
        "useIdCard":"231083199300000000",
    },
  });
Mock.mock("/baseData/getSolution.php","get", {
  code: 200,
  msg: "操作成功！",
  data: {
    id: 6,
    cityName: "北京",
    year: 2021,
    miniSalary: 0.0,
    maxSalary: 0.0,
    baseYanglao: 3613.0,
    baseGjj: 3000.0,
    personGjj: 0.05,
    companyGjj: 0.05,
    personYanglao: 0.08,
    companyYanglao: 0.16,
    baseYiliao: 5360.0,
    personYiliao: 0.02,
    companyYiliao: 0.098,
    baseShiye: 3613.0,
    personShiye: 0.002,
    companyShiye: 0.008,
    baseGongshang: 4713.0,
    personGongshang: 0.0,
    companyGongshang: 0.0032,
    zhinajin: null,
    tiaozhengxiang: null,
  },
});
