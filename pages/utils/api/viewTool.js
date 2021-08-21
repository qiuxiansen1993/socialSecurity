// 社保查询首页
const getSbBasicInfo = '/sbinfo/getSbBasicInfo.php';
// 获取最大月份和最小月份，分页使用
const getSbStartEndMonth = '/sbinfo/getSbStartEndMonth.php';
// 年度分月汇总数据
const getSbDetailDataByYear = '/sbinfo/getSbDetailDataByYear.php';
// 月份详情
const getSbDetailDataByMonth = '/sbinfo/getSbDetailDataByMonth.php';
// 公积金查询主页
const getGjjBasicInfo = '/sbinfo/getGjjBasicInfo.php';
// 公积金按年汇总页
const getGjjStatDataByYear = '/sbinfo/getGjjStatDataByYear.php';
// 年度详情
const getGjjDetailDataByYear = '/sbinfo/getGjjDetailDataByYear.php';
export {
    getGjjDetailDataByYear,
    getGjjStatDataByYear,
    getGjjBasicInfo,
    getSbDetailDataByMonth,
    getSbDetailDataByYear,
    getSbStartEndMonth,
    getSbBasicInfo
}