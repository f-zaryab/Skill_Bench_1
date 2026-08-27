import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(5001),

        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        LOG_LEVEL: Joi.string()
          .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
          .default('debug'),

        LOG_PRETTY: Joi.boolean().default(true),

        JWT_ACCESS_SECRET: Joi.string().required(),

        JWT_REFRESH_SECRET: Joi.string().required(),

        JWT_ACCESS_EXPIRES_IN: Joi.number().default(900),
      }),
    }),
  ],

  exports: [NestConfigModule],
})
export class ConfigModule {}
