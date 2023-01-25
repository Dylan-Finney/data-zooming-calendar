import "./App.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer,Views, } from 'react-big-calendar'
import moment from 'moment'
import {
  getReadinessSummaryWeekData,
  getSleepSummaryWeekData,
  getActivitySummaryWeekData
} from "./ouraZoom.js"
import {
  getGoogleActivityWeekData,
  getGoogleLocationWeekData,
  getGooglePlacesWeekWeekData,
  getGoogleRoutesWeekWeekData,
} from "./googleZoom.js"
import {
  getWhoopWorkoutWeekData,
  getWhoopSleepWeekData,
  getWhoopRecoveryWeekData,
  getWhoopCycleWeekData
} from "./whoopZoom"
import {
  getTwitchBannedUsersWeekData,
  getTwitchVideosWeekData,
  getTwitchBitsLeaderboardWeekData,
  getTwitchPollsWeekData,
  getTwitchHypeTrainEventWeekData,
  getTwitchPredictionWeekData
} from "./twitchZoom"
import { useState,useCallback, useEffect } from "react";
import Year from "./Year";
import React, { Fragment, useMemo } from 'react'
import { SketchPicker } from "react-color";

// const localizer = Calendar.momentLocalizer(moment); // or globalizeLocalizer
// localizer.formats.yearHeaderFormat = "YYYY";
const ouraEvents = [
  {
    summary_date: "2022-11-06",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-10-06",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-13",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 80,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-06",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "SleepSummary",
    period_id: 0,
    is_longest: 1,
    timezone: 120,
    bedtime_start: "2022-11-07T02:13:19+02:00",
    bedtime_end: "2022-11-07T08:12:19+02:00",
    score: 70,
    score_total: 57,
    score_disturbances: 83,
    score_efficiency: 99,
    score_latency: 88,
    score_rem: 97,
    score_deep: 59,
    score_alignment: 31,
    total: 20310,
    duration: 21540,
    awake: 1230,
    light: 10260,
    rem: 7140,
    deep: 2910,
    onset_latency: 480,
    restless: 39,
    efficiency: 94,
    midpoint_time: 11010,
    hr_lowest: 49,
    hr_average: 56.375,
    rmssd: 54,
    breath_average: 13,
    temperature_delta: -0.06,
    hypnogram_5min: "443432222211222333321112222222222111133333322221112233333333332232222334",
    hr_5min: [0, 53, 51, 0, 50, 50, 49, 49, 50, 50, 51, 52, 52, 51, 53, 58, 60, 60, 59, 58, 58, 58, 58, 55, 55, 55, 55, 56, 56, 55, 53, 53, 53, 53, 53, 53, 57, 58, 60, 60, 59, 57, 59, 58, 56, 56, 56, 56, 55, 55, 56, 56, 57, 58, 55, 56, 57, 60, 58, 58, 59, 57, 54, 54, 53, 52, 52, 55, 53, 54, 56, 0],
    rmssd_5min: [0, 0, 62, 0, 75, 52, 56, 56, 64, 57, 55, 78, 77, 83, 70, 35, 21, 25, 49, 44, 48, 48, 62, 69, 66, 64, 79, 59, 67, 66, 70, 63, 53, 57, 53, 57, 38, 26, 18, 24, 30, 35, 36, 46, 53, 59, 50, 50, 53, 53, 57, 52, 41, 37, 49, 47, 48, 35, 32, 34, 52, 57, 62, 57, 70, 81, 81, 65, 69, 72, 64, 0]
  },
  {
    summary_date: "2022-11-07",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "SleepSummary",
    period_id: 0,
    is_longest: 1,
    timezone: 120,
    bedtime_start: "2022-11-08T02:13:19+02:00",
    bedtime_end: "2022-11-08T08:12:19+02:00",
    score: 70,
    score_total: 57,
    score_disturbances: 83,
    score_efficiency: 99,
    score_latency: 88,
    score_rem: 97,
    score_deep: 59,
    score_alignment: 31,
    total: 20310,
    duration: 21540,
    awake: 1230,
    light: 10260,
    rem: 7140,
    deep: 2910,
    onset_latency: 480,
    restless: 39,
    efficiency: 94,
    midpoint_time: 11010,
    hr_lowest: 49,
    hr_average: 56.375,
    rmssd: 79,
    breath_average: 13,
    temperature_delta: -0.06,
    hypnogram_5min: "443432222211222333321112222222222111133333322221112233333333332232222334",
    hr_5min: [0, 53, 51, 0, 50, 50, 49, 49, 50, 50, 51, 52, 52, 51, 53, 58, 60, 60, 59, 58, 58, 58, 58, 55, 55, 55, 55, 56, 56, 55, 53, 53, 53, 53, 53, 53, 57, 58, 60, 60, 59, 57, 59, 58, 56, 56, 56, 56, 55, 55, 56, 56, 57, 58, 55, 56, 57, 60, 58, 58, 59, 57, 54, 54, 53, 52, 52, 55, 53, 54, 56, 0],
    rmssd_5min: [0, 0, 62, 0, 75, 52, 56, 56, 64, 57, 55, 78, 77, 83, 70, 35, 21, 25, 49, 44, 48, 48, 62, 69, 66, 64, 79, 59, 67, 66, 70, 63, 53, 57, 53, 57, 38, 26, 18, 24, 30, 35, 36, 46, 53, 59, 50, 50, 53, 53, 57, 52, 41, 37, 49, 47, 48, 35, 32, 34, 52, 57, 62, 57, 70, 81, 81, 65, 69, 72, 64, 0]
  },
  {
    summary_date: "2022-11-07",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-08",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-09",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-10",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-11",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    summary_date: "2022-11-12",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Readiness",
    period_id: 0,
    score: 62,
    score_previous_night: 5,
    score_sleep_balance: 75,
    score_previous_day: 61,
    score_activity_balance: 77,
    score_resting_hr: 98,
    score_hrv_balance: 90,
    score_recovery_index: 45,
    score_temperature: 86,
    rest_mode_state: 0,
  },
  {
    "summary_date": "2022-11-07",
    prifinaSourceType: "Oura",
    prifinaSourceEventType: "Activity",
    "day_start": "2022-11-07T04:00:00+03:00",
    "day_end": "2022-11-07T03:59:59+03:00",
    "timezone": 180,
    "score": 87,
    "score_stay_active": 90,
    "score_move_every_hour": 100,
    "score_meet_daily_targets": 60,
    "score_training_frequency": 96,
    "score_training_volume": 95,
    "score_recovery_time": 100,
    "daily_movement": 7806,
    "non_wear": 313,
    "rest": 426,
    "inactive": 429,
    "inactivity_alerts": 0,
    "low": 224,
    "medium": 49,
    "high": 0,
    "steps": 9206,
    "cal_total": 2540,
    "cal_active": 416,
    "met_min_inactive": 9,
    "met_min_low": 167,
    "met_min_medium_plus": 159,
    "met_min_medium": 159,
    "met_min_high": 0,
    "average_met": 1.4375,
    "class_5min":"1112211111111111111111111111111111111111111111233322322223333323322222220000000000000000000000000000000000000000000000000000000233334444332222222222222322333444432222222221230003233332232222333332333333330002222222233233233222212222222223121121111222111111122212321223211111111111111111",
    "met_1min": [ 1.2,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,1.2,0.9,1.1,1.2,1.1,1.1,0.9,0.9,0.9,1.1,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.2,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.3,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.3,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.2,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.9,2.7,2.8,1.6,1.8,1.5,1.5,1.8,1.6,1.9,1.4,1.9,1.4,1.5,1.7,1.7,1.4,1.5,1.5,1.7,1.3,1.7,1.7,1.9,1.5,1.4,1.8,2.2,1.4,1.6,1.7,1.7,1.4,1.5,1.6,1.4,1.4,1.7,1.6,1.3,1.3,1.4,1.3,2.6,1.6,1.7,1.5,1.6,1.6,1.8,1.9,1.8,1.7,2,1.8,2,1.7,1.5,1.3,2.4,1.4,1.6,2,2.8,1.8,1.5,1.8,1.6,1.5,1.8,1.8,1.4,1.6,1.7,1.7,1.6,1.5,1.5,1.8,1.8,1.7,1.8,1.8,1.5,2.4,1.9,1.3,1.2,1.4,1.3,1.5,1.2,1.4,1.4,1.6,1.5,1.6,1.4,1.4,1.6,1.6,1.6,1.8,1.7,1.3,1.9,1.3,1.2,1.2,1.3,1.5,1.4,1.4,1.3,1.7,1.2,1.3,1.5,1.7,1.5,2.6,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.9,3.6,0.9,0.1,0.1,0.1,0.1,0.1,3.3,3.8,3.6,2.3,3.1,3.2,3.5,4.3,3.6,1.7,1.6,2.8,2.1,3.3,4.9,3.3,1.8,5,4.6,5.3,4.9,4.9,5.4,5.4,5.2,5.3,4.5,5.3,4.5,4.4,5,5.3,4.8,4.6,1.8,4.4,3.6,3.5,2.9,2.6,3.1,0.9,0.1,2.9,3.8,1.7,2.8,1.8,1.5,1.4,1.4,1.3,1.4,1.3,1.4,1.3,1.3,1.2,1.3,1.6,1.5,1.5,1.4,1.8,1.3,1.4,1.3,1.4,1.6,1.6,1.4,1.3,1.4,1.4,1.6,1.5,1.4,2,1.5,1.4,1.4,1.3,1.2,1.3,1.3,1.6,1.6,1.5,1.5,1.8,1.5,1.2,1.2,1.5,1.6,1.5,1.7,1.7,1.5,1.6,2.5,1.5,1.3,1.2,1.4,1.6,1.3,1.6,1.7,2,1.2,1.3,1.9,3.3,2.8,1.7,1.4,1.4,1.4,1.5,1.4,1.5,1.3,2,1.4,1.2,1.5,1.2,1.2,1.8,2.4,3,4.6,4,3.6,2.2,0.9,4,3.3,2.6,4.4,2.3,4.5,5.2,5.2,5,5.3,5,4.6,5.4,5.7,5.5,5.2,5.5,3.8,5,5,4.4,4.8,5.5,4.1,4.5,3.2,3.3,2.6,4,3.4,2.1,1.5,1.5,1.4,1.4,1.5,1.3,1.3,1.5,1.4,1.2,1.2,1.4,1.2,1.2,1.2,1.2,1.1,1.3,1.6,1.8,1.5,1.3,1.5,1.5,1.6,1.5,1.6,1.4,1.4,1.4,1.3,1.3,1.3,1.3,1.2,1.3,1.2,1.2,1.2,0.9,1.1,1.1,1.1,1.1,1.7,1.1,0.9,0.9,0.9,1.1,1.1,0.9,1.1,0.9,1.2,1.3,2.4,2.2,1.6,0.9,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,2.4,2.7,1.3,1.4,1.3,1.2,1.3,1.2,1.4,1.4,2.2,1.7,2.9,1.3,1.4,1.2,1.3,1.8,2.1,2.2,2.5,1.9,2.3,2.7,2.3,2,1.7,2,2.1,1.7,1.8,1.2,1.2,0.9,0.9,1.3,1.4,1.2,1.6,1.7,2.4,2.4,2,1.2,1.3,1.3,1.2,1.3,2.4,1.2,1.2,1.3,2,1.3,1.8,1.2,1.2,1.2,1.2,1.8,1.7,1.3,1.3,1.6,1.8,2.2,1.3,1.5,1.5,1.8,1.3,1.7,1.8,2.1,2,1.9,1.6,2,1.8,2,1.6,1.2,1.7,1.5,1.5,2.3,2.6,3.3,3.3,1.5,1.2,1.3,1.5,1.3,1.5,1.5,3.7,2.4,3.3,3,3.7,4.5,2.8,1.3,1.9,2.2,1.6,1.3,1.2,1.3,1.3,2.9,3.3,2,2.2,2.6,2.7,4.5,3.2,4.5,3.3,2.1,3.4,3,2.7,3.3,2.1,2.3,1.7,1.7,2.8,0.9,2.2,0.9,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1,1.4,1.6,1.2,1.2,1.3,1.7,1.3,1.5,1.3,1.3,1.3,1.3,1.5,2.9,1.5,1.2,1.4,1.2,1.3,1.3,1.4,1.3,1.4,1.4,1.2,1.2,1.3,1.2,1.2,1.2,1.2,1.4,1.4,1.3,1.2,1.2,1.2,1.9,1.4,1.3,1.4,1.3,1.7,1.3,2.1,2.9,1.9,1.8,1.6,1.4,1.4,1.7,1.2,1.5,1.6,1.9,1.5,1.8,1.3,1.2,1.8,2.3,2,2.2,1.7,1.5,1.2,1.2,1.2,1.1,1.1,1.4,3.3,2,1.5,2.4,2.4,1.6,2.6,2.5,2.3,1.5,1.2,1.2,1.2,1.3,1.2,1.2,1.3,2,1.5,1.7,1.2,1.3,1.6,1.5,1.4,1.4,1.4,1.2,1.2,1.1,1.1,0.9,0.9,1.3,0.9,0.9,0.9,0.9,0.9,1.3,1.1,1.1,1.3,0.9,0.9,1.3,0.9,1.5,2.1,2.1,1.2,1.2,1.3,1.2,1.2,1.5,1.4,1.3,1.2,1.2,1.3,1.3,1.2,1.3,1.2,1.2,1.2,1.2,1.2,1.4,1.2,1.5,1.5,1.4,1.4,1.5,1.5,1.3,1.2,1.2,0.9,2.3,1.8,1.3,1.2,1.2,1.1,0.9,0.9,0.9,1.2,1.6,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,1.9,1.2,1.3,1.1,1.3,1.1,0.9,0.9,0.9,1.2,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,1.2,0.9,0.9,0.9,1.1,0.9,0.9,1.2,1.6,1.4,1.3,1.4,1.5,1.2,1.2,1.1,0.9,0.9,1.1,1.1,0.9,0.9,1.1,1.1,0.9,0.9,0.9,0.9,0.9,1.1,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,1.1,1.3,0.9,1.3,1.1,1.1,0.9,1.1,0.9,1.1,0.9,1.3,1.2,0.9,1.1,0.9,0.9,0.9,1.1,0.9,0.9,1.1,1.2,1.6,0.9,1.1,1.4,3.7,2.8,3.2,2.7,1.2,1.2,1.3,1.3,1.3,1.2,1.2,0.9,0.9,0.9,1.1,1.1,0.9,1.1,1.3,0.9,1.1,1.1,1.1,1.3,4.1,1.5,1.7,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.1,0.9,0.9,0.9,1.1,1.3,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,1.1,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,1.1,0.9,0.9,0.9,0.9,0.9,0.9,0.9,1.1,0.9,1.3,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9 ],
    "rest_mode_state": 0
  }
]

