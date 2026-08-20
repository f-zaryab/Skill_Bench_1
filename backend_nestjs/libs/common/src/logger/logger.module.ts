import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { IncomingMessage } from 'node:http';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';

type SerializedRequest = IncomingMessage & {
  id?: string | number;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
};

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pretty =
          configService.get<string>('LOG_PRETTY', 'true') === 'true';
        return {
          pinoHttp: {
            level: configService.get<string>('LOG_LEVEL', 'info'),
            transport: pretty
              ? {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                }
              : undefined,
            serializers: {
              req(req: SerializedRequest) {
                return {
                  id: req.id,
                  method: req.method,
                  url: req.url,
                  query: req.query,
                  params: req.params,
                  remoteAddress: req.socket?.remoteAddress,
                  remotePort: req.socket?.remotePort,
                };
              },
            },
            redact: {
              paths: [
                // Headers
                'req.headers.authorization',
                'req.headers.cookie',
                // Common auth fields
                'req.body.password',
                'req.body.confirmPassword',
                'req.body.oldPassword',
                'req.body.newPassword',
                'req.body.accessToken',
                'req.body.refreshToken',
                'req.body.token',
                // Response headers
                'res.headers["set-cookie"]',
              ],
              censor: '[Redacted]',
            },
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
