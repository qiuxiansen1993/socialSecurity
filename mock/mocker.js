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
Mock.mock('/order/calSbData.php', "post", {"code":200,"msg":"操作成功！","data":{"sb":{"isNew":null,"month":null,"total":2005.6512,"itemList":[{"itemName":"养老保险","base":3613.0,"company":"578.08","personal":"289.04"},{"itemName":"医疗保险","base":5360.0,"company":"525.28","personal":"525.28"},{"itemName":"失业保险","base":3613.0,"company":"28.904","personal":"28.904"},{"itemName":"工伤保险","base":4713.0,"company":"15.0816","personal":"15.0816"},{"itemName":"滞纳金","base":0.0,"company":"0.00(0.00%)","personal":"0.00(0.00%)"},{"itemName":"调整项","base":0.0,"company":"0.00(0.00%)","personal":"0.00(0.00%)"},{"itemName":"调整项","base":0.0,"company":"","personal":""}]},"gjj":{"isNew":null,"month":null,"base":5000.0,"total":500.0,"companyValue":"250.0(5.0E-4%)","personalValue":"250.0(5.0E-4%)"},"salary":{"salaryDate":"当月25日","baseSalary":5000.0,"total":2494.3488,"tax":0.0,"salary":null,"otherFee":0.0}}});
Mock.mock('/order/getFeeInfo.php', "post", {"code":200,"msg":"操作成功！","data":[{"title":"月度服务","sum":160.0,"fromM2M":"202107-202107"},{"title":"季度服务","sum":450.0,"fromM2M":"202107-202109"},{"title":"半年服务","sum":850.0,"fromM2M":"202107-202112"},{"title":"年度服务","sum":1600.0,"fromM2M":"202107-202206"}]});