const googleEvents = [
  {
    p_timestamp: 1667445628000,
    p_datetime: "2022-11-03T03:20:28.681Z",
    p_latitude: 602447266,
    p_longitude: 247573079,
    p_accuracy: 32,
    p_altitude: 111,
    p_verticalaccuracy: 1,
    p_heading: 230,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Location",
  },
  {
    p_timestamp: 1667448169000,
    p_datetime: "2022-11-03T04:02:49.426Z",
    p_latitude: 602446995,
    p_longitude: 247574923,
    p_accuracy: 64,
    p_altitude: 111,
    p_verticalaccuracy: 1,
    p_heading: 200,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Location",
  },
  {
    p_timestamp: 1417576831121,
    p_datetime: "2014-12-03T03:20:31.121Z",
    p_type: "STILL",
    p_confidence: 87,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Activity",
  },
  {
    p_timestamp: 1417576831121,
    p_datetime: "2014-12-03T03:20:31.121Z",
    p_type: "UNKNOWN",
    p_confidence: 10,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Activity",
  },
  {
    p_timestamp: 1417576831121,
    p_datetime: "2014-12-03T03:20:31.121Z",
    p_type: "IN_VEHICLE",
    p_confidence: 3,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Activity",
  },
  {
    p_timestamp: 1417577043477,
    p_datetime: "2014-12-03T03:24:03.477Z",
    p_type: "STILL",
    p_confidence: 100,
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Activity",
  },
  {
    latitudeE7: 606224118,
    longitudeE7: 248047081,
    address: "Mäkikuumolantie 3\n05800 Hyvinkää\nSuomi",
    name: "Lidl Sveitsin Portaali",
    locationConfidence: 80,
    placeConfidence: "HIGH_CONFIDENCE",
    visitConfidence: 88,
    placeVisitType: "SINGLE_PLACE",
    placeVisitImportance: "MAIN",
    startTimestamp: "2022-02-01T09:24:24.250Z",
    endTimestamp: "2022-02-01T09:40:22.633Z",
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Place",
  },
  {
    latitudeE7: 606224118,
    longitudeE7: 248047081,
    address: "Mäkikuumolantie 3\n05800 Hyvinkää\nSuomi",
    name: "Lidl Sveitsin Portaali",
    locationConfidence: 80,
    placeConfidence: "HIGH_CONFIDENCE",
    visitConfidence: 88,
    placeVisitType: "SINGLE_PLACE",
    placeVisitImportance: "MAIN",
    startTimestamp: "2022-02-01T09:24:24.250Z",
    endTimestamp: "2022-02-01T09:55:22.633Z",
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Place",
  },
  {
    startLocation: { latitudeE7: 605841426, longitudeE7: 248303862 },
    endLocation: { latitudeE7: 606216471, longitudeE7: 248040694 },
    distance: 4410,
    confidence: "HIGH",
    activityType: "IN_PASSENGER_VEHICLE",
    startTimestamp: "2022-02-01T09:12:21.890Z",
    endTimestamp: "2022-02-01T09:24:24.250Z",
    prifinaSourceType: "Google",
    prifinaSourceEventType: "Route",
  }
]

const whoopEvents = [
  {
    "id": 1043,
    prifinaSourceType: "Whoop",
    prifinaSourceEventType: "Workout",
    "user_id": 9012,
    "created_at": "2022-04-24T11:25:44.774Z",
    "updated_at": "2022-04-24T14:25:44.774Z",
    "start": "2022-04-24T02:25:44.774Z",
    "end": "2022-04-24T10:25:44.774Z",
    "timezone_offset": "-05:00",
    "sport_id": 1,
    "score_state": "SCORED",
    "score": {
      "strain": 8.2463,
      "average_heart_rate": 123,
      "max_heart_rate": 146,
      "kilojoule": 1569.34033203125,
      "percent_recorded": 100,
      "distance_meter": 1772.77035916,
      "altitude_gain_meter": 46.64384460449,
      "altitude_change_meter": -0.781372010707855,
      "zone_duration": {
        "zone_zero_milli": 13458,
        "zone_one_milli": 389370,
        "zone_two_milli": 388367,
        "zone_three_milli": 71137,
        "zone_four_milli": 0,
        "zone_five_milli": 0
      }
    }
  },
  {
    "id": 93845,
    "user_id": 10129,
    prifinaSourceType: "Whoop",
    prifinaSourceEventType: "Cycle",
    "created_at": "2022-04-24T11:25:44.774Z",
    "updated_at": "2022-04-24T14:25:44.774Z",
    "start": "2022-04-24T02:25:44.774Z",
    "end": "2022-04-24T10:25:44.774Z",
    "timezone_offset": "-05:00",
    "score_state": "SCORED",
    "score": {
      "strain": 5.2951527,
      "kilojoule": 8288.297,
      "average_heart_rate": 68,
      "max_heart_rate": 141
    }
  },
  {
    "cycle_id": 93845,
    "sleep_id": 10235,
    "user_id": 10129,
    prifinaSourceType: "Whoop",
    prifinaSourceEventType: "Recovery",
    "created_at": "2022-04-24T11:25:44.774Z",
    "updated_at": "2022-04-24T14:25:44.774Z",
    "score_state": "SCORED",
    "score": {
      "user_calibrating": false,
      "recovery_score": 44,
      "resting_heart_rate": 64,
      "hrv_rmssd_milli": 31.813562,
      "spo2_percentage": 95.6875,
      "skin_temp_celsius": 33.7
    }
  },
  {
    "id": 93845,
    "user_id": 10129,
    prifinaSourceType: "Whoop",
    prifinaSourceEventType: "Sleep",
    "created_at": "2022-04-24T11:25:44.774Z",
    "updated_at": "2022-04-24T14:25:44.774Z",
    "start": "2022-04-24T02:25:44.774Z",
    "end": "2022-04-24T10:25:44.774Z",
    "timezone_offset": "-05:00",
    "nap": false,
    "score_state": "SCORED",
    "score": {
      "stage_summary": {
        "total_in_bed_time_milli": 30272735,
        "total_awake_time_milli": 1403507,
        "total_no_data_time_milli": 0,
        "total_light_sleep_time_milli": 14905851,
        "total_slow_wave_sleep_time_milli": 6630370,
        "total_rem_sleep_time_milli": 5879573,
        "sleep_cycle_count": 3,
        "disturbance_count": 12
      },
      "sleep_needed": {
        "baseline_milli": 27395716,
        "need_from_sleep_debt_milli": 352230,
        "need_from_recent_strain_milli": 208595,
        "need_from_recent_nap_milli": -12312
      },
      "respiratory_rate": 16.11328125,
      "sleep_performance_percentage": 98,
      "sleep_consistency_percentage": 90,
      "sleep_efficiency_percentage": 91.69533848
    }
  }
]

const twitchEvents = [
  {
    "id": "335921245",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "Videos",
    "stream_id": null,
    "user_id": "141981764",
    "user_login": "twitchdev",
    "user_name": "TwitchDev",
    "title": "Twitch Developers 101",
    "description": "Welcome to Twitch development! Here is a quick overview of our products and information to help you get started.",
    "created_at": "2018-11-14T21:30:18Z",
    "published_at": "2018-11-14T22:04:30Z",
    "url": "https://www.twitch.tv/videos/335921245",
    "thumbnail_url": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/twitchdev/335921245/ce0f3a7f-57a3-4152-bc06-0c6610189fb3/thumb/index-0000000000-%{width}x%{height}.jpg",
    "viewable": "public",
    "view_count": 1863062,
    "language": "en",
    "type": "upload",
    "duration": "3m21s",
    "muted_segments": [
      {
        "duration": 30,
        "offset": 120
      }
    ]
  },
  {
    "id": "141981764",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "Users",
    "login": "twitchdev",
    "display_name": "TwitchDev",
    "type": "",
    "broadcaster_type": "partner",
    "description": "Supporting third-party developers building Twitch integrations from chatbots to game integrations.",
    "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png",
    "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/3f13ab61-ec78-4fe6-8481-8682cb3b0ac2-channel_offline_image-1920x1080.png",
    "view_count": 5980557,
    "email": "not-real@email.com",
    "created_at": "2016-12-14T20:32:28Z"
  },
  {
    "user_id": "423374343",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "BannedUsers",
    "user_login": "glowillig",
    "user_name": "glowillig",
    "expires_at": "2022-03-15T02:00:28Z",
    "created_at": "2022-03-15T01:30:28Z",
    "reason": "Does not like pineapple on pizza.",
    "moderator_id": "141981764",
    "moderator_login": "twitchdev",
    "moderator_name": "TwitchDev"
  }
  ,
  {
    "user_id": "423374343",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "BannedUsers",
    "user_login": "glowillig",
    "user_name": "glowillig",
    "expires_at": "2022-03-15T02:30:28Z",
    "created_at": "2022-03-15T01:30:28Z",
    "reason": "Does not like pineapple on pizza.",
    "moderator_id": "141981765",
    "moderator_login": "twitchdev2",
    "moderator_name": "TwitchDev2"
  }
  ,
  {
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "BitsLeaderboard",
    "data": [
      {
        "user_id": "158010205",
        "user_login": "tundracowboy",
        "user_name": "TundraCowboy",
        "rank": 1,
        "score": 12543
      },
      {
        "user_id": "7168163",
        "user_login": "topramens",
        "user_name": "Topramens",
        "rank": 2,
        "score": 6900
      }
    ],
    "date_range": {
      "started_at": "2018-02-05T08:00:00Z",
      "ended_at": "2018-02-12T08:00:00Z"
    },
    "total": 2
  }, {
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "ChannelEditors",
    "user_id": "135093069",
    "user_name": "BlueLava",
    "created_at": "2018-03-07T16:28:29.872937Z"
  },{
    "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "Poll",
    "broadcaster_id": "55696719",
    "broadcaster_name": "TwitchDev",
    "broadcaster_login": "twitchdev",
    "title": "Heads or Tails?",
    "choices": [
      {
        "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
        "title": "Heads",
        "votes": 1,
        "channel_points_votes": 0,
        "bits_votes": 0
      },
      {
        "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
        "title": "Tails",
        "votes": 2,
        "channel_points_votes": 0,
        "bits_votes": 0
      }
    ],
    "bits_voting_enabled": false,
    "bits_per_vote": 0,
    "channel_points_voting_enabled": false,
    "channel_points_per_vote": 0,
    "status": "ACTIVE",
    "duration": 1800,
    "started_at": "2021-03-19T06:08:33.871278372Z"
  },
  {
    "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "Poll",
    "broadcaster_id": "55696719",
    "broadcaster_name": "TwitchDev",
    "broadcaster_login": "twitchdev",
    "title": "Heads or Tails?",
    "choices": [
      {
        "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
        "title": "Heads",
        "votes": 20,
        "channel_points_votes": 0,
        "bits_votes": 0
      },
      {
        "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
        "title": "Tails",
        "votes": 10,
        "channel_points_votes": 0,
        "bits_votes": 0
      }
    ],
    "bits_voting_enabled": false,
    "bits_per_vote": 0,
    "channel_points_voting_enabled": false,
    "channel_points_per_vote": 0,
    "status": "ACTIVE",
    "duration": 1800,
    "started_at": "2021-03-19T06:08:33.871278372Z"
  },
  {
    "id": "d6676d5c-c86e-44d2-bfc4-100fb48f0656",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "Prediction",
    "broadcaster_id": "55696719",
    "broadcaster_name": "TwitchDev",
    "broadcaster_login": "twitchdev",
    "title": "Will there be any leaks today?",
    "winning_outcome_id": null,
    "outcomes": [
      {
        "id": "021e9234-5893-49b4-982e-cfe9a0aaddd9",
        "title": "Yes",
        "users": 0,
        "channel_points": 0,
        "top_predictors": [
          {
            "user": {
              "id": "141981764",
              "name": "twitchdev",
              "login": "twitchdev",
              "channel_points_used": 20000,
              "channel_points_won": null,
            }
          }
        ],
        "color": "BLUE"
      },
      {
        "id": "ded84c26-13cb-4b48-8cb5-5bae3ec3a66e",
        "title": "No",
        "users": 0,
        "channel_points": 0,
        "top_predictors": null,
        "color": "PINK"
      }
    ],
    "prediction_window": 600,
    "status": "ACTIVE",
    "created_at": "2021-04-28T16:03:06.320848689Z",
    "ended_at": null,
    "locked_at": null
  },{
    "id": "1b0AsbInCHZW2SQFQkCzqN07Ib2",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "HypeTrainEvent",
    "event_type": "hypetrain.progression",
    "event_timestamp": "2020-04-24T20:07:24Z",
    "version": "1.0",
    "event_data": {
      "broadcaster_id": "270954519",
      "cooldown_end_time": "2020-04-24T20:13:21.003802269Z",
      "expires_at": "2020-04-24T20:12:21.003802269Z",
      "goal": 1800,
      "id": "70f0c7d8-ff60-4c50-b138-f3a352833b50",
      "last_contribution": {
        "total": 200,
        "type": "BITS",
        "user": "134247454"
      },
      "level": 2,
      "started_at": "2020-04-24T20:05:47.30473127Z",
      "top_contributions": [
        {
          "total": 600,
          "type": "BITS",
          "user": "134247450"
        }
      ],
      "total": 600
    }
  },{
    "id": "1woowvbkiNv8BRxEWSqmQz6Zk92",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "CreatorGoals",
    "broadcaster_id": "141981764",
    "broadcaster_name": "TwitchDev",
    "broadcaster_login": "twitchdev",
    "type": "follower",
    "description": "Follow goal for Helix testing",
    "current_amount": 27062,
    "target_amount": 30000,
    "created_at": "2021-08-16T17:22:23Z"
  },{
    "id": "eyJzZWdtZW50SUQiOiJlNGFjYzcyNC0zNzFmLTQwMmMtODFjYS0yM2FkYTc5NzU5ZDQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjoyNn0=",
    prifinaSourceType: "Twitch",
    prifinaSourceEventType: "ChannelStreamSchedule",
    "start_time": "2021-07-01T18:00:00Z",
    "end_time": "2021-07-01T19:00:00Z",
    "title": "TwitchDev Monthly Update // July 1, 2021",
    "canceled_until": null,
    "category": {
        "id": "509670",
        "name": "Science & Technology"
    },
    "is_recurring": false
  },
]

