import { JsonProjectRepository } from '@infrastructure/repositories/JsonProjectRepository';
import { JsonCategoryRepository } from '@infrastructure/repositories/JsonCategoryRepository';
import { GetProjectsUseCase } from '@application/use-cases/GetProjectsUseCase';
import { GetProjectBySlugUseCase } from '@application/use-cases/GetProjectBySlugUseCase';
import { GetCategoriesUseCase } from '@application/use-cases/GetCategoriesUseCase';
import { ProjectService } from '@application/services/ProjectService';
import { WhatsAppOrderService } from '@application/services/WhatsAppOrderService';

const projectRepository = new JsonProjectRepository();
const categoryRepository = new JsonCategoryRepository();

const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
const getProjectBySlugUseCase = new GetProjectBySlugUseCase(projectRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);

export const projectService = new ProjectService(
  getProjectsUseCase,
  getProjectBySlugUseCase,
  getCategoriesUseCase,
);

export const whatsAppOrderService = new WhatsAppOrderService();
