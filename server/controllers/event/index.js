'use strict';


module.exports = {
	actions: {
		registerAttendance: require('./actions/registerAttendance')
	},
	middlewares: {
		pre: {
			parseEventData: require('./middlewares/pre/parseEventAttendance')
		}
	}
};

