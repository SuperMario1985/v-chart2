import axios from "axios";
let host = 'http://127.0.0.1:8080';
let httpServe = axios.create();
function nowWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/now?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.now;
        } else {
            resultInfo.data = {
                text: "多云",
                temp: "25"
            }
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}
function fultherWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/24h?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.hourly;
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}
function threeDaysWeather(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "https://devapi.heweather.net/v7/weather/3d?location=101010100&key=506c8ed1fba74434b70d2f45d7476470"
    }).then(function (response) {
        resultInfo.success = true
        if (response && response.status === 200) {
            resultInfo.data = response.data.daily;
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}
function getNews(returnFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: "/static/video/news.json"
    }).then(function (response) {
        resultInfo.success = true;
        if (response && response.status === 200) {
            resultInfo.data = response.data;
        }
        if (returnFun) {
            returnFun(resultInfo);
        }
    });
}

// --------------开关数值按钮---------------
// 远程（写入）
function remoteWriting(tag, val, retureFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }

    httpServe({
        method: "get",
        url: host + `/dataProcess/WriteData?tag=${tag}&value=${val}`
    }).then(function (response) {
        debugger
        if (retureFun) {
            retureFun(response);
        }
    }).catch(function (res) {
        if (retureFun) {
            retureFun(res);
        }
    })
}
// 远程（读取）
function getInfo(retureFun) {
    let resultInfo = {
        success: false,
        data: null,
        msg: ''
    }
    httpServe({
        method: "get",
        url: host + "/dataProcess/GetRealTimeData"
    }).then(function (response) {
        if (retureFun) {
            retureFun(response);
        }
    }).catch(function (res) {
        if (retureFun) {
            retureFun(res);
        }
    })
}

export default {
    nowWeather,
    fultherWeather,
    threeDaysWeather,
    getNews,
    remoteWriting,
    getInfo
}