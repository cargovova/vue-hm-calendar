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

```html
<vue-hm-calendar />
```

## Props

### Common

**mode**

_Type_: String - `month | year`

_Description_: The mode of month setted as default.

```html
<vue-hm-calendar mode="month" />
```

**hideHeader** - `true | false`

_Type_: Boolean

_Description_: Hide a header of a calendar.

```html
<vue-hm-calendar :hideHeader="true" />
```

**firstWeekDay** - `monday, saturday`

_Type_: String

_Default_: `sunday`

_Description_: Only a monday or a saturday.

```html
<vue-hm-calendar firstWeekDay="monday" />
```

**pastEventsColors** - `HEX, rgb(), rgba()`

_Type_: Array

_Description_: Colors for heatmaping. For one, two, three and more events in the past. Colors for future events not change.

_Default_: `:pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']"`

```html
<vue-hm-calendar :pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']" />
```

**cellSize** - `1px; | 20% | 1rem` />

_Type_: String

_Description_: The CSS width and height property of a cell.

```html
<vue-hm-calendar cellSize="30px" />
```

**eventsDays** - `{ '2022-02-01': 1, ... }`

_Type_: Object

_Description_: Property names is dates of the month(1,2,3...), values is a count of events.

```html
<vue-hm-calendar :eventsDays={ '2022-02-01': 1, '2022-02-02': 2 } />
```

**yearNumber** - `2022`

_Type_: Number

```html
<vue-hm-calendar :yearNumber="2022" />
```

### For the month mode

**monthNumber** - `0-11`

_Type_: Number

```html
<vue-hm-calendar :monthNumber="1" />
```

### For the year mode

**hideWeekNames**

_Type_: Boolean `true | false`

```html
<vue-hm-calendar `:hideWeekNames="true"
```
