# vue-hm-calendar

<img src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/year.png" alt="">

<img src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/month.png" alt="">

<img src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/tooltip.png" alt="">

[![cargovova](https://img.shields.io/badge/cargovova-brightgreen)](https://github.com/cargovova)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://v2.vuejs.org/)
[![vue-hm-calendar](https://img.shields.io/badge/vue--hm--calendar-v2-green)](https://www.npmjs.com/package/vue-hm-calendar)
[![Coverage Status](https://coveralls.io/repos/github/cargovova/vue-hm-calendar/badge.svg?branch=master)](https://coveralls.io/github/cargovova/vue-hm-calendar?branch=master)

# Getting started

1. Install the plugin:

```
npm i --save vue-hm-calendar
```

2. Add the plugin into your app:

```javascript
import Vue from 'vue'
import VueHmCalendar from 'vue-hm-calendar'
Vue.use(VueHmCalendar)
```

3. Use the `vue-hm-calendar` component:

```html
<vue-hm-calendar />
```

### Demo: https://codesandbox.io/s/vue-hm-calendar-ri8juy

# Props:

### Short description

| Props                            | Type      | Value                       |
| -------------------------------- | --------- | --------------------------- |
| mode                             | _String_  | `'month' \| 'year'`         |
| hideHeader                       | _Boolean_ | `true \| false`             |
| firstWeekDay                     | _String_  | `'monday', 'saturday'`      |
| pastEventsColors                 | _Array_   | `[HEX, rgb(), rgba()]`      |
| futureEventsColors               | _Array_   | `[HEX, rgb(), rgba()]`      |
| cellSize                         | _String_  | `'1px;' \| '20%' \| '1rem'` |
| eventsDays                       | _Object_  | `{ '2022-02-01': 1, ... }`  |
| yearNumber                       | _Number_  | `2022`                      |
| monthNumber (`only month mode`)  | _Number_  | `0-11`                      |
| hideWeekNames (`only year mode`) | _Boolean_ | `true \| false`             |

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

_Description_: Colors for heatmaping. For one, two, three and more events in the past.

_Default_: `:pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']"`

```html
<vue-hm-calendar :pastEventsColors="['#66BB6A', '#388E3C', '#1B5E20']" />
```

**futureEventsColors** - `HEX, rgb(), rgba()`

_Type_: Array

_Description_: Colors for heatmaping. For one, two, three and more events in the future.

_Default_: `:futureEventsColors="['#BDBDBD', '#616161', '#212121']"`

```html
<vue-hm-calendar :futureEventsColors="['#BDBDBD', '#616161', '#212121']" />
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
<vue-hm-calendar :eventsDays="{ '2022-02-01': 1, '2022-02-02': 2 }" />
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
