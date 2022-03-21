# vue-hm-calendar

<img width="100" src="https://github.com/cargovova/vue-hm-calendar/blob/master/screens/month.png" alt="">

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://v2.vuejs.org/)

# Installation

```
npm i vue-hm-calendar
```

## Default import

Global Install:

```javascript
import Vue from 'vue'
import VueHmCalendar from 'vue-hm-calendar'
Vue.use(VueHmCalendar)
```

## Usage

In a Vue component in a template use

```
<vue-hm-calendar props/>
```

_*Props*_

**⚠️ You have to setup a mode**

**mode** - `month` - _required_

When the month mode is selected.

**monthNumber** - `0-11`

**firstWeekDay** - `monday, saturday` (Sunday selected by default)

**hideHeader** - `:hideHeader="true"`

**eventsDays** - `{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }` - Property names is date of month(1,2,3...), values is count of events.

**eventsColors** - `:eventsColors="['#66BB6A', '#388E3C', '#1B5E20']"` - Colors for the heatmap. For one, two, three and more events.