const events = [].concat(...ouraEvents,...googleEvents,...whoopEvents,...twitchEvents)



const varToString = (attr) => {
  var str = attr.split("_")
  for (var i = 0; i< str.length; i++){
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  str = str.join(" ")
  return str
}
// var myEventsList = []
const addEvent = (event) => {
  switch(event.prifinaSourceType){
    case "Oura":
      switch(event.prifinaSourceEventType){
        case "Readiness":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.summary_date}`,
            allDay: true,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.summary_date),
            end: new Date(event.summary_date),
            data: event,
          }
        case "SleepSummary":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.summary_date}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.bedtime_start),
            end: new Date(event.bedtime_end),
            data: event,
          }
        case "Activity":
          return{
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.summary_date}`,
            Day: true,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.summary_date),
            end: new Date(event.summary_date),
            data: event,
          }
        default:
          break
      }
      break
    case "Google":
      switch(event.prifinaSourceEventType){
        case "Route":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.startTimestamp.split("T")[0]}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.startTimestamp),
            end: new Date(event.endTimestamp),
            data: event,
          }
        case "Place":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.startTimestamp.split("T")[0]}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.startTimestamp),
            end: new Date(event.endTimestamp),
            data: event,
          }
        case "Activity":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.p_datetime}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.p_datetime),
            end: new Date((new Date(event.p_datetime)).getTime()+1),
            data: event,
          }
        case "Location":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.p_datetime}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.p_datetime),
            end: new Date((new Date(event.p_datetime)).getTime()+1),
            data: event,
          }
        default:
          break
      }
      break
    case "Whoop":
      switch(event.prifinaSourceEventType){
        case "Cycle":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.start),
            end: new Date(event.end),
            data: event,
          }
        case "Recovery":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
            allDay: true,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.created_at),
            end: new Date(event.created_at),
            data: event,
          }
        case "Sleep":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.updated_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.start),
            end: new Date(event.end),
            data: event,
          }
        case "Workout":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.updated_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.start),
            end: new Date(event.end),
            data: event,
          }
          break
        default:
          break
      }
      break  
    case "Twitch":
      switch(event.prifinaSourceEventType){
        case "BannedUsers":
          switch(event.expires_at){
            case "":
              return {
                title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
                allDay: false,
                // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
                // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
                start: new Date(event.created_at),
                end: new Date(event.created_at),
                data: event,
              }
            default:
              return {
                title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
                allDay: false,
                // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
                // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
                start: new Date(event.created_at),
                end: new Date(event.expires_at),
                data: event,
              }
          }
        case "BitsLeaderboard":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.date_range.started_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.date_range.started_at),
            end: new Date(event.date_range.ended_at),
            data: event,
          }
        case "ChannelStreamSchedule":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.title} - ${event.start_time}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.start_time),
            end: new Date(event.end_time),
            data: event,
          }
        case "CreatorGoals":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.created_at),
            end: new Date(event.created_at),
            data: event,
          }
        case "HypeTrainEvent":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.event_data.started_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.event_data.started_at),
            end: new Date(event.event_data.expires_at),
            data: event,
          }
        case "Poll":
          var ended_at = new Date(event.started_at)
          ended_at.setSeconds(ended_at.getSeconds()+event.duration)
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.started_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.started_at),
            end: ended_at,
            data: event,
          }
        case "Prediction":
          switch(event.ended_at){
            case null:
              return {
                title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
                allDay: false,
                // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
                // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
                start: new Date(event.created_at),
                end: new Date(event.created_at),
                data: event,
              }
            default:
              return {
                title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
                allDay: false,
                // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
                // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
                start: new Date(event.created_at),
                end: new Date(event.ended_at),
                data: event,
              }
          }
        case "ChannelEditors":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.user_name}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.created_at),
            end: new Date(event.created_at),
            data: event,
          }
        
        case "Users":
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.created_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.created_at),
            end: new Date(event.created_at),
            data: event,
          }
        case "Videos":
          var started_at = new Date(event.created_at)
          var ended_At = new Date(started_at.getTime())
          var duration = event.duration
          ended_At.setTime(ended_At.getTime()+parseInt(event.duration.split("m")[1]))
          if (duration.includes("h")){
            ended_At.setHours(ended_At.getHours()+parseInt(event.duration.split("h")[0]))
            duration = duration.split("h")[1]
          }
          if (duration.includes("m")){
            ended_At.setMinutes(ended_At.getMinutes()+parseInt(event.duration.split("m")[0]))
            duration = duration.split("m")[1]
          }
          if (duration.includes("s")){
            ended_At.setTime(ended_At.getTime()+parseInt(event.duration.split("s")[0]))
          }
          return {
            title: `${event.prifinaSourceType} ${event.prifinaSourceEventType} - ${event.title} - ${event.created_at}`,
            allDay: false,
            // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
            // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
            start: new Date(event.created_at),
            end: ended_At,
            data: event,
          }
        default:
          break
      }
      break    
    default:
      break
  }
}
console.log(events)
// for (var i =0; i< events.length;i++){
//   myEventsList.push(addEvent(events[i]))
//   console.log("myEventsList inital", myEventsList)
// }

