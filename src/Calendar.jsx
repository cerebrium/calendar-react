import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/calendar/Calendar.module.scss'


const CalendarComponent = (props) => {
    // state ... month currently starting from day you wish passed in as props
    const [ labelDaysArray, setLabelDaysArray ] = useState([])

    // days in the month array
    const [ daysInMonthRenderArray, setDaysInMonthRenderArray ] = useState([])

    // state array for the month label and arrows
    const [ topRowArray, setTopRowArray ] = useState([])

    // get the month currently looking at
    const [ currentMonth, setCurrentMonth ] = useState(new Date())

    // get the year currently looking at
    const [ currentYear, setCurrentYear ] = useState(new Date())

    // get the year currently looking at
    const [ currentDate, setCurrentDate ] = useState(new Date())

    // selected date to return
    const [ selectedDate, setSelectedDate ] = useState(new Date())

    // gate to choose which selection is being shown on the calendar
    const [ monthGate, setMonthGate ] = useState(false)

    // the array for the month selection
    const [ monthSelection, setMonthSelection ] = useState([])

    // state for the content that is being rendered
    const [ content, setContent ] = useState([])

    // gate for rendering the year screen
    const [ yearGate, setYearGate ] = useState(false)

    // year render array
    const [ yearRenderArray, setYearRenderArray ] = useState([])

    // for initail render
    const [ initialRenderGate, setInitialRenderGate ] = useState(true)

    /******************* end of stat declerations *****************************/

    // add the get week method to the Date class ..  this is client specific
    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // handle month and year initial selection
    useEffect( () => {
        if (props.currentSelection) {
            try {
                setCurrentDate(new Date(props.currentSelection))
                setCurrentMonth(new Date(props.currentSelection).getMonth())  
                setCurrentYear(new Date(props.currentSelection).getFullYear())  
            } catch (error) {
                console.log(error)
            }
        } else {
            let localDate = new Date()
            setCurrentMonth(localDate.getMonth())
            setCurrentYear(localDate.getFullYear())
        }
    }, [props.currentSelection])

    // handle month and year initial selection
    useEffect( () => {
        setCurrentMonth(currentDate.getMonth())
        setCurrentYear(currentDate.getFullYear())
    }, [currentDate])

    // function for setting a new date
    const handleChangeDate = (e, dateChangeSelection) => {
        let localDate = currentDate;
        switch (dateChangeSelection) {
            case 'forwardMonth':
                localDate.getMonth() === 11 ? localDate = new Date(localDate.getFullYear() + 1, 0, 1) : localDate = new Date(localDate.getFullYear(), localDate.getMonth() + 1, 1)
                setCurrentDate(localDate)
                setCurrentMonth(localDate.getMonth())
                setCurrentYear(localDate.getFullYear())
                props.returnDate(localDate)
                break;
            case 'backMonth':
                localDate.getMonth() === 0 ? localDate = new Date(localDate.getFullYear() - 1, 11, 1) : localDate = new Date(localDate.getFullYear(), localDate.getMonth() - 1, 1)
                setCurrentDate(localDate)
                setCurrentMonth(localDate.getMonth())
                setCurrentYear(localDate.getFullYear())
                props.returnDate(localDate)
            break;
            case 'forwardYear':
                localDate = new Date(localDate.getFullYear() + 1, currentMonth, 1)
                setCurrentDate(localDate)
                setCurrentDate(localDate)
                setCurrentMonth(localDate.getMonth())
                setCurrentYear(localDate.getFullYear())
                props.returnDate(localDate)
                break;
            case 'backYear':
                localDate = new Date(localDate.getFullYear() - 1, currentMonth, 1)
                setCurrentDate(localDate)
                setCurrentDate(localDate)
                setCurrentMonth(localDate.getMonth())
                setCurrentYear(localDate.getFullYear())
                props.returnDate(localDate)
                break;
             default:
                console.log('default')   
        }
    }

    // return the day
    const handleSelectDay = (e, theDay) => {
        let dateSelectionFinal = new Date()
        try {
            dateSelectionFinal = new Date(currentYear, currentMonth, theDay)
        } catch (error) {
            console.log(error)
        }
        props.returnDate(dateSelectionFinal)
        setSelectedDate(dateSelectionFinal)
    }

    // function for when click the month it creates list of months for fast selection
    const handleShowAllMonths = () => {
        monthGate ? setMonthGate(false) : setMonthGate(true)
    }

    // function for setting the month from selection screen
    const handleChangeMonth = (e, monthNumber) => {
        let newDate = new Date(currentYear, monthNumber, 1)
        setCurrentDate(new Date(currentYear, monthNumber, 1))
        setMonthGate(false)
        setMonthSelection(null)
        props.returnDate(newDate)
    }

    // function for setting the year from selection screen
    const handleChangeYear = (e, yearNumber) => {
        let newDate = new Date(yearNumber, currentMonth, 1)
        setCurrentDate(newDate)
        setYearGate(false)
        setYearRenderArray(null)
        props.returnDate(newDate)
    }

    // function for changing render to show year selection
    const handleShowYears = () => {
        yearGate ? setYearGate(false) : setYearGate(true);
    }

    // controls all of the on page mapping
    useEffect( () => {
        if (monthGate && !yearGate) {
            // array to be set for rendering with parent div
            let localMonthRenderArrayFinal = null

            // array of month names
            let monthNamesArray = []
            
            // array of month names
            const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

            // create array of month selections
            months.forEach( (month, monthId) => {
                monthNamesArray.push(
                    <div 
                        className={styles.month}
                        onClick={(e, monthNumber) => handleChangeMonth(e, monthId)}
                        key={monthId}
                    >
                        <h3 className={styles.monthText}>
                            {month}
                        </h3>
                    </div>
                )
            })

            localMonthRenderArrayFinal = (
                <div className={styles.monthRenderContainer}>
                    {monthNamesArray}
                </div>
            )
            
            // set the state
            setMonthSelection(localMonthRenderArrayFinal)
        } 
        // render the year selection
        if (yearGate && !monthGate) {
            // array to be rendered with all the years
            let localYearRenderArray = []

            // create array of month selections
            for (let i = -5; i < 20; i++) {
                let localDate = new Date()
                let yearNumber = i+localDate.getFullYear()
                localYearRenderArray.push(
                    <div 
                        className={styles.year}
                        onClick={(e, monthNumber) => handleChangeYear(e, yearNumber)}
                        key={i}
                    >
                        <h3 className={styles.monthText}>
                            {yearNumber}
                        </h3>
                    </div>
                )
            }

            let localyearRenderArrayFinal = (
                <div className={styles.yearRenderContainer}>
                    {localYearRenderArray}
                </div>
            )
            
            // set the state
            setYearRenderArray(localyearRenderArrayFinal)
        }
        // if the month selection screen toggle has not been selected
        if (!monthGate && !yearGate) {

            // array to be set to state depending on the props for labels
            let localLabelRenderArray = []

            // array to be set to state for days in the month
            let localDaysInMonthRenderArray = []

            // array of names post props
            let temporarydayNamesArray = []

            // top row array, month name and arrows
            let localTopRowArray = []

            // array of names allowed to be passed in
            let dayNamesArray = [
                'Sun',
                'Mon',
                'Tues',
                'Wed',
                'Thurs',
                'Fri',
                'Sat'
            ]

            // get index of starting day passed in ... loop through remaining days and pass 
            // labels into the calendar
            let indexOfStart
            try { 
                indexOfStart = dayNamesArray.indexOf(props.startingDay)
            } catch (error) {
                console.log('incorrect day passed in reverting to sunday')
            }

            // check if there is a number
            if (!isNaN(indexOfStart)) {
                // if index out of range will return -1, so set it to 0
                indexOfStart < 0 ? indexOfStart = 0 : indexOfStart = indexOfStart;
            }
            // loop through until end and then restart
            let j = 0
            for (let i = indexOfStart; j < dayNamesArray.length; i < dayNamesArray.length-1 ? i++ : i = 0) {
                // make an array of the current selection of starting days for use below
                temporarydayNamesArray.push(dayNamesArray[i])

                // make the render labels
                j++

                // push all the same style except for the last one due to border style
                if (j < 7) {
                    localLabelRenderArray.push(
                        <div className={styles.dayLabels}>
                            {dayNamesArray[i]}
                        </div>
                    )
                } else {
                    localLabelRenderArray.push(
                        <div className={styles.dayLabelsLast}>
                            {dayNamesArray[i]}
                        </div>
                    )
                }
            }

            /************************************ make days of the week based off selection for start day  ******/
            // get the first day of the month
            let date = currentDate;
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
            let daysInMonth = lastDay.getDate() - firstDay.getDate()
            let weekNumber = firstDay.getWeek()

            // loop through number of days in month start with where the calendar starts
            let currentWeek = 0
            for (let i = 1; i < daysInMonth+2; i++) {
                // get the week number
                let newCurrentDay = new Date(date.getFullYear(), date.getMonth(), i)

                // check if the included array has this date
                

                // save the week number if a new value
                let weekPlacment = 0

                // logic for replacing week number
                if (newCurrentDay.getWeek() !== currentWeek) {
                    if (currentWeek !== 0) {
                        weekPlacment = currentWeek
                    }
                    currentWeek = newCurrentDay.getWeek()
                } else {
                    currentWeek = newCurrentDay.getWeek()
                }

                // if week number is not 0 then add the week number
                let weekRenderDiv = null
                if (weekPlacment !== 0) {
                    weekRenderDiv = (
                        <h3 className={styles.weekPlacement}>{weekPlacment+1}</h3>
                    )
                }
                if (i === currentDate.getDate()) {
                    localDaysInMonthRenderArray.push(
                        <div 
                            className={styles.dayNumbers}
                            id={styles.currentSelectionDate}
                            onClick={(e, selectedDay) => handleSelectDay(e, i)}
                        >
                            <div className={styles.dayNumbersInner}>
                                <h3 className={styles.numberPlacement}>{i}</h3>
                            </div>
                        </div>
                    )
                } else {
                    localDaysInMonthRenderArray.push(
                        <div 
                            className={styles.dayNumbers}
                            onClick={(e, selectedDay) => handleSelectDay(e, i)}
                        >
                            <div className={styles.dayNumbersInner}>
                                <h3 className={styles.numberPlacement}>{i}</h3>
                            </div>
                        </div>
                    )
                }
            }

            // have all the days, need to fill with blanks until day start is correct
            for (let i = 0; i < temporarydayNamesArray.indexOf(dayNamesArray[firstDay.getDay()]); i++) {
                localDaysInMonthRenderArray.unshift(
                    <div className={styles.dayNumbers}></div>
                )
            }

            /************************************ make days of the week based off selection for start day  ***************************/
            // array of month names
            const months= ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

            // get the month name and put it in the top row
            let monthName = date.getMonth()

            // back arrow
            localTopRowArray.push(
                <div className={styles.triangleContainers} onClick={(e, changeVar) => handleChangeDate(e, 'backYear')}>
                    <img 
                        src='/accessories/triangledark.png' 
                        alt="go back a year" 
                        className={styles.arrowLeftYear}
                    />
                </div>
            )
            
            // back arrow
            localTopRowArray.push(
                <div className={styles.triangleContainers} onClick={(e, changeVar) => handleChangeDate(e, 'backMonth')}>
                    <img 
                        src='/accessories/triangledark.png'
                        alt="go back a month" 
                        className={styles.arrowLeft}
                    />
                </div>
            )

            // month name - on click shows you all of the months so you can fast pick
            localTopRowArray.push(
                <div className={styles.monthName} >
                    <h3 
                        onClick={handleShowAllMonths}
                        className={styles.monthSelector}
                    >
                        {months[monthName]}
                    </h3>
                    <h3 className={styles.spacer}> | </h3>
                    <h3
                        className={styles.monthSelector}
                        onClick={handleShowYears}
                    >
                        {currentYear.toString()}
                    </h3>
                </div>
            )

            // triangle right
            localTopRowArray.push(
                <div className={styles.triangleContainers} onClick={(e, changeVar) => handleChangeDate(e, 'forwardMonth')}>
                    <img 
                        src='/accessories/triangledark.png' 
                        alt="go forward a month" 
                        className={styles.arrowRight}
                    />
                </div>
            )

            // second triangle right
            localTopRowArray.push(
                <div className={styles.triangleContainers} onClick={(e, changeVar) => handleChangeDate(e, 'forwardYear')}>
                    <img 
                        src='/accessories/triangledark.png' 
                        alt="go forward a year" 
                        className={styles.arrowRightYear}
                    />
                </div>
            )

            /************************************ Set the state for all of the things above  **************************/

            // set the top row first
            setTopRowArray(localTopRowArray)

            // set state with the array of labels
            setLabelDaysArray(localLabelRenderArray)

            // set the days in the month
            setDaysInMonthRenderArray(localDaysInMonthRenderArray)
        }
    }, [props.startingDay, props.currentSelection, currentMonth, currentYear, currentDate, monthGate, yearGate])

    // get rid of initial render class
    useEffect( () => {
        setTimeout( () => {
            setInitialRenderGate(false)
        }, 500)
    }, [])

    // controls all of the on page rendering
    useEffect( () => {
            if (monthGate && !yearGate) {
                setContent(monthSelection)
            } else if (!monthGate && yearGate) {
                setContent(
                    yearRenderArray
                )
            } else {
                if (initialRenderGate) {
                    setContent(
                        <div className={styles.effectsClass}>
                            <div className={styles.topRow}>
                                {topRowArray}
                            </div>
                            <div className={styles.labelsContainer}>
                                {labelDaysArray}
                            </div>
                            <div className={styles.daysContainer}>
                                {daysInMonthRenderArray}
                            </div>
                        </div>
                    )
                } else {
                    setContent(
                        <>
                            <div className={styles.topRow}>
                                {topRowArray}
                            </div>
                            <div className={styles.labelsContainer}>
                                {labelDaysArray}
                            </div>
                            <div className={styles.daysContainer}>
                                {daysInMonthRenderArray}
                            </div>
                        </>
                    )
                }
            }
    }, [monthGate, monthSelection, topRowArray, labelDaysArray, daysInMonthRenderArray, yearRenderArray, initialRenderGate])

    return (
        <div className={styles.calendarContainer}>
            {content}
        </div>
    )
}

// props and their types
CalendarComponent.propTypes = {
    /** starting day for the calendar, string: Mon, Tues, Wed, Thurs, Fri, Sat, Sun ... 
     * if incorrect day passed in the calendar will start on sunday */
    startingDay: PropTypes.string.isRequired,

    // function for returning the date selected
    returnDate: PropTypes.func.isRequired,

    // array of dates
    dateArray: PropTypes.Array
}

export default CalendarComponent