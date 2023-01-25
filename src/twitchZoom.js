import MOCK from "@dynamic-data/twitch-data";
const BannedUsersWeekModel = {
    ban_lengths: (ban_lengths) => {
        var ban_length_total = 0
        var ban_length_max = 0
        var ban_length_min = 0
        for (var i = 0; i< ban_lengths.length;i++){
            var length = (new Date(ban_lengths[i]["end"])).getTime() - (new Date(ban_lengths[i]["start"])).getTime()
            ban_length_total += length
            switch(i){
                case 0:
                    ban_length_max = length
                    ban_length_min = length
                    break
                default:
                    if (length>ban_length_max){
                        ban_length_max = length
                    }
                    if (length<ban_length_min){
                        ban_length_min = length
                    }
                    break
            }
        }
        return {
            "avg": ban_length_total/ban_lengths.length,
            "min": ban_length_max,
            "max": ban_length_min
        }
    },
    bans_per_mod: (bans) => {
        var bans_per_mod = 0
        var mods = []
        for (var i = 0; i<bans.length;i++){
            if (!mods.includes(bans[i].moderator_id)){
                mods.push(bans[i].moderator_id)
            }
        }
        bans_per_mod = bans.length/mods.length 
        return bans_per_mod
    },
    most_banning_mod: (bans) => {
        var bans_for_each_mod = {}
        for (var i = 0; i<bans.length;i++){
            if (bans_for_each_mod[bans[i].moderator_id] === undefined){
                bans_for_each_mod[bans[i].moderator_id] = {
                    "num_of_bans": 1,
                    "display_name": bans[i].moderator_name,
                }
            } else {
                bans_for_each_mod[bans[i].moderator_id]["num_of_bans"] += 1
            }
        }
        var max_mod = null
        Object.entries(bans_for_each_mod).map(([moderator_id, value])=>{
            if (max_mod === null || max_mod["num_of_bans"]<value["num_of_bans"]){
                max_mod = {
                    "mod_id": [moderator_id],
                    "display_name": [value["display_name"]],
                    "num_of_bans": value["num_of_bans"]
                }
            } else if (max_mod["num_of_bans"]===value["num_of_bans"]) {
                max_mod["mod_id"].push(moderator_id)
                max_mod["display_name"].push(value["display_name"])

            }
        })
        console.log("max_mod",max_mod)
        return max_mod
    }
}

const VideosWeekModel = {
    durations: (durations) => {
        console.log("duration",durations)
        var times_seconds = []
        var times_seconds_max = 0
        var times_seconds_min = 0

        for (var i = 0; i<durations.length;i++){
            var durationStr = durations[i]
            var time = 0
            if (durationStr.includes("h")){
                time += 3600*parseInt(durationStr.split("h")[0])
                durationStr = durationStr.split("h")[1]
            }
            if (durationStr.includes("m")){
                time += 60*parseInt(durationStr.split("m")[0])
                durationStr = durationStr.split("m")[1]
            }
            if (durationStr.includes("s")){
                time += parseInt(durationStr.split("s")[0])
            }
            console.log("duration",time)
            times_seconds.push(parseInt(time))
            switch(i){
                case 0:
                    times_seconds_max = time
                    times_seconds_min = time
                    break
                default:
                    if (time>times_seconds_max){
                        times_seconds_max = time
                    }
                    if (time<times_seconds_min){
                        times_seconds_min = time
                    }
                    break
            }
        }
        console.log("duration",times_seconds)
        var sum = times_seconds.reduce((a, b) => a + b)
        return {
            "total": sum,
            "avg": sum/times_seconds.length,
            "max": times_seconds_max,
            "min": times_seconds_min,
        }
        
    },
    view_count: (view_counts) => {
        var view_counts_max = 0
        var view_counts_min = 0

        for (var i = 0; i<view_counts.length;i++){
            switch(i){
                case 0:
                    view_counts_max = view_counts[i]
                    view_counts_min = view_counts[i]
                    break
                default:
                    if (view_counts[i]>view_counts_max){
                        view_counts_max = view_counts[i]
                    }
                    if (view_counts[i]<view_counts_min){
                        view_counts_min = view_counts[i]
                    }
                    break
            }
        }
        var sum = view_counts.reduce((a, b) => a + b)
        return {
            "total": sum,
            "avg": sum/view_counts.length,
            "max": view_counts_max,
            "min": view_counts_min,
        }
        
    }
}