function App() {
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const { views } = useMemo(
    () => ({
      views: {
        day:true,
        week: true,
        month: true,
        year: Year
      },
    }),
    []
  )

  const finalDay = () => {
    var date = new Date()
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date.getDate()

  }
  const [range, setRange] = useState({
    start: new Date(`${new Date().getFullYear()}-${(new Date()).getMonth()+1}-01`),
    end: new Date(`${new Date().getFullYear()}-${(new Date()).getMonth()+1}-${finalDay()}`)
  })
  const [test, setTest] = useState(null)
  const [view, setView] = useState("month")
  const [zoomData, setZoomData] = useState(0)
  const [sourcesShown, setSourcesShown] = useState({})
  const [typesShown, setTypesShown] = useState({})
  const [colors, setColors] = useState({
    "Google": "#4b001d",
    "Oura": "#1a472a",
    "Twitch": "#ab0013",
    "Whoop": "#fdef19"
  })
  const [color, setColor] = useState()
  const [date, setDate] = useState(new Date())
  const [filterEvents, setFilterEvents] = useState({
    "Google": true,
    "Oura": true,
    "Twitch": true,
    "Whoop": true
  })
  var initialEventList = []
  for (var i =0; i< events.length;i++){
    initialEventList.push(addEvent(events[i]))
    // console.log("myEventsList inital", initialEventList)
  }
  const [myEventsList, SetMyEventsList] = useState(initialEventList)


const onView = useCallback((newView) => {
  // console.log(newView)
  setView(newView)}, [setView])
const onRangeChange = useCallback((newRange) => {
  // console.log("newRange",newRange)
  setRange(newRange)}, [setRange])
const onSelectEvent = useCallback((event) => {
  // console.log(event)
  window.alert(JSON.stringify(event.data))}, [])


const onDrillDown = useCallback(
  (newDate) => {
    setDate(new Date(newDate))
    setView("day")
  },
  [setView]
)
const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
// const ReadinessZoom = getReadinessSummaryWeekData("ReadinessWeek",7)
// console.log("ReadinessZoom", ReadinessZoom)
// console.log()


const getZoomData = () => {
  var finalData = {}
  var sourceData = {}
  var typesShown = {}
  var filteredData
  // console.log("getZoomData")
  // console.log("RANGE", range)
  if (view === "week"){
    filteredData = myEventsList.filter((event)=>{
      // console.log("",event)
      for (var i = 0; i< range.length;i++){
        // console.log(range[i].getDate())
        if (range[i].getFullYear() === event.start.getFullYear()&&range[i].getMonth() === event.start.getMonth()&&range[i].getDate() === event.start.getDate()){
          return true
        }
      }
      return false
    })

    //Get All Sources
    var sources = {}
    for (var i = 0; i< filteredData.length;i++){
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    // console.log(sources)
    Object.entries(sources).forEach(([key, value])=>{
      finalData[key] = {}
      sourceData[key] = false
      typesShown[key] = {}

      switch(key){
        case "Oura":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Readiness":
                finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "SleepSummary":
                finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Activity":
                finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Google":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Activity":
                finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Location":
                finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Route":
                finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Place":
                finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Whoop":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Cycle":
                finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Recovery":
                finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Sleep":
                finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Workout":
                finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          })
          break    
        case "Twitch":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "BannedUsers":
                finalData[key][type] = getTwitchBannedUsersWeekData("BannedUsersWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Videos":
                finalData[key][type] = getTwitchVideosWeekData("VideosWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "BitsLeaderboard":
                finalData[key][type] = getTwitchBitsLeaderboardWeekData("BitsLeaderboardWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Poll":
                finalData[key][type] = getTwitchPollsWeekData("PollsWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "HypeTrainEvent":
                finalData[key][type] = getTwitchHypeTrainEventWeekData("HypeTrainEventWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          }) 
          break
        default:
          break
      }
    })

    //Collect All Data Based on Source and Group (e.g. Readiness)

    //Execute Zoom
    // finalData = {
    //   "oura":
    //     "readiness":
    //       "aggrega te"
    //       "aggregate"
    // }
    
  } else if (view === "month") {
    console.log("DataZoomEvents",myEventsList)
    filteredData = myEventsList.filter((event)=>{
      // console.log("",event)
        // console.log(range[i].getDate())
        if (range["start"].getTime() < event.start.getTime()&&range["end"].getTime() > event.start.getTime()){
          return true
        } else {
          return false
        }
    })
    // console.log(filteredData)
    var sources = {}
    for (var i = 0; i< filteredData.length;i++){
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    // console.log(sources)
    Object.entries(sources).forEach(([key, value])=>{
      finalData[key] = {}
      sourceData[key] = false
      typesShown[key] = {}

      switch(key){
        case "Oura":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Readiness":
                finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "SleepSummary":
                finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Activity":
                finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Google":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Activity":
                finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Location":
                finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Route":
                finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Place":
                finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Whoop":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Cycle":
                finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Recovery":
                finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Sleep":
                finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Workout":
                finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          })
          break    
        case "Twitch":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "BannedUsers":
                finalData[key][type] = getTwitchBannedUsersWeekData("BannedUsersWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Videos":
                finalData[key][type] = getTwitchVideosWeekData("VideosWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "BitsLeaderboard":
                finalData[key][type] = getTwitchBitsLeaderboardWeekData("BitsLeaderboardWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Poll":
                finalData[key][type] = getTwitchPollsWeekData("PollsWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "HypeTrainEvent":
                finalData[key][type] = getTwitchHypeTrainEventWeekData("HypeTrainEventWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          }) 
          break
        default:
          break
      }
    })
  } else if (view === "year") {
    var start = range[0]
    var end = new Date("2022-01-01")
    end.setFullYear(start.getFullYear() + 1)

    filteredData = myEventsList.filter((event)=>{
      // console.log("",event)
        // console.log(range[i].getDate())
        if (start.getTime() < event.start.getTime()&&end.getTime() > event.start.getTime()){
          return true
        } else {
          return false
        }
    })
    // console.log(filteredData)
    var sources = {}
    for (var i = 0; i< filteredData.length;i++){
      if (sources[filteredData[i].data.prifinaSourceType]===undefined){
        sources[filteredData[i].data.prifinaSourceType] = [filteredData[i].data.prifinaSourceEventType] 
      } else if (!sources[filteredData[i].data.prifinaSourceType].includes(filteredData[i].data.prifinaSourceEventType)) {
        sources[filteredData[i].data.prifinaSourceType].push(filteredData[i].data.prifinaSourceEventType)
      }
    }
    // console.log(sources)
    Object.entries(sources).forEach(([key, value])=>{
      finalData[key] = {}
      sourceData[key] = false
      typesShown[key] = {}

      switch(key){
        case "Oura":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Readiness":
                finalData[key][type] = getReadinessSummaryWeekData("ReadinessWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Readiness"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "SleepSummary":
                finalData[key][type] = getSleepSummaryWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "SleepSummary"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Activity":
                finalData[key][type] = getActivitySummaryWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === "Oura" && event.data.prifinaSourceEventType === "Activity"){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Google":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Activity":
                finalData[key][type] = getGoogleActivityWeekData("ActivityWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Location":
                finalData[key][type] = getGoogleLocationWeekData("LocationWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Route":
                finalData[key][type] = getGoogleRoutesWeekWeekData("RoutesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              case "Place":
                finalData[key][type] = getGooglePlacesWeekWeekData("PlacesWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                // console.log(finalData[key])
                break
              default:
                break
            }
          })
          break
        case "Whoop":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "Cycle":
                finalData[key][type] = getWhoopCycleWeekData("CycleWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Recovery":
                finalData[key][type] = getWhoopRecoveryWeekData("RecoveryWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Sleep":
                finalData[key][type] = getWhoopSleepWeekData("SleepWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Workout":
                finalData[key][type] = getWhoopWorkoutWeekData("WorkoutWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          })
          break
        case "Twitch":
          value.forEach((type)=>{
            finalData[key][type] = {}
            typesShown[key][type] = false
            switch(type){
              case "BannedUsers":
                finalData[key][type] = getTwitchBannedUsersWeekData("BannedUsersWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Videos":
                finalData[key][type] = getTwitchVideosWeekData("VideosWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "BitsLeaderboard":
                finalData[key][type] = getTwitchBitsLeaderboardWeekData("BitsLeaderboardWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "Poll":
                finalData[key][type] = getTwitchPollsWeekData("PollsWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              case "HypeTrainEvent":
                finalData[key][type] = getTwitchHypeTrainEventWeekData("HypeTrainEventWeek",[].concat(...filteredData.filter((event)=>{
                  if (event.data.prifinaSourceType === key && event.data.prifinaSourceEventType === type){
                    return true
                  } else {
                    return false
                  }
                }).map(b=>b.data)) )
                break
              default:
                break
            }
          }) 
          break
        default:
          break
      }
    })
  }
  // console.log(finalData)
  // console.log("sd",sourceData)
  setZoomData(finalData)
  setSourcesShown(sourceData)
  setTypesShown(typesShown)


}

const secondsDisplay = (total) => {
  var hours = Math.floor(Math.floor(total / 60)/60)
  var mintues = Math.floor(total / 60)%60
  var seconds = total % 60
  seconds.toFixed(3)
  if (seconds < 10){
    seconds =  `0${seconds}`
  }
  if (mintues < 10){
    mintues =  `0${mintues}`
  }
  if (hours < 10){
    hours =  `0${hours}`
  }
  return `${hours}:${mintues}:${seconds}`
}
const millisecondsDisplay = (total) => {
  var totalSeconds = Math.floor(total/1000)
  var milliseconds = total%1000
  var hours = Math.floor(Math.floor(totalSeconds / 60)/60)
  var mintues = Math.floor(totalSeconds / 60)%60
  var seconds = totalSeconds % 60
  seconds.toFixed(3)
  if (seconds < 10){
    seconds =  `0${seconds}`
  }
  if (mintues < 10){
    mintues =  `0${mintues}`
  }
  if (hours < 10){
    hours =  `0${hours}`
  }
  return `${hours}:${mintues}:${seconds}.${milliseconds}`
}

useEffect(() => {
  //Runs only on the first render
  getZoomData()
  // console.log(zoomData)
}, [range,myEventsList]);

useEffect(() => {
  //Runs only on the first render
  var filteredEvents = events.filter(event=>{
    if (filterEvents[event["prifinaSourceType"]]) {
      return true
    } else {
      return false
    }
  })
  var newEventsList = []
  for (var i =0; i< filteredEvents.length;i++){
    newEventsList.push(addEvent(filteredEvents[i]))
    
  }
  SetMyEventsList([...newEventsList])
  console.table("myEventsList",myEventsList)
  // console.log(zoomData)
}, [filterEvents]);

// useEffect(() => {
//   //Runs only on the first render
//   getZoomData()
//   // console.log(zoomData)
// }, [test]);

const dataView = (source, type, aggregateData) => {
  switch(view){
    case "week":
      switch(source){
        case "Oura":
          switch(type){
            case "Readiness":
              return (
                <>
                  <p>Score: {aggregateData.score}%</p>
                  <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
                  <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
                  <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
                  <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
                  <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
                  <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
                  <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
                  <p>Temperature Score: {aggregateData.score_temperature}%</p>
                </>
              )
            case "SleepSummary":
              return (
                <>
                  <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Efficiency: {aggregateData.efficiency}%</p>
                  <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
                  <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
                  <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
                    <>
                    +
                    </>
                  ): (
                    <>
                    </>
                  )}{aggregateData.rmssd.averageTrend}</p>
                </>
              )
            case "Activity":
              return (
                <>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
                  <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
                  <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
                  <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
                  <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
                  <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
                  <p>Highest MET Level: {aggregateData.met.high} MET</p>
                  <p>Lowest MET Level: {aggregateData.met.low} MET</p>
                </>
              )
            default:
              break
          }
          break
        case "Google":
          switch(type){
            case "Activity":
              return (
                <>
                  <p>Still Activities: {aggregateData.types["STILL"]}</p>
                  <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
                  <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
                  <p>Average Confidence: {aggregateData.confidence}%</p>
                </>
              )
            case "Location":
              // console.log("test")
              return (
                <>
                  <p>Average Accuracy: {aggregateData.accuracy}%</p>
                  <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
                  <p>Average Altitude: {aggregateData.altitude}m</p>
                </>
              )
            case "Place":
              return (
                <>
                  <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                  <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                  <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
                  <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
                  <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
                  <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
                  <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
                </>
              )
            case "Route":
              return (
                <>
                  <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                  <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                  <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Average Distance: {aggregateData.distance.avg}</p>
                  <p>Max Distance: {aggregateData.distance.max}</p>
                  <p>Minimum Distance: {aggregateData.distance.min}</p>
                  <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
                  <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
                  <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
                </>
              )
            default:
              break
          }
          break    
        case "Whoop":
          switch(type){
            case "Cycle":
              return (
                <>
                  <p>Time Bound of Cycle:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                </>
              )
            case "Recovery":
              return (
                <>
                  <p>Recovery Score:</p>
                  <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
                  <p>Resting Heart Rate:</p>
                  <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
                  <p>RMSSD:</p>
                  <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
                  <p>SpO2:</p>
                  <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
                  <p>Skin Temp:</p>
                  <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
                </>
              )
            case "Sleep":
              return (
                <>
                  <p>Time Spent Sleeping:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Respiratory Rate:</p>
                  <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
                  <p>Sleep Performance:</p>
                  <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
                  <p>Sleep Consistency:</p>
                  <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
                  <p>Sleep Efficiency:</p>
                  <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
                  <p>Disturbance Count: {aggregateData.disturbance_count}</p>
                </>
              )
            case "Workout":
              return (
                <>
                  <p>Time Spent Working Out:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                  <p>Max Heart Rate:</p>
                  <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Distance Travelled:</p>
                  <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
                  <p>Altitude Gain:</p>
                  <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
                  <p>Altitude Change:</p>
                  <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
                  <p>Zone Duration:</p>
                  <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
                  </p>
                </>
              )
            default:
              break
          }
          break    
        case "Twitch":
          switch(type){
            case "BannedUsers":
              return (
                <>
                  <p><strong>Ban Lengths:</strong></p>
                  <p>{millisecondsDisplay(aggregateData["ban_lengths"]["max"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["avg"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["min"])}</p>
                  <p>Bans Per Mod: {aggregateData["bans_per_mod"]}</p>
                  <p>Mod(s) with Most Bans:</p>
                  {console.log("aggregateData",aggregateData)}
                  <p>{aggregateData["most_banning_mod"]["display_name"].join(", ")}:{aggregateData["most_banning_mod"]["num_of_bans"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Videos":
              return (
                <>
                  {console.log("aggregateData Videos",aggregateData)}
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Viewcounts:</strong></p>
                  <p>{aggregateData["view_count"]["min"]}|{aggregateData["view_count"]["avg"]}|{aggregateData["view_count"]["max"]}|{aggregateData["view_count"]["total"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "BitsLeaderboard":
              return (
                <>
                  <p><strong>scores:</strong></p>
                  <p>{aggregateData["scores"]["min"]}|{aggregateData["scores"]["avg"]}|{aggregateData["scores"]["max"]}|{aggregateData["scores"]["total"]}</p>
                  <p><strong>Most Donos:</strong></p>
                  <ul>
                  {
                    aggregateData["most_donos"].map((obj)=>(
                      <>
                        <li>{obj["user_name"]} - {obj["score"]}</li>
                      </>
                    ))
                  }
                  </ul>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Poll":
              return (
                <>
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Total Votes:</strong></p>
                  <p>{aggregateData.total_votes.min}|{aggregateData.total_votes.avg}|{aggregateData.total_votes.max}|{aggregateData.total_votes.total}</p>
                  <p><strong>Total Votes Per Poll:</strong></p>
                  <p>{aggregateData.total_votes_per_poll.avg_min}|{aggregateData.total_votes_per_poll.avg}|{aggregateData.total_votes_per_poll.avg_max}</p>
                </>
              )
            case "HypeTrainEvent":
              return (
                <>
                  <p><strong>Total Points Used:</strong></p>
                  <p>{aggregateData.total.min}|{aggregateData.total.avg}|{aggregateData.total.max}|{aggregateData.total.total}</p>
                  <p><strong>Average Level:</strong> {aggregateData["level"]}</p>
                </>
              )
            case "Prediction":
              return (
                <>
                  <p><strong>Total Users:</strong> {aggregateData["total_users"]}</p>
                  <p><strong>Total Users Per Prediction:</strong> {aggregateData["total_users_per_prediction"]}</p>
                </>
              )
            default:
              break
          }
          break
        default:
          break
      }
      break
    case "month":
      switch(source){
        case "Oura":
          switch(type){
            case "Readiness":
              return (
                <>
                  <p>Score: {aggregateData.score}%</p>
                  <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
                  <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
                  <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
                  <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
                  <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
                  <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
                  <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
                  <p>Temperature Score: {aggregateData.score_temperature}%</p>
                </>
              )
            case "SleepSummary":
              return (
                <>
                  <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Efficiency: {aggregateData.efficiency}%</p>
                  <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
                  <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
                  <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
                    <>
                    +
                    </>
                  ): (
                    <>
                    </>
                  )}{aggregateData.rmssd.averageTrend}</p>
                </>
              )
            case "Activity":
              return (
                <>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
                  <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
                  <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
                  <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
                  <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
                  <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
                  <p>Highest MET Level: {aggregateData.met.high} MET</p>
                  <p>Lowest MET Level: {aggregateData.met.low} MET</p>
                </>
              )
            default:
              break
          }
          break
        case "Google":
          switch(type){
            case "Activity":
              return (
                <>
                  <p>Still Activities: {aggregateData.types["STILL"]}</p>
                  <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
                  <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
                  <p>Average Confidence: {aggregateData.confidence}%</p>
                </>
              )
            case "Location":
              // console.log("test")
              return (
                <>
                  <p>Average Accuracy: {aggregateData.accuracy}%</p>
                  <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
                  <p>Average Altitude: {aggregateData.altitude}m</p>
                </>
              )
            case "Place":
              return (
                <>
                  <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                  <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                  <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
                  <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
                  <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
                  <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
                  <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
                </>
              )
            case "Route":
              return (
                <>
                  <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                  <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                  <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Average Distance: {aggregateData.distance.avg}</p>
                  <p>Max Distance: {aggregateData.distance.max}</p>
                  <p>Minimum Distance: {aggregateData.distance.min}</p>
                  <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
                  <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
                  <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
                </>
              )
            default:
              break
          }
          break
        case "Whoop":
          switch(type){
            case "Cycle":
              return (
                <>
                  <p>Time Bound of Cycle:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                </>
              )
            case "Recovery":
              return (
                <>
                  <p>Recovery Score:</p>
                  <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
                  <p>Resting Heart Rate:</p>
                  <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
                  <p>RMSSD:</p>
                  <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
                  <p>SpO2:</p>
                  <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
                  <p>Skin Temp:</p>
                  <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
                </>
              )
            case "Sleep":
              return (
                <>
                  <p>Time Spent Sleeping:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Respiratory Rate:</p>
                  <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
                  <p>Sleep Performance:</p>
                  <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
                  <p>Sleep Consistency:</p>
                  <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
                  <p>Sleep Efficiency:</p>
                  <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
                  <p>Disturbance Count: {aggregateData.disturbance_count}</p>
                </>
              )
            case "Workout":
              return (
                <>
                  <p>Time Spent Working Out:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                  <p>Max Heart Rate:</p>
                  <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Distance Travelled:</p>
                  <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
                  <p>Altitude Gain:</p>
                  <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
                  <p>Altitude Change:</p>
                  <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
                  <p>Zone Duration:</p>
                  <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
                  </p>
                </>
              )
            default:
              break
          }
          break  
        case "Twitch":
          switch(type){
            case "BannedUsers":
              return (
                <>
                  <p><strong>Ban Lengths:</strong></p>
                  <p>{millisecondsDisplay(aggregateData["ban_lengths"]["max"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["avg"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["min"])}</p>
                  <p>Bans Per Mod: {aggregateData["bans_per_mod"]}</p>
                  <p>Mod(s) with Most Bans:</p>
                  {console.log("aggregateData",aggregateData)}
                  <p>{aggregateData["most_banning_mod"]["display_name"].join(", ")}:{aggregateData["most_banning_mod"]["num_of_bans"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Videos":
              return (
                <>
                  {console.log("aggregateData Videos",aggregateData)}
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Viewcounts:</strong></p>
                  <p>{aggregateData["view_count"]["min"]}|{aggregateData["view_count"]["avg"]}|{aggregateData["view_count"]["max"]}|{aggregateData["view_count"]["total"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "BitsLeaderboard":
              return (
                <>
                  <p><strong>scores:</strong></p>
                  <p>{aggregateData["scores"]["min"]}|{aggregateData["scores"]["avg"]}|{aggregateData["scores"]["max"]}|{aggregateData["scores"]["total"]}</p>
                  <p><strong>Most Donos:</strong></p>
                  <ul>
                  {
                    aggregateData["most_donos"].map((obj)=>(
                      <>
                        <li>{obj["user_name"]} - {obj["score"]}</li>
                      </>
                    ))
                  }
                  </ul>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Poll":
              return (
                <>
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Total Votes:</strong></p>
                  <p>{aggregateData.total_votes.min}|{aggregateData.total_votes.avg}|{aggregateData.total_votes.max}|{aggregateData.total_votes.total}</p>
                  <p><strong>Total Votes Per Poll:</strong></p>
                  <p>{aggregateData.total_votes_per_poll.avg_min}|{aggregateData.total_votes_per_poll.avg}|{aggregateData.total_votes_per_poll.avg_max}</p>
                </>
              )
            case "HypeTrainEvent":
              return (
                <>
                  <p><strong>Total Points Used:</strong></p>
                  <p>{aggregateData.total.min}|{aggregateData.total.avg}|{aggregateData.total.max}|{aggregateData.total.total}</p>
                  <p><strong>Average Level:</strong> {aggregateData["level"]}</p>
                </>
              )
            case "Prediction":
              return (
                <>
                  <p><strong>Total Users:</strong> {aggregateData["total_users"]}</p>
                  <p><strong>Total Users Per Prediction:</strong> {aggregateData["total_users_per_prediction"]}</p>
                </>
              )
            default:
              break
          }
          break
        default:
          break
      }
      break
    case "year":
      switch(source){
        case "Oura":
          switch(type){
            case "Readiness":
              return (
                <>
                  <p>Score: {aggregateData.score}%</p>
                  <p>Previous Night Score: {aggregateData.score_previous_night}%</p>
                  <p>Sleep Balance Score: {aggregateData.score_sleep_balance}%</p>
                  <p>Previous Day Score: {aggregateData.score_previous_day}%</p>
                  <p>Activity Balance Score: {aggregateData.score_activity_balance}%</p>
                  <p>Resting HR Score: {aggregateData.score_resting_hr}%</p>
                  <p>HRV Balance Score: {aggregateData.score_hrv_balance}%</p>
                  <p>Recovery Index Score: {aggregateData.score_recovery_index}%</p>
                  <p>Temperature Score: {aggregateData.score_temperature}%</p>
                </>
              )
            case "SleepSummary":
              return (
                <>
                  <p>Sleep (hrs): {secondsDisplay(aggregateData.sleep.total)}/{secondsDisplay(aggregateData.sleep.duration)} <i>({secondsDisplay(aggregateData.sleep.avgTotal)}/{secondsDisplay(aggregateData.sleep.avgDuration)})</i></p>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Efficiency: {aggregateData.efficiency}%</p>
                  <p>Average Heart Rate: {aggregateData.hr_average}bpm</p>
                  <p>Average Respiratory Rate: {aggregateData.breath_average}b/m</p>
                  <p>Trend of HRRV: {aggregateData.rmssd.averageTrend> 0 ? (
                    <>
                    +
                    </>
                  ): (
                    <>
                    </>
                  )}{aggregateData.rmssd.averageTrend}</p>
                </>
              )
            case "Activity":
              return (
                <>
                  <p>Average Score: {aggregateData.score}%</p>
                  <p>Average Day Movement: {aggregateData.movement.avgSteps} steps + {aggregateData.movement.avgMovement}m</p>
                  <p>Total Movement: {aggregateData.movement.totalSteps} steps + {aggregateData.movement.totalMovement}m</p>
                  <p>Non-Wear: {aggregateData.non_wear.percent.toFixed(3)}%</p>
                  <p>Inactivity Alerts: {aggregateData.inactivity_alerts}</p>
                  <p>Calories Burnt (kcals): {aggregateData.cals.totalCalActive}/{aggregateData.cals.totalCalTotal} <i>({aggregateData.cals.avgCalActive}/{aggregateData.cals.avgCalTotal})</i></p>
                  <p>Average MET Level: {aggregateData.met.avg.toFixed(3)} MET</p>
                  <p>Highest MET Level: {aggregateData.met.high} MET</p>
                  <p>Lowest MET Level: {aggregateData.met.low} MET</p>
                </>
              )
            default:
              break
          }
          break
        case "Google":
        switch(type){
          case "Activity":
            return (
              <>
                <p>Still Activities: {aggregateData.types["STILL"]}</p>
                <p>In Vehicle Activities: {aggregateData.types["IN_VEHICLE"]}</p>
                <p>Unknown Activities: {aggregateData.types["UNKNOWN"]}</p>
                <p>Average Confidence: {aggregateData.confidence}%</p>
              </>
            )
          case "Location":
            // console.log("test")
            return (
              <>
                <p>Average Accuracy: {aggregateData.accuracy}%</p>
                <p>Average Vertical Accuracy: {aggregateData.verticalAccuracy}%</p>
                <p>Average Altitude: {aggregateData.altitude}m</p>
              </>
            )
          case "Place":
            return (
              <>
                <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                <p>Longest Stay: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                <p>Shortest Stay: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                <p>Average Location Confidence: {aggregateData.locationConfidence}%</p>
                <p>Average Visit Confidence: {aggregateData.visitConfidence}%</p>
                <p>High Confidence: {aggregateData.placeConfidence["HIGH_CONFIDENCE"]}</p>
                <p>Medium Confidence: {aggregateData.placeConfidence["MEDIUM_CONFIDENCE"]}</p>
                <p>Low Confidence: {aggregateData.placeConfidence["LOW_CONFIDENCE"]}</p>
              </>
            )
          case "Route":
            return (
              <>
                <p>Average Time Spent: {millisecondsDisplay(aggregateData.timeSpent.avg)}</p>
                <p>Longest Route: {millisecondsDisplay(aggregateData.timeSpent.max)}</p>
                <p>Shortest Route: {millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                <p>Average Distance: {aggregateData.distance.avg}</p>
                <p>Max Distance: {aggregateData.distance.max}</p>
                <p>Minimum Distance: {aggregateData.distance.min}</p>
                <p>High Confidence: {aggregateData.confidence["HIGH"]}</p>
                <p>Medium Confidence: {aggregateData.confidence["MEDIUM"]}</p>
                <p>Low Confidence: {aggregateData.confidence["LOW"]}</p>
              </>
            )
          default:
            break
        }
        break
        case "Whoop":
          switch(type){
            case "Cycle":
              return (
                <>
                  <p>Time Bound of Cycle:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                </>
              )
            case "Recovery":
              return (
                <>
                  <p>Recovery Score:</p>
                  <p>{aggregateData.recovery_score.max}|{aggregateData.recovery_score.avg}|{aggregateData.recovery_score.min}</p>
                  <p>Resting Heart Rate:</p>
                  <p>{aggregateData.resting_heart_rate.max}|{aggregateData.resting_heart_rate.avg}|{aggregateData.resting_heart_rate.min}</p>
                  <p>RMSSD:</p>
                  <p>{aggregateData.hrv_rmssd_milli.max}|{aggregateData.hrv_rmssd_milli.avg}|{aggregateData.hrv_rmssd_milli.min}</p>
                  <p>SpO2:</p>
                  <p>{aggregateData.spo2_percentage.max}|{aggregateData.spo2_percentage.avg}|{aggregateData.spo2_percentage.min}</p>
                  <p>Skin Temp:</p>
                  <p>{aggregateData.skin_temp_celsius.max}|{aggregateData.skin_temp_celsius.avg}|{aggregateData.skin_temp_celsius.min}</p>
                </>
              )
            case "Sleep":
              return (
                <>
                  <p>Time Spent Sleeping:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Respiratory Rate:</p>
                  <p>{aggregateData.respiratory_rate.max}|{aggregateData.respiratory_rate.avg}|{aggregateData.respiratory_rate.min}</p>
                  <p>Sleep Performance:</p>
                  <p>{aggregateData.sleep_performance_percentage.max}|{aggregateData.sleep_performance_percentage.avg}|{aggregateData.sleep_performance_percentage.min}</p>
                  <p>Sleep Consistency:</p>
                  <p>{aggregateData.sleep_consistency_percentage.max}|{aggregateData.sleep_consistency_percentage.avg}|{aggregateData.sleep_consistency_percentage.min}</p>
                  <p>Sleep Efficiency:</p>
                  <p>{aggregateData.sleep_efficiency_percentage.max}|{aggregateData.sleep_efficiency_percentage.avg}|{aggregateData.sleep_efficiency_percentage.min}</p>
                  <p>Disturbance Count: {aggregateData.disturbance_count}</p>
                </>
              )
            case "Workout":
              return (
                <>
                  <p>Time Spent Working Out:</p>
                  <p>{millisecondsDisplay(aggregateData.timeSpent.max)}|{millisecondsDisplay(aggregateData.timeSpent.avg)}|{millisecondsDisplay(aggregateData.timeSpent.min)}</p>
                  <p>Strain:</p>
                  <p>{aggregateData.strain.max}|{aggregateData.strain.avg}|{aggregateData.strain.min}</p>
                  <p>Average Heart Rate:</p>
                  <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p>
                  <p>Max Heart Rate:</p>
                  <p>{aggregateData.max_heart_rate.max}|{aggregateData.max_heart_rate.avg}|{aggregateData.max_heart_rate.min}</p>
                  <p>Kilojoule:</p>
                  <p>{aggregateData.kilojoule.max}|{aggregateData.kilojoule.avg}|{aggregateData.kilojoule.min}</p>
                  <p>Distance Travelled:</p>
                  <p>{aggregateData.distance_meter.max}|{aggregateData.distance_meter.avg}|{aggregateData.distance_meter.min}</p>
                  <p>Altitude Gain:</p>
                  <p>{aggregateData.altitude_gain_meter.max}|{aggregateData.altitude_gain_meter.avg}|{aggregateData.altitude_gain_meter.min}</p>
                  <p>Altitude Change:</p>
                  <p>{aggregateData.altitude_change_meter.max}|{aggregateData.altitude_change_meter.avg}|{aggregateData.altitude_change_meter.min}</p>
                  <p>Zone Duration:</p>
                  <p>{aggregateData.zone_duration.zone_zero_milli.val}({aggregateData.zone_duration.zone_zero_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_one_milli.val}({aggregateData.zone_duration.zone_one_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_two_milli.val}({aggregateData.zone_duration.zone_two_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_three_milli.val}({aggregateData.zone_duration.zone_three_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_four_milli.val}({aggregateData.zone_duration.zone_four_milli.percent}%)|<br/>
                  {aggregateData.zone_duration.zone_five_milli.val}({aggregateData.zone_duration.zone_five_milli.percent}%)|<br/>
                  </p>
                </>
              )
            default:
              break
          }
          break  
        case "Twitch":
          switch(type){
            case "BannedUsers":
              return (
                <>
                  <p><strong>Ban Lengths:</strong></p>
                  <p>{millisecondsDisplay(aggregateData["ban_lengths"]["max"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["avg"])}|{millisecondsDisplay(aggregateData["ban_lengths"]["min"])}</p>
                  <p>Bans Per Mod: {aggregateData["bans_per_mod"]}</p>
                  <p>Mod(s) with Most Bans:</p>
                  <p>{aggregateData["most_banning_mod"]["display_name"].join(", ")}:{aggregateData["most_banning_mod"]["num_of_bans"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Videos":
              return (
                <>
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Viewcounts:</strong></p>
                  <p>{aggregateData["view_count"]["min"]}|{aggregateData["view_count"]["avg"]}|{aggregateData["view_count"]["max"]}|{aggregateData["view_count"]["total"]}</p>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "BitsLeaderboard":
              return (
                <>
                  <p><strong>scores:</strong></p>
                  <p>{aggregateData["scores"]["min"]}|{aggregateData["scores"]["avg"]}|{aggregateData["scores"]["max"]}|{aggregateData["scores"]["total"]}</p>
                  <p><strong>Most Donos:</strong></p>
                  <ul>
                  {
                    aggregateData["most_donos"].map((obj)=>(
                      <>
                        <li>{obj["user_name"]} - {obj["score"]}</li>
                      </>
                    ))
                  }
                  </ul>
                  {/* <p>{aggregateData.average_heart_rate.max}|{aggregateData.average_heart_rate.avg}|{aggregateData.average_heart_rate.min}</p> */}
                </>
              )
            case "Poll":
              return (
                <>
                  <p><strong>Durations:</strong></p>
                  <p>{secondsDisplay(aggregateData["durations"]["min"])}|{secondsDisplay(aggregateData["durations"]["avg"])}|{secondsDisplay(aggregateData["durations"]["max"])}|{secondsDisplay(aggregateData["durations"]["total"])}</p>
                  <p><strong>Total Votes:</strong></p>
                  <p>{aggregateData.total_votes.min}|{aggregateData.total_votes.avg}|{aggregateData.total_votes.max}|{aggregateData.total_votes.total}</p>
                  <p><strong>Total Votes Per Poll:</strong></p>
                  <p>{aggregateData.total_votes_per_poll.avg_min}|{aggregateData.total_votes_per_poll.avg}|{aggregateData.total_votes_per_poll.avg_max}</p>
                </>
              )
            case "HypeTrainEvent":
              return (
                <>
                  <p><strong>Total Points Used:</strong></p>
                  <p>{aggregateData.total.min}|{aggregateData.total.avg}|{aggregateData.total.max}|{aggregateData.total.total}</p>
                  <p><strong>Average Level:</strong> {aggregateData["level"]}</p>
                </>
              )
            case "Prediction":
              return (
                <>
                  <p><strong>Total Users:</strong> {aggregateData["total_users"]}</p>
                  <p><strong>Total Users Per Prediction:</strong> {aggregateData["total_users_per_prediction"]}</p>
                </>
              )
            default:
              break
          }
          break
        default:
          break
      }
      break
    default:
      break
  }
}

const lengthCalc = (source) => {
  var num = 0
  Object.entries(zoomData[source]).map(([type, value])=>{
    num += zoomData[source][type]["length"]
  })
  return num
}

const exapndAll = (bool) => {
  var newSourcesShown = {}
  var newTypesShown = {}
  Object.entries(zoomData).map(([source, value])=>{
    newSourcesShown[source] = bool
    newTypesShown[source] = {}
    Object.entries(zoomData[source]).map(([type, value])=>{
      newTypesShown[source][type] = bool
    })
  })
  setSourcesShown(newSourcesShown)
  setTypesShown(newTypesShown)
}

// const myEventsList = [
//   {
//     title: `Oura Readiness - ${ReadinessZoom.display[0].summary_date}`,
//     allDay: true,
//     // start: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     // end: new Date(parseInt(ReadinessZoom.display[0].summary_date.split("-")[0]), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//     start: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2])),
//     end: new Date(parseInt(2022), parseInt(ReadinessZoom.display[0].summary_date.split("-")[1])+1, parseInt(ReadinessZoom.display[0].summary_date.split("-")[2]))
//   }
// ]


const eventStyleGetter = (event, start, end, isSelected) => {
  return {
    style: {
      opacity: isSelected ? 1 : 0.9,
      borderColor: colors[event.data.prifinaSourceType],
      backgroundColor: colors[event.data.prifinaSourceType],
    },
  };
};

  return (
    <>
    <div className="body">
    <div className="sidebar">
      <h1> Aggregate data</h1>
      <div id="1">
      <button onClick={()=>{exapndAll(true)}}>Expand All</button>
      <button onClick={()=>{exapndAll(false)}}>Collapse All</button>
        {/* {zoomData} */}
      {view === "month"? (
        <>
        <h2>Month View</h2>
        {
          Object.entries(zoomData).map(([source, value])=>(
              <>
              <p><button onClick={() => {
                setSourcesShown({
                  ...sourcesShown,
                  [source]: !sourcesShown[source]
                }
                )
              }}>{sourcesShown[source] ? (
                <>
                ▾
                </>
              ):(<>
              ▸
              </>)}</button>{source} - {lengthCalc(source)}</p>
              {
                    sourcesShown[source] ? (
                      <>
                      {
                          Object.entries(zoomData[source]).map(([type, value])=>(
                            <>
                            <div style={{marginLeft:"5%"}}>
                            <p><button onClick={() => {
                              setTypesShown({
                                ...typesShown,
                                [source]: {
                                  ...typesShown[source],
                                  [type]: !typesShown[source][type]
                                }
                              }
                              )
                            }}>{typesShown[source][type] ? (
                              <>
                              ▾
                              </>
                            ):(<>
                            ▸
                            </>)}</button>{type} - {zoomData[source][type]["length"]}</p>
                            {
                              typesShown[source][type] ? (
                                dataView(source,type,zoomData[source][type]["aggregate"])
                              ) : (
                                <>
                                </>
                              ) 
                            }
                            </div>
                            </>
                          ))
                        }
                      </>
                    ) : (
                      <>
                      </>
                    ) 
                  }
              
              </>
          ))
        }
        </>
      ): (
        <>
        </>
      )}
      {view === "week"? (
        <>
        <h2>Week View</h2>
        {
          Object.entries(zoomData).map(([source, value])=>(
              <>
              <p><button onClick={() => {
                setSourcesShown({
                  ...sourcesShown,
                  [source]: !sourcesShown[source]
                }
                )
              }}>{sourcesShown[source] ? (
                <>
                ▾
                </>
              ):(<>
              ▸
              </>)}</button>{source} - {lengthCalc(source)}</p>
              {
                    sourcesShown[source] ? (
                      <>
                      {
                          Object.entries(zoomData[source]).map(([type, value])=>(
                            <>
                            <div style={{marginLeft:"5%"}}>
                            <p><button onClick={() => {
                              setTypesShown({
                                ...typesShown,
                                [source]: {
                                  ...typesShown[source],
                                  [type]: !typesShown[source][type]
                                }
                              }
                              )
                            }}>{typesShown[source][type] ? (
                              <>
                              ▾
                              </>
                            ):(<>
                            ▸
                            </>)}</button>{type} - {zoomData[source][type]["length"]}</p>
                            {
                              typesShown[source][type] ? (
                                dataView(source,type,zoomData[source][type]["aggregate"])
                              ) : (
                                <>
                                </>
                              ) 
                            }
                            </div>
                            </>
                          ))
                        }
                      </>
                    ) : (
                      <>
                      </>
                    ) 
                  }
              
              </>
          ))
        }
        </>
      ): (
        <>
        
        </>
      )}
      {view === "year"? (
        <>
        <h2>Year View</h2>
        {
          Object.entries(zoomData).map(([source, value])=>(
              <>
              <p><button onClick={() => {
                setSourcesShown({
                  ...sourcesShown,
                  [source]: !sourcesShown[source]
                }
                )
              }}>{sourcesShown[source] ? (
                <>
                ▾
                </>
              ):(<>
              ▸
              </>)}</button>{source} - {lengthCalc(source)}</p>
              {
                    sourcesShown[source] ? (
                      <>
                      {
                          Object.entries(zoomData[source]).map(([type, value])=>(
                            <>
                            <div style={{marginLeft:"5%"}}>
                            <p><button onClick={() => {
                              setTypesShown({
                                ...typesShown,
                                [source]: {
                                  ...typesShown[source],
                                  [type]: !typesShown[source][type]
                                }
                              }
                              )
                            }}>{typesShown[source][type] ? (
                              <>
                              ▾
                              </>
                            ):(<>
                            ▸
                            </>)}</button>{type} - {zoomData[source][type]["length"]}</p>
                            {
                              typesShown[source][type] ? (
                                dataView(source,type,zoomData[source][type]["aggregate"])
                              ) : (
                                <>
                                </>
                              ) 
                            }
                            </div>
                            </>
                          ))
                        }
                      </>
                    ) : (
                      <>
                      </>
                    ) 
                  }
              
              </>
          ))
        }
        </>
      ): (
        <>
        </>
      )}
      </div>
      <div>
        {
          Object.entries(filterEvents).map(([source, value])=>(
            <>
            <input type={"checkbox"} checked={value} onChange={()=>{
              console.log(`${source} checkbox`)
              setFilterEvents({
                ...filterEvents,
                [source]: !filterEvents[source]
              })
            }}/>
            <input type={"color"} value={colors[source]} onChange={(e)=>{
              setColors({
                ...colors,
                [source]: e.target.value
              })
            }}></input>
            <label>{source}</label><br/>
            </>
          ))
        }
      </div>
    </div>
    <Calendar className="calendar"
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      onView={onView}
      view={view}
      onRangeChange={onRangeChange}
      style={{height: 500, margin:"50px" }}
      onSelectEvent={onSelectEvent}
      toolbar={true}
      views={views}
      messages={{ year: "Year" }}
      onDrillDown={onDrillDown}
      date={date}
      onNavigate={onNavigate}
      eventPropGetter={eventStyleGetter}
    />
    </div>
    </>
  );
}

export default App;
