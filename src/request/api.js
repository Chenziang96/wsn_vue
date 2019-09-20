import ajax from './ajax'
/**
 测试界面部分
 */
export const postTestName = (params) => {
  return ajax.post('/api/testdata/testInfo/insert',params)
};
//获取控制中心号
export const getControlCenterId = () => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getControlCenter')
};

/**
节点管理界面
 */
//获取节点信息
export const getNodeInformation = () => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getNodeInformation&controlCenterNum='+'1');
};

export const getNodeInformation1= () => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getNodeInformation&controlCenterNum='+'2');
};
//获取烧录次数
export const getburnTime = () => {
  return ajax.get('/api/nodemanage/flash/getFlashUseNum')
};
export const getNodeList = (testId,controlCenterId) => {
  return ajax.get('/api/nodemanage/node/getByControlCenterNum?testId='+testId+'&controlCenterNum='+controlCenterId)
};

//获取拓扑图节点类型信息
export const getTopologyNode = (testId) => {
  return ajax.get('/api/nodemanage/node/getTopologyNodes?testId='+testId)
};
//获取拓扑图节点连接信息
export const getTopologyLink = (testId) => {
  return ajax.get('/api/nodemanage/node/getTopologyLinks?testId='+testId)
};
//更新节点信息
export const updateNode = (params) => {
  return ajax.post('api/datatransmission/setNodeOrder?orderType=modifyNodeInformation',params)
};
/**
 自主组网界面
 */
//获取组网信息
export const getThroughPutData = (testId,controlCenterId) => {
  return ajax.get('/api/nodemanage/node/getByControlCenterNum?testId='+testId+'&controlCenterNum='+controlCenterId);
};
//上传组网信息
export const getNetwork = (controlCenterId) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getNetworkingInformation&controlCenterNum='+controlCenterId);
};
//发送协议文件
export const sendProtocol = (params,config) => {
  return ajax.postData('/post1/datatransmission/setFileList',params,config)
};
//协议下载，返回1，下载成功
export const downloadProtocol = (controlCenterId) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=downloadProtocol&controlCenterNum='+controlCenterId)
};
//协议烧录，返回2，下载成功
export const burnProtocol = (controlCenterId) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=burnProtocol&controlCenterNum='+controlCenterId)
};
//开始测试
export const startNewCycle = (controlCenter) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=startNewCycle&controlCenterNum='+controlCenter)
};
//获取结束标志
export const getEndFlag = () => {
  return ajax.get('/api/datatransmission/getEndFlag')
};
//返回数据
export const getTestData = (controlCenter) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getTestingData&controlCenterNum='+controlCenter)
};
/**
 性能测试页面
 */
//上传测试参数，返回3，测试结束，返回4，数据传输完成
export const sendTestData = (params,config) => {
  return ajax.post('/post1/datatransmission/setTestOrder',params)
};
//获取网络时延测试数据
export const getNetworkDelayData = (testId,controlCenterId) => {
  return ajax.get('/api/testdata/timeDelay/list?testId='+testId+'&?controlCenterNum='+controlCenterId)
};
//获取网络平均路径长度数据
export const getNetworkLengthData = (testId,controlCenterId) => {
  return ajax.get('/api/testdata/pathLength/list?testId='+testId+'&?controlCenterNum='+controlCenterId)
};
//获取网络丢包率数据
export const getNetworkLossRateData = (testId,controlCenterId) => {
  return ajax.get('/api/testdata/nodePacketLoss/list?testId='+testId+'&?controlCenterNum='+controlCenterId)
};
//获取网络吞吐量数据
export const getNetworkThroughputData = (testId,controlCenterId) => {
  return ajax.get('/api/testdata/throughPut/list?testId='+testId+'&?controlCenterNum='+controlCenterId)
};
//获取网络联通度数据
export const getNetworkConnectivityData = (testId,controlCenterId) => {
  return ajax.get('/api/testdata/connectivityDegree/list?testId='+testId+'&?controlCenterNum='+controlCenterId)
};

/**
 性能对比页面
 */
//获取网络时延测试数据
export const getNetworkDelay = (testId) => {
  return ajax.get('/api/testdata/timeDelay/list?testId='+testId)
};
//获取网络时延拓扑图数据
export const getNetworkDelayGraph = (testId) => {
  return ajax.get('/api/testdata-client/sysTimeDelay/get?testId='+testId)
};
//获取网络丢包率测试数据
export const getLossRate = (testId) => {
  return ajax.get('/api/testdata/nodePacketLoss/list?testId='+testId)
};
//获取网络丢包率拓扑图数据
export const getLossRateGraph = (testId) => {
  return ajax.get('/api/testdata-client/sysPacketLoss/get?testId='+testId)
};

/**
 历史查询页面
 */
//上传测试名
export const getTestName = (userName,testName) => {
  return ajax.get('/api/history/testInfo/getTestId?userName='+userName+'&'+'testName='+testName)
};
//网络平均路径长度测试数据
export const getPathLength = (testId) => {
  return ajax.get('/api/history/pathLengthList?testId='+testId)
};
//网络时延测试数据
export const getDelayList = (testId) => {
  return ajax.get('/api/history/timeDelayList?testId='+testId)
};
//丢包率测试数据
export const getPacketLossData = (testId) => {
  return ajax.get('/api/history/nodePacketLossList?testId='+testId)
};
//吞吐量测试数据
export const getThroughPut = (testId) => {
  return ajax.get('/api/history/throughPutList?testId='+testId)
};
//吞吐量测试数据
export const getConnectivity = (testId) => {
  return ajax.get('/api/history/throughPutList?testId='+testId)
};
//历史查询时延图
export const getDelayGraph = (params) => {
  return ajax.post('/api/history/sysTimeDelay/list',params)
};
//丢包率查询时延图
export const getLossGraph = (params) => {
  return ajax.post('/api/history/sysPacketLoss/list',params)
};
//获取测试信息
export const getTestList = (userName) => {
  return ajax.get('/api/history/testInfo/testList?userName='+userName)
};
//获取历史查询拓扑图
export const getHistoryTopology = (testId) => {
  return ajax.get('/api/history/topologyNodes?testId='+testId)
};
//历史查询拓扑图连接信息
export const getHistoryTopologyLink = (testId) => {
  return ajax.get('/api/history/topologyLinks?testId='+testId)
};
//获取历史查询拓扑图
export const getHistoryNode = (testId) => {
  return ajax.get('/api/nodemanage/node/getByTestId?testId='+testId)
};

/**
 * 感知数据
 */

//结束感知
export const endSense = (controlCenter) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=endSensorData'+'&controlCenterNum='+controlCenter)
};
//获取感知数据
export const getSensorData = (controlCenter) => {
  return ajax.get('/api/datatransmission/setOrder?orderType=getSensorData'+'&controlCenterNum='+controlCenter)
};
//温度数据
export const getTemperatureData = (controlCenter,time,applicationNum) => {
  return ajax.get('/api/application'+applicationNum+'/getRecentTemperature?controlCenterNum='+controlCenter+'&time='+time);
};
//湿度数据
export const getHumidityData = (controlCenter,time,applicationNum) => {
  return ajax.get('/api/application'+applicationNum+'/getRecentHumidity?controlCenterNum='+controlCenter+'&time='+time)
};
//光强数据
export const getLightData = (controlCenter,time,applicationNum) => {
  return ajax.get('/api/application'+applicationNum+'/getRecentLightIntensity?controlCenterNum='+controlCenter+'&time='+time)
};