const BitsLeaderboardWeekModel = {
    scores: (scores) => {
        var scores_max = 0
        var scores_min = 0

        for (var i = 0; i<scores.length;i++){
            switch(i){
                case 0:
                    scores_max = scores[i]
                    scores_min = scores[i]
                    break
                default:
                    if (scores[i]>scores_max){
                        scores_max = scores[i]
                    }
                    if (scores[i]<scores_min){
                        scores_min = scores[i]
                    }
                    break
            }
        }
        var sum = scores.reduce((a, b) => a + b)
        return {
            "total": sum,
            "avg": sum/scores.length,
            "max": scores_max,
            "min": scores_min,
        }
    },
    most_donos: (donos) => {
        // var top_donos = donos
        var top_donos = []
        top_donos = donos.filter(obj => {
            return obj.rank === 1
            })
        return top_donos
    }
}

const PollsWeekModel = {
    total_votes: (votes) => {
        var votes_max = 0
        var votes_min = 0
        var sum = 0
        for (var i = 0; i<votes.length;i++){
            sum += votes[i].votes
            switch(i){
                case 0:
                    votes_max = votes[i].votes
                    votes_min = votes[i].votes
                    break
                default:
                    if (votes[i].votes>votes_max){
                        votes_max = votes[i].votes
                    }
                    if (votes[i].votes<votes_min){
                        votes_min = votes[i].votes
                    }
                    break
            }
        }
        return {
            "total": sum,
            "avg": sum/votes.length,
            "max": votes_max,
            "min": votes_min,
        }
    },
    total_votes_per_poll: (votes) => {
        var final = {
            avg: [],
            max: [],
            min: []
        }
        for (var i = 0; i<votes.length;i++){
            var total = 0
            var max =0
            var min = 0
            for (var y = 0; y<votes[i].length;y++){
                total += votes[i][y].votes
                switch(y){
                    case 0:
                        max = votes[i][y].votes
                        min = votes[i][y].votes
                        break
                    default:
                        if (votes[i][y].votes>max){
                            max = votes[i][y].votes
                        }
                        if (votes[i][y].votes<min){
                            min = votes[i][y].votes
                        }
                        break
                }
            }
            final.avg.push(total/votes[i].length)
            final.max.push(max)
            final.min.push(min)
        }
        return {
            "avg": final.avg.reduce((a, b) => a + b)/final.avg.length,
            "avg_max": final.max.reduce((a, b) => a + b)/final.max.length,
            "avg_min": final.min.reduce((a, b) => a + b)/final.min.length,
        }
    },
    durations: (durations) => {
        var durations_max = 0
        var durations_min = 0

        for (var i = 0; i<durations.length;i++){
            switch(i){
                case 0:
                    durations_max = durations[i]
                    durations_min = durations[i]
                    break
                default:
                    if (durations[i]>durations_max){
                        durations_max = durations[i]
                    }
                    if (durations[i]<durations_min){
                        durations_min = durations[i]
                    }
                    break
            }
        }
        var sum = durations.reduce((a, b) => a + b)
        return {
            "total": sum,
            "avg": sum/durations.length,
            "max": durations_max,
            "min": durations_min,
        }
    }
}

const HypeTrainEventWeekModel = {
    total: (totals) => {
        var sum = totals.reduce((a, b) => a + b)
        var totals_max = 0
        var totals_min = 0

        for (var i = 0; i<totals.length;i++){
            switch(i){
                case 0:
                    totals_max = totals[i]
                    totals_min = totals[i]
                    break
                default:
                    if (totals[i]>totals_max){
                        totals_max = totals[i]
                    }
                    if (totals[i]<totals_min){
                        totals_min = totals[i]
                    }
                    break
            }
        }
        return  {
            "total": sum,
            "avg": sum/totals.length,
            "min": totals_max,
            "max": totals_min,
        }
    },
    level: (levels)=> {
        return levels.reduce((a, b) => a + b)/levels.length
    }
}

const PredictionWeekModel = {
    total_users: (choices) => {
        var users_max = 0
        var users_min = 0

        for (var i = 0; i<choices.length;i++){
            switch(i){
                case 0:
                    users_max = choices[i].users
                    users_min = choices[i].users
                    break
                default:
                    if (choices[i].users>users_max){
                        users_max = choices[i].users
                    }
                    if (choices[i].users<users_min){
                        users_min = choices[i].users
                    }
                    break
            }
        }
        var sum = choices.reduce((a, b) => a + b.users)
        return {
            "total": sum,
            "avg": sum/choices.length,
            "max": users_max,
            "min": users_min,
        }
    },
    total_users_per_prediction: (choices) => {
        var final = {
            avg: [],
            max: [],
            min: []
        }
        for (var i = 0; i<choices.length;i++){
            var total = 0
            var max =0
            var min = 0
            for (var y = 0; y<choices[i].length;y++){
                total += choices[i][y].users
                switch(y){
                    case 0:
                        max = choices[i][y].users
                        min = choices[i][y].users
                        break
                    default:
                        if (choices[i][y].users>max){
                            max = choices[i][y].users
                        }
                        if (choices[i][y].users<min){
                            min = choices[i][y].users
                        }
                        break
                }
            }
            final.avg.push(total/choices[i].length)
            final.max.push(max)
            final.min.push(min)
        }
        return {
            "avg": final.avg/final.avg.length,
            "avg_max": final.max/final.max.length,
            "avg_min": final.min/final.min.length,
        }
    }
}

