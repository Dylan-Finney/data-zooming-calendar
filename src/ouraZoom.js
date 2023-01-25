import {
    toIsoString,
    getRandomInt,
    getNewDate,
    getSleepDate,
    pickRandomValue,
    getAverage
} from "@dynamic-data/utils";

import MOCK from "@dynamic-data/oura-data";

function calculateSum (array) {
    return array.reduce((total, current) => {
        return total + current;
    }, 0);
}
  
function linearRegression(y,x){
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i]*y[i]);
        sum_xx += (x[i]*x[i]);
        sum_yy += (y[i]*y[i]);
    } 

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

    return lr;
}
const SleepSummaryWeekModel = {
    display: (data) => {
        return {
        "summary_date": data.summary_date,
        "bedtime_start": data.bedtime_start,
        "bedtime_end": data.bedtime_end,
        "hypnogram_5min": data.hypnogram_5min,
        "timezone": data.timezone,
        "hr_5min": data.hr_5min
        }
    },
    breath_average: (breath_averages) => {
        return getAverage(breath_averages)
    },
    efficiency: (efficiencies) => {
        return getAverage(efficiencies)
    },
    score: (scores) => {
        return getAverage(scores)
    },
    sleep: (totals, durations) => {
        return {
        "total": calculateSum(totals),
        "duration": calculateSum(durations),
        "avgTotal": getAverage(totals),
        "avgDuration": getAverage(durations),
        }
    },
    hr_average: (hrs) => {
        return getAverage(hrs)
    },
    rmssd: (rmssds, rmssd_5mins) => {
        var rmssd_5minsConcat = []
        for (var i = 0; i<rmssd_5mins.length;i++){
        rmssd_5minsConcat = rmssd_5minsConcat.concat(rmssd_5mins[i])
        }
        var known_x_days = []
        var known_x_measurements = []

        for (var i = 1;i<=rmssds.length;i++){
        known_x_days.push(i)
        }

        for (var i = 1;i<=rmssd_5minsConcat.length;i++){
        known_x_measurements.push(i)
        }

        var lr = linearRegression(rmssds, known_x_days)
        var _5minslr = linearRegression(rmssd_5minsConcat, known_x_measurements)

        return {
        "dataset": {
            rmssds,
            rmssd_5mins
        },
        "average": getAverage(rmssds),
        "average_5min": getAverage(rmssd_5minsConcat),
        "averageTrend": lr.slope,
        "averageTrend_5min": _5minslr.slope
        }
    }
}

const ReadinessSummaryWeekModel = {
    display: (data) => {
        return {
        "summary_date": data.summary_date
        }
    },
    "score": (scores) => {
        return getAverage(scores)
    },
    "score_previous_night": (scores_previous_night) => {
        return getAverage(scores_previous_night)
    },
    "score_sleep_balance": (scores_sleep_balance) => {
        return getAverage(scores_sleep_balance)
    },
    "score_previous_day": (scores_previous_day) => {
        return getAverage(scores_previous_day)
    },
    "score_activity_balance": (scores_activity_balance) => {
        return getAverage(scores_activity_balance)
    },
    "score_resting_hr": (scores_resting_hr) => {
        return getAverage(scores_resting_hr)
    },
    "score_hrv_balance": (scores_hrv_balance) => {
        return getAverage(scores_hrv_balance)
    },
    "score_recovery_index": (scores_recovery_index) => {
        return getAverage(scores_recovery_index)
    },
    "score_temperature": (scores_temperature) => {
        return getAverage(scores_temperature)
    }
}

const ActivitySummaryWeekModel = {
    display: (data) => {
        return {
        "summary_date": data.summary_date,
        "day_start": data.day_start,
        "day_end": data.day_end,
        "class_5min": data.class_5min,
        "met_1min": data.met_1min,
        "timezone": data.timezone
        }
    },
    "score": (scores) => {
        return getAverage(scores)
    },
    "movement": (steps, movements) => {
        return {
        "totalSteps": calculateSum(steps),
        "avgSteps": getAverage(steps),
        "totalMovement": calculateSum(movements),
        "avgMovement" : getAverage(movements)
        }
    },
    "non_wear": (non_wears) => {
        return {
        "total": calculateSum(non_wears),
        "percent": calculateSum(non_wears)/(60*24*7)*100
        }
    },
    "inactivity_alerts": (inactivity_alerts) => {
        return calculateSum(inactivity_alerts)
    },
    "cals": (cal_actives, cal_totals) => {
        return {
        "totalCalActive": calculateSum(cal_actives),
        "avgCalActive": getAverage(cal_actives),
        "totalCalTotal": calculateSum(cal_totals),
        "avgCalTotal": getAverage(cal_totals)
        }
    },
    "met": (allMetData) => {
        var high = allMetData[0]
        var low = allMetData[0]
        for (var i = 0; i< allMetData.length;i++){
        if (allMetData[i]>high){
            high = allMetData[i]
        } else if (allMetData[i]<low){
            low = allMetData[i]
        }
        }
        return {
        "avg": getAverage(allMetData),
        "high": high,
        "low": low
        }
    }
}

