import { Test, TestingModule } from '@nestjs/testing';
import { UsersProjectsController } from './users-projects.controller';

describe('UsersProjectsController', () => {
  let controller: UsersProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersProjectsController],
    }).compile();

    controller = module.get<UsersProjectsController>(UsersProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
