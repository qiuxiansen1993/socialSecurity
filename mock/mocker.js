var Mock = require("mockjs");
Mock.mock("/baseData/getCityList.php", "get", {
  code: 200,
  msg: "操作成功！",
  data: ["杭州", "北京"],
});
Mock.mock("/baseData/getRandomCompany.php", "get", {
  code: 200,
  msg: "操作成功！",
  data: {
    id: 1,
    cityName: "北京",
    areaName: "昌平区",
    corpName: "北京立伟人力资源有限公司",
    enable: "1",
  },
});
Mock.mock("/user/getUserInfo.php", "get", {
  code: 200,
  msg: "操作成功！",
  data: {
    userInfo: {
      id: 1324,
      userName: "邱成林",
      userIdCard: "231083199306096811",
      userHouseHold: "城镇户口",
      userMobile: "13651038123",
      userEmail: null,
    },
    user: {
      id: 1324,
      nickname: "忠伟",
      openid: "oCC5H0sFLuExn1BG7RmziEAD_vmI",
      headimg:
        "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqchYQT4NBGc6pbic16fdN6LShndJ5x8wpZSZq7kSEqBqChfa2SCheXVwOn9zIm6wEcbbOcHoeqXCg/132",
      pa: 0,
      grandpa: 0,
      sCount: null,
      gsCount: null,
      balance: 0,
      alipayid: null,
      alipayname: null,
      regTime: null,
      lastLoginTime: null,
    },
  },
});
Mock.mock("/baseData/getSolution.php", "get", {
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
Mock.mock("/order/calSbData.php", "post", {
  code: 200,
  msg: "操作成功！",
  data: {
    sb: {
      isNew: null,
      month: null,
      total: 2005.6512,
      itemList: [
        {
          itemName: "养老保险",
          base: 3613.0,
          company: "578.08",
          personal: "289.04",
        },
        {
          itemName: "医疗保险",
          base: 5360.0,
          company: "525.28",
          personal: "525.28",
        },
        {
          itemName: "失业保险",
          base: 3613.0,
          company: "28.904",
          personal: "28.904",
        },
        {
          itemName: "工伤保险",
          base: 4713.0,
          company: "15.0816",
          personal: "15.0816",
        },
        {
          itemName: "滞纳金",
          base: 0.0,
          company: "0.00(0.00%)",
          personal: "0.00(0.00%)",
        },
        {
          itemName: "调整项",
          base: 0.0,
          company: "0.00(0.00%)",
          personal: "0.00(0.00%)",
        },
        { itemName: "调整项", base: 0.0, company: "", personal: "" },
      ],
    },
    gjj: {
      isNew: null,
      month: null,
      base: 5000.0,
      total: 500.0,
      companyValue: "250.0(5.0E-4%)",
      personalValue: "250.0(5.0E-4%)",
    },
    salary: {
      salaryDate: "当月25日",
      baseSalary: 5000.0,
      total: 2494.3488,
      tax: 0.0,
      salary: null,
      otherFee: 0.0,
    },
  },
});
Mock.mock("/order/getFeeInfo.php", "post", {
  code: 200,
  msg: "操作成功！",
  data: [
    { title: "月度服务", sum: 160.0, fromM2M: "202107-202107" },
    { title: "季度服务", sum: 450.0, fromM2M: "202107-202109" },
    { title: "半年服务", sum: 850.0, fromM2M: "202107-202112" },
    { title: "年度服务", sum: 1600.0, fromM2M: "202107-202206" },
  ],
});
Mock.mock("/order/getUserOrderList.php", "get", {
  code: 200,
  msg: "操作成功！",
  data: {
    prevPage: 1,
    nextPage: 1,
    pageCount: 1,
    pageNum: 1,
    recordCount: 1,
    pageSize: 10,
    resList: [
      {
        id: 9,
        userId: 1324,
        status: "0",
        createTime: 1625742849000,
        auditTime: null,
        startMonth: "202107",
        duration: 6,
        includeSb: 1,
        sbIsNew: 0,
        includeGjj: 1,
        gjjIsNew: 0,
        includeSalary: 1,
        baseSalary: 3000.0,
        salaryDate: 25,
        fee: 800.0,
        citySalaryId: 6,
        companyId: 1,
      },
    ],
    pageNavInfo: null,
    pageNavTotal: null,
    pageItemCount: 1,
  },
});
Mock.mock("/order/viewUserOrderDetail.php", "get", {"code":200,"msg":"操作成功！","data":[{"id":2,"payOrderId":9,"month":"202108","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null},{"id":3,"payOrderId":9,"month":"202109","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null},{"id":4,"payOrderId":9,"month":"202110","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null},{"id":5,"payOrderId":9,"month":"202111","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null},{"id":6,"payOrderId":9,"month":"202112","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null},{"id":7,"payOrderId":9,"month":"202107","status":"0","sbMoney":1550.8116,"fund":300.0,"salaryTax":2596.534,"exportDate":null}]})