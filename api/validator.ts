// eslint-disable-next-line import/no-extraneous-dependencies
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

function validate(schema: any, body: any) {
  const { error } = schema.validate(body);
  if (error !== undefined) {
    logger.error(`Schema is not valid. Error is ${error}`);
    throw new Error(`Check response! Schema is not valid. Error is ${error}`);
  }
}

export default validate;