const dataModels = {
    BannedUsersWeek: {
        data: MOCK.BannedUsers,
        mockup: BannedUsersWeekModel
    },
    VideosWeek: {
        data: MOCK.Videos,
        mockup: VideosWeekModel
    },
    BitsLeaderboardWeek: {
        data: MOCK.BitsLeaderboard,
        mockup: BitsLeaderboardWeekModel
    },
    PollsWeek: {
        data: MOCK.Polls,
        mockup: PollsWeekModel
    },
    HypeTrainEventWeek: {
        data: MOCK.HypeTrainEvents,
        mockup: HypeTrainEventWeekModel
    },
    PredictionWeek: {
        data: MOCK.Predictions,
        mockup: PredictionWeekModel
    },
};

export function getTwitchBannedUsersWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "ban_lengths",
            "bans_per_mod",
            "most_banning_mod"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "ban_lengths":
                    var dates = []
                    for (var i = 0; i<zoomData.length; i++){
                        dates.push({
                            "start": zoomData[i]["created_at"],
                            "end": zoomData[i]["expires_at"]
                        })
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](dates);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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

export function getTwitchVideosWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "durations",
            "view_count"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "durations":
                    var durations = []
                    for (var i = 0; i<zoomData.length; i++){
                        durations.push(zoomData[i]["duration"])
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](durations);
                    break
                case "view_count":
                    var view_counts = []
                    for (var i = 0; i<zoomData.length; i++){
                        view_counts.push(zoomData[i]["view_count"])
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](view_counts);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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

export function getTwitchBitsLeaderboardWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "scores",
            "most_donos"
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "scores":
                    var scores = []
                    for (var i = 0; i<zoomData.length; i++){
                        for (var x = 0; x<zoomData[i].data.length; x++){
                            scores.push(zoomData[i].data[x]["score"])
                        }
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](scores);
                    break
                case "most_donos":
                    var most_donos = []
                    for (var i = 0; i<zoomData.length; i++){
                        for (var x = 0; x<zoomData[i].data.length; x++){
                            most_donos.push(zoomData[i].data[x])
                        }
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](most_donos);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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

export function getTwitchPollsWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "total_votes",
            "total_votes_per_poll",
            "durations",
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "total_votes":
                    var votes = []
                    for (var i = 0; i<zoomData.length; i++){
                        for (var x = 0; x<zoomData[i].choices.length; x++){
                            votes.push(zoomData[i].choices[x])
                        }
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](votes);
                    break
                case "total_votes_per_poll":
                    var votes = []
                    for (var i = 0; i<zoomData.length; i++){
                        var poll = []
                        for (var x = 0; x<zoomData[i].choices.length; x++){
                            poll.push(zoomData[i].choices[x])
                        }
                        votes.push(poll)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](votes);
                    break
                case "durations":
                    var durations = []
                    for (var i = 0; i<zoomData.length; i++){
                        durations.push(zoomData[i].duration)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](durations);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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

export function getTwitchHypeTrainEventWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "total",
            "level",
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "total":
                    var totals = []
                    for (var i = 0; i<zoomData.length; i++){
                        totals.push(zoomData[i].event_data.total)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](totals);
                    break
                case "level":
                    var levels = []
                    for (var i = 0; i<zoomData.length; i++){
                        levels.push(zoomData[i].event_data.level)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](levels);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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

export function getTwitchPredictionWeekData(dataModel, data) {
    let zoomData = data;
    const zoomModel = dataModels[dataModel].mockup;
    
    let overviewData = {};
    [
        "aggregate"
    ].forEach((rootKey)=>{
        switch(rootKey){
        case "aggregate":
            overviewData[rootKey] = {};
            [
            "total_users",
            "total_users_per_prediction",
            ].forEach((aggregateKey)=>{
            switch(aggregateKey){
                case "total_users":
                    var total_users = []
                    for (var i = 0; i<zoomData.length; i++){
                        for (var x = 0; x<zoomData[i].length; x++){
                            total_users.push(zoomData[i].outcomes[x])
                        }
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](total_users);
                    break
                case "total_users_per_prediction":
                    var total_users = []
                    for (var i = 0; i<zoomData.length; i++){
                        var prediction = []
                        for (var x = 0; x<zoomData[i].length; x++){
                            prediction.push(zoomData[i].outcomes[x])
                        }
                        total_users.push(prediction)
                    }
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](total_users);
                    break
                default:
                    overviewData[rootKey][aggregateKey] = zoomModel[aggregateKey](data);
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