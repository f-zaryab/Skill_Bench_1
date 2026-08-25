import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repositories/user.repository';
import { UsersService } from './application/users.service';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { UsersController } from './api/users.controller';
import { PrismaModule } from '@app/common/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