const dataModels = {
SleepWeek: {
    data: MOCK.SleepSummary,
    mockup: SleepSummaryWeekModel
},
ActivityWeek: {
    data: MOCK.ActivitySummary,
    mockup: ActivitySummaryWeekModel
},
ReadinessWeek: {
    data: MOCK.ReadinessSummary,
    mockup: ReadinessSummaryWeekModel
}
};

export function getSleepSummaryWeekData(dataModel, data) {
    console.log(data)
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "display",
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "display":
            overviewData[rootKey] = []
            for (var i = 0; i< zoomData.length;i++){
            overviewData[rootKey].push(zoomModel[rootKey](zoomData[i]))
            }
            break
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "sleep",
            "score",
            "efficiency",
            "hr_average",
            "breath_average",
            "rmssd"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "sleep":
                overviewData[rootKey][aggregateKey] = {};
                var totals = []
                var durations = []
                for (var i = 0; i<zoomData.length; i++){
                    totals.push(zoomData[i].total)
                    durations.push(zoomData[i].duration)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](totals, durations);
                break
                case "score":
                let scores = []
                for (var i = 0; i<zoomData.length; i++){
                    scores.push(zoomData[i].score)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](scores);
                break
                case "efficiency":
                let efficiencies = []
                for (var i = 0; i<zoomData.length; i++){
                    efficiencies.push(zoomData[i].efficiency)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](efficiencies);
                break
                case "hr_average":
                var heartRates = []
                for (var i = 0; i<zoomData.length; i++){
                    heartRates.push(zoomData[i].hr_average)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](heartRates);
                break
                case "breath_average":
                let breath_averages = []
                for (var i = 0; i<zoomData.length; i++){
                    breath_averages.push(zoomData[i].breath_average)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](breath_averages);
                break
                case "rmssd":
                overviewData[rootKey][aggregateKey] = {};
                var rmssds = []
                var rmssd_5mins = []
                for (var i = 0; i<zoomData.length; i++){
                    rmssds.push(zoomData[i].rmssd)
                    rmssd_5mins.push(zoomData[i].rmssd_5min)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](rmssds, rmssd_5mins);
                break
                default:
                break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}

export function getActivitySummaryWeekData(dataModel,data) {
    console.log(data)
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    let overviewData = {};
    [
        "display",
        "aggregate",
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "display":
            overviewData[rootKey] = []
            for (var i = 0; i< zoomData.length;i++){
            overviewData[rootKey].push(zoomModel[rootKey](zoomData[i]))
            }
            break
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "score",
            "movement",
            "non_wear",
            "inactivity_alerts",
            "cals",
            "met"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "movement":
                var steps = []
                var movements = []
                for (var i = 0; i<zoomData.length;i++){
                    steps.push(zoomData[i].steps)
                    movements.push(zoomData[i].daily_movement)
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](steps, movements);
                break
                case "score":
                var scores = []
                for (var i = 0; i<zoomData.length; i++){
                    scores.push(zoomData[i]["score"])
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](scores);
                break
                case "non_wear":
                var non_wear = []
                for (var i = 0; i<zoomData.length; i++){
                    non_wear.push(zoomData[i]["non_wear"])
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](non_wear);
                break
                case "inactivity_alerts":
                let inactivity_alerts = []
                for (var i = 0; i<zoomData.length; i++){
                    inactivity_alerts.push(zoomData[i]["inactivity_alerts"])
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](inactivity_alerts);
                break
                case "cals":
                var cal_actives = []
                var cal_totals = []
                for (var i = 0; i< zoomData.length;i++){
                    cal_actives.push(zoomData[i].cal_active)
                    cal_totals.push(zoomData[i].cal_total)
                };
                overviewData[rootKey][aggregateKey] =  zoomModel[aggregateKey](cal_actives, cal_totals)
                break
                case "met":
                var allMetData = []
                for (var i = 0; i< zoomData.length;i++){
                    allMetData = allMetData.concat(zoomData[i].met_1min)
                };
                overviewData[rootKey][aggregateKey] =  zoomModel[aggregateKey](allMetData)
                break
                default:
                break
            }
            })
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    console.log("Oura Activity Zoom", overviewData)
    return overviewData
}

export function getReadinessSummaryWeekData(dataModel,data) {
    console.log(data)
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "display",
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "display":
            overviewData[rootKey] = []
            for (var i = 0; i< zoomData.length;i++){
            overviewData[rootKey].push(zoomModel[rootKey](zoomData[i]))
            }
            break
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "score",
            "score_previous_night",
            "score_sleep_balance",
            "score_previous_day",
            "score_activity_balance",
            "score_resting_hr",
            "score_hrv_balance",
            "score_recovery_index",
            "score_temperature"

            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                default:
                var aggregateData = []
                for (var i = 0; i< zoomData.length;i++){
                    aggregateData.push(zoomData[i][aggregateKey])
                }
                overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](aggregateData);
                break
            }
            })
            break
        case "length":
            overviewData[rootKey] = zoomData.length
            break
        default:
            break;
        }
    })
    overviewData["length"] = data.length
    return overviewData
}

