import React, { Component } from 'react';

import Day from './Day/Day'
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as daysInMonth from '../../../constants/daysInMonth';
import {buses} from '../../../constants/buses';

import axios2020 from '../../../axios-calendar2020';

class Month extends Component {
    state = {
        currMonthData: null,
        prevMonthData: null,
        nextMonthData: null,
        prevMonthDataStart: 0,
        currMonthDataStart: 0,
        nextMonthDataStart: 0,
        prevMonthReady: false,
        currMonthReady: false,
        nextMonthReady: false,
        year: 2020,
        month: 'MAR'
    }

    componentDidMount() {
        // calendar shall always start on a sunday, and end on a saturday, fix this problem
        // console.log('component did mount', this.props)
        console.log('year: ' + this.props.match.params.year, 'month: ' + this.props.match.params.month)
        this.setState({
            year: this.props.match.params.year,
            month: this.props.match.params.month
        },() => this.setData())
    }

    fetchCalendar = (year, key, monthPtr, start, end) => {
        // console.log('fetching ' + monthPtr);
        this.setState({
            [monthPtr]: null,
        })
        const URL = key + '/.json';
        if (Number(year) === 2020) {
            axios2020.get(URL)
                .then(res => {
                    let newMonth = {};
                    for (let i = start; i <= end; i++) {
                        // console.log('month' + key, 'date ' + i, res.data[i])
                        let busInfoObj = {};
                        for (let bus in buses) {
                            if (res.data[i].busInfo[buses[bus]]) {
                                busInfoObj = {
                                    ...busInfoObj,
                                    [buses[bus]]: {
                                        ...res.data[i].busInfo[buses[bus]],
                                        route: {
                                            ...res.data[i].busInfo[buses[bus]].route
                                        }
                                    }
                                }
                            }
                        }
                        newMonth = {
                            ...newMonth,
                            [i]: {
                                ...res.data[i],
                                busInfo: busInfoObj,
                                notes: res.data[i].notes
                            }
                        };
                    }
                    this.setState({
                        [monthPtr]: {
                            ...newMonth
                        }
                    }, () => {
                        this.setState({
                            [monthPtr+'Ready']: true
                        })
                        // console.log('setting ready state for ' + monthPtr);
                        return ;
                    })
                })
                .catch(error => {
                    console.log('url: ' + URL, error);
                })
        } else {    // year != 2020
            // FIXME
            console.log('need access to year !== 2020, furture development required');
        }
    }

    setData = () => {
        const firstDayInMonth = new Date(this.state.month + ' ' + 1 + ', ' + this.state.year);
        const lastDayInMonth = new Date(this.state.month + ' ' + daysInMonth.daysof[this.state.month] + ', ' + this.state.year);

        // console.log('first day', firstDayInMonth, firstDayInMonth.getDay(), 'last day', lastDayInMonth.getDay());

        let firstDayPrevMonth = new Date();
        firstDayPrevMonth.setMonth(firstDayInMonth.getMonth() - 1)
        firstDayPrevMonth.setDate(daysInMonth.daysin[firstDayPrevMonth.getMonth()] - firstDayInMonth.getDay() + 1);

        let prevMonthKey = daysInMonth.convertMonthToKey(firstDayPrevMonth.toDateString().substring(4,7).toUpperCase());

        let lastDayNextMonth = new Date();
        lastDayNextMonth.setDate(6 - lastDayInMonth.getDay())
        lastDayNextMonth.setMonth(lastDayInMonth.getMonth() + 1);

        let nextMonthKey = daysInMonth.convertMonthToKey(lastDayNextMonth.toDateString().substring(4,7).toUpperCase());

        // console.log('prevmonthstart DAY', firstDayPrevMonth.getDay(), 'curr month start day', firstDayInMonth.getDay(), 'next month start day',  lastDayNextMonth.getDay() - lastDayNextMonth.getDate() + 1)
        this.setState({
            prevMonthDataStart: firstDayPrevMonth.getDay(),
            currMonthDataStart: firstDayInMonth.getDay(),
            nextMonthDataStart: lastDayNextMonth.getDay() - lastDayNextMonth.getDate() + 1
        })
        // ================================
        if (firstDayInMonth.getDay() !== 0) {
            // console.log('this.fetchCalendar', firstDayPrevMonth.getFullYear(), prevMonthKey, 'prevMonthData', 
            // firstDayPrevMonth.getDate(), daysInMonth.daysin[firstDayPrevMonth.getMonth()])
            this.fetchCalendar(firstDayPrevMonth.getFullYear(), prevMonthKey, 'prevMonthData', 
                            firstDayPrevMonth.getDate(), daysInMonth.daysin[firstDayPrevMonth.getMonth()]);
        } else {
            this.setState({
                prevMonthData: null,
                prevMonthDataReady: true
            })
        }
        if (lastDayInMonth.getDay() !== 6) {
            // console.log('this.fetchCalendar(',lastDayNextMonth.getFullYear(), nextMonthKey, 'nextMonthData',1, lastDayNextMonth.getDate())
            this.fetchCalendar(lastDayNextMonth.getFullYear(), nextMonthKey, 'nextMonthData',
                            1, lastDayNextMonth.getDate());
        } else {
            this.setState({
                nextMonthData: null,
                nextMonthDataReady: true
            })
        }
        // ================================
        const currMonthkey = daysInMonth.convertMonthToKey(this.state.month)
        // console.log('this.fetchCalendar(',this.state.year, currMonthkey, 'currMonthData', 1, daysInMonth.daysof[this.state.month],')');
        this.fetchCalendar(this.state.year, currMonthkey, 'currMonthData', 1, daysInMonth.daysof[this.state.month]);
    }

    renderDays = (ptrMonth, inCurrMonth) => {
        let res = null
        if (!this.state[ptrMonth]) return null;
        res = Object.keys(this.state[ptrMonth]).map((day, index) => {
            // console.log(day);
            return <Day key={index}
                        date={day}
                        month={this.state.month}
                        year={this.state.year}
                        buses={this.state[ptrMonth][day].busInfo}
                        notes={this.state[ptrMonth][day].notes}
                        day={daysInMonth.convertDateToDay((this.state[ptrMonth+'Start'] + index) % 7)}
                        inCurrMonth={inCurrMonth}/>
        }) 
        return res;
    }
    render() {
        // sunday, monday, tuesday, wednesday, thursday, friday, saturday, sunday
        let prevDays = null;
        let currDays = null;
        let nextDays = null;
        let calendar = <Spinner />;
        if (this.state.prevMonthDataReady && this.state.currMonthDataReady && this.state.nextMonthDataReady) {
            // console.log(this.state)
            prevDays = this.renderDays('prevMonthData', false);
            currDays = this.renderDays('currMonthData', true);
            nextDays = this.renderDays('nextMonthData', false);
            calendar = (
                <div>
                    {prevDays}
                    {currDays}
                    {nextDays}
                </div>
            )
        }
        // console.log('render, month', this.state.month)
       
        
        return (
            <div>
                <h1>{this.state.month} {this.state.year}</h1>
                {calendar}
            </div>
        )
    }
}

export default Month;