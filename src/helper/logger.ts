import { Env } from '@/core/env';

type LogType = 'log' | 'error' | 'warn' | 'info';

export const logger = (type: LogType, message: string, content: any) => {
  console.log('Env.ENABLE_LOGGER', Env.ENABLE_LOGGER, typeof Env.ENABLE_LOGGER);
  if (!Env.ENABLE_LOGGER) return;
  switch (type) {
    case 'log':
      console.log(message, content);
      break;
    case 'error':
      console.error(message, content);
      break;
    case 'warn':
      console.warn(message, content);
      break;
    case 'info':
      console.info(message, content);
      break;
    default:
      console.log(message, content);
  }
};
