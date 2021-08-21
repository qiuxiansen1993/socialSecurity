// 社保计算
const getSbBasicInfo = '/sbinfo/getSbBasicInfo.php';
// 获取最大月份和最小月份，分页使用
const getSbStartEndMonth = '/sbinfo/getSbStartEndMonth.php';
// 按年分页列表
const getSbDetailDataByYear = '/sbinfo/getSbDetailDataByYear.php';
// 月份详情
const getSbDetailDataByMonth = '/sbinfo/getSbDetailDataByMonth';

// 公积金查询页面
const getGjjBasicInfo = '/sbinfo/getGjjBasicInfo.php';
// 按年汇总页
const getGjjStatDataByYear = '/sbinfo/getGjjStatDataByYear.php';
// 年度详情
const getGjjDetailDataByYear = '/sbinfo/getGjjDetailDataByYear.php';

export {
    getSbBasicInfo,
    getSbStartEndMonth,
    getSbDetailDataByYear,
    getSbDetailDataByMonth,
    getGjjBasicInfo,
    getGjjStatDataByYear,
    getGjjDetailDataByYear
}