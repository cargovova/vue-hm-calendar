# vue-hm-calendar

<img src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/year.png" alt="">

<img src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/month.png" alt="">

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://v2.vuejs.org/)

# Installation

```
npm i --save vue-hm-calendar
```

## Default import

Global Install:

```javascript
import Vue from 'vue'
import VueHmCalendar from 'vue-hm-calendar'
Vue.use(VueHmCalendar)
```

# Usage

In a Vue component in a template use

```
<vue-hm-calendar props/>
```

## Props

### Common

**mode**

**_⚠️ You have to setup a mode_**

_Type_: String - `month | year` - _required_

_Example_ `mode="month"`

**hideHeader** - `true | false`

_Type_: Boolean

_Description_: Hide a header of a calendar.

_Example_ `:hideHeader="true"`

**firstWeekDay** - `monday, saturday`

_Type_: String

_Example_ `firstWeekDay="monday"`

_Default_: `sunday`

_Description_: Only a monday or a saturday.

**pastEventsColors** - `HEX, rgb(), rgba()`

_Type_: Array

_Description_: Colors for heatmaping. For one, two, three and more events in the past. Colors for future events not change.

_Example_ `:pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']"`

_Default_: `:pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']"`

**cellSize** - `1px; | 20% | 1rem`

_Type_: String

_Description_: The CSS width and height property of a cell.

_Example_ `cellSize="30px"`

**eventsDays** - `{ '2022-02-01': 1, ... }`

_Type_: Object

_Description_: Property names is dates of the month(1,2,3...), values is a count of events.

_Example_ `:eventsDays={ '2022-02-01': 1, '2022-02-02': 2 }`

**yearNumber** - `2022`

_Type_: Number

_Example_ `:yearNumber="2022"`

### For the month mode

**monthNumber** - `0-11`

_Type_: Number

_Example_ `:monthNumber="1"`

### For the year mode

**hideWeekNames**

_Type_: Boolean `true | false`

_Example_ `:hideWeekNames="true"`
