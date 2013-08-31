'use strict';


module.exports = {
	actions: {
		showSpeaker: require('./actions/showSpeaker')
	},
	middlewares: {
		pre: {
			parseSpeakerQuery: require('./middlewares/pre/parseSpeakerQuery')
		}
	}
};

