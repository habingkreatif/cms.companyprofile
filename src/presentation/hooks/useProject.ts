import { useState, useEffect, useCallback } from "react";
import { Project } from "@/domain/entities/project";

import {
  CreateProject,
  GetProjects,
  GetDetailProject,
  UpdateProject,
  DeleteProject,
} from "@/domain/usecase/ProjectUsecase";

import { ProjectRepositoryImpl } from "@/data/repository/ProjectRpositoryImpl";

const createProjectUC = new CreateProject(ProjectRepositoryImpl);
const getProjectsUC = new GetProjects(ProjectRepositoryImpl);
const getDetailProjectUC = new GetDetailProject(ProjectRepositoryImpl);
const updateProjectUC = new UpdateProject(ProjectRepositoryImpl);
const deleteProjectUC = new DeleteProject(ProjectRepositoryImpl);

type ErrorMessage = string | null;

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjectsUC.execute();
      setProjects(data);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: Omit<Project, "id">): Promise<Project> => {
    setLoading(true);
    try {
      const created = await createProjectUC.execute(data as Project);
      setProjects((prev) => [...prev, created]);
      return created;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProjectDetail = async (id: string): Promise<Project> => {
    setLoading(true);
    try {
      return await getDetailProjectUC.execute(id);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (
    id: string,
    data: Partial<Project>
  ): Promise<Project> => {
    setLoading(true);
    try {
      const updated = await updateProjectUC.execute(id, data as Project);
      setProjects((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      return updated;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await deleteProjectUC.execute(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    getProjectDetail,
    updateProject,
    deleteProject,
  };
};
