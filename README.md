# vue-hm-calendar

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

**hideHeader** - `true`
