import { Project } from "../entities/project";
import { ProjectRepository } from "../repository/ProjectRepository";

export class CreateProject {
  constructor(private repository: ProjectRepository) {}

  async execute(project: Project): Promise<Project> {
    return this.repository.create(project);
  }
}

export class GetProjects {
  constructor(private repository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repository.getAll();
  }
}

export class GetDetailProject {
  constructor(private repository: ProjectRepository) {}

  async execute(id: string): Promise<Project> {
    return this.repository.getById(id);
  }
}

export class UpdateProject {
  constructor(private repository: ProjectRepository) {}

  async execute(id: string, project: Project): Promise<Project> {
    return this.repository.update(id, project);
  }
}

export class DeleteProject {
  constructor(private repository: ProjectRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
