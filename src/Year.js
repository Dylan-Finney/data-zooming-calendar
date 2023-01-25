// import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

// import dates from 'react-big-calendar/lib/utils/dates'
import * as dates from 'date-arithmetic'
import { navigate } from 'react-big-calendar/lib/utils/constants'

function createCalendar(currentDate) {
  if (!currentDate) {
    currentDate = moment()
  } else {
    currentDate = moment(currentDate)
  }

  const first = currentDate.clone().startOf('month')
  const last = currentDate.clone().endOf('month')
  const weeksCount = Math.ceil((first.day() + last.date()) / 7)
  const calendar = Object.assign([], { currentDate, first, last })

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
    const week = []
    calendar.push(week)
    calendar.year = currentDate.year()
    calendar.month = currentDate.month()

    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
      const date = currentDate.clone().set('date', day + 1 - first.day())
      date.calendar = calendar
      week.push(date)
    }
  }
  return calendar
}

function CalendarDate(props) {
  const { dateToRender, dateOfMonth } = props
  const checkIfHasEvents = () => {
    switch(props.events.length){
      case 0:
        return ""
      case 1:
      case 2:
        return "event-date-low"
      case 3:
      case 4:
      case 5:
        return "event-date-medium"
      default:
        return "event-date-high"
    }
  }
  const today =
    dateToRender.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'today'
      : ''

  if (dateToRender.month() < dateOfMonth.month()) {
    return (
      <button disabled={true} className={`date prev-month ${checkIfHasEvents()}`}>
        {dateToRender.date()}
      </button>
    )
  }

  if (dateToRender.month() > dateOfMonth.month()) {
    return (
      <button disabled={true} className={`date next-month ${checkIfHasEvents()}`}>
        {dateToRender.date()}
      </button>
    )
  }
  

  return (
    <button
      className={`date in-month ${today} ${checkIfHasEvents()}`}
      onClick={() => props.onClick(dateToRender)}>
      {dateToRender.date()}
    </button>
  )
}

class Calendar extends React.Component {
  state = {
    calendar: undefined
  }

  componentDidMount() {
    this.setState({ calendar: createCalendar(this.props.date) })
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.setState({ calendar: createCalendar(this.props.date) })
    }
  }

  render() {
    if (!this.state.calendar) {
      return null
    }

    return (
      <div className="month">
        <div className="month-name">
          {this.state.calendar.currentDate.format('MMMM').toUpperCase()}
        </div>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={index} className="day">
            {day}
          </span>
        ))}
        {this.state.calendar.map((week, index) => (
          <div key={index}>
            {/* {console.log("week",week)} */}
            {week.map(date => (
              <>
              {/* {console.log("date",date.toDate())} */}
              <CalendarDate
                key={date.date()}
                dateToRender={date}
                dateOfMonth={this.state.calendar.currentDate}
                onClick={date =>
                  // alert(`Will go to daily-view of ${date.format('YYYY-MM-DD')}`)
                  this.props.onDrillDown(date.format('YYYY-MM-DD'))
                }
                events={this.props.events.filter(event=>{
                 if (event.start.toDateString() === date.toDate().toDateString() || event.end.getTime()<=date.toDate().toDateString()){
                  return true
                 } else {
                  return false
                 } 
                })}
              />
              </>
              
            ))}
          </div>
        ))}
      </div>
    )
  }
}

class Year extends React.Component {
  
  render() {
    // console.log("Year Props", this.props)
    let { date, ...props } = this.props
    let events = this.props.events
    let onDrillDown = this.props.onDrillDown
    let filteredEvents = events.filter((event)=>{
      if (event.end.getFullYear() === date.getFullYear()||event.start.getFullYear() === date.getFullYear()) {
        return true
      } else {
        return false
      }
    })
    // console.log("date",date)
    // console.log("filteredEvents",filteredEvents)
    let range = Year.range(date)
    const months = []
    const firstMonth = dates.startOf(date, 'year')

    for (let i = 0; i < 12; i++) {
      months.push(
        <Calendar key={i + 1} date={dates.add(firstMonth, i, 'month')} events={filteredEvents} onDrillDown={onDrillDown}/>
      )
    }

    return <div className="year">{months.map(month => month)}</div>
  }
}

// Day.propTypes = {
//   date: PropTypes.instanceOf(Date).isRequired,
// }

Year.range = date => {
  return [dates.startOf(date, 'year')]
}

Year.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'year')

    case navigate.NEXT:
      return dates.add(date, 1, 'year')

    default:
      return date
  }
}

Year.title = (date) => {
  return `${date.getFullYear()}`
}

export default Year
