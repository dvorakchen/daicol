import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
	level: 'info',
	format: combine(label({ label: 'Daicol Server' }), timestamp(), prettyPrint()),
	transports: [new transports.Console()]
});

export default logger;
