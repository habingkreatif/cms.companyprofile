import { Project } from "@/domain/entities/project";
import { ProjectRepository } from "@/domain/repository/ProjectRepository";
import { db } from "../api/firebase";
import {
  ref,
  get,
  child,
  set,
  update as fbUpdate,
  remove,
  push,
} from "firebase/database";

const PROJECTS_PATH = "projects";

export const ProjectRepositoryImpl: ProjectRepository = {
  async getAll() {
    const snapshot = await get(child(ref(db), PROJECTS_PATH));
    if (!snapshot.exists()) return [];
    const data = snapshot.val();

    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Project, "id">),
    }));
  },

  async getById(id: string): Promise<Project> {
    const snapshot = await get(child(ref(db), `${PROJECTS_PATH}/${id}`));
    if (!snapshot.exists()) throw new Error("Project not found");
    const data = snapshot.val();
    return {
      id,
      ...(data as Omit<Project, "id">),
    };
  },

  async create(data) {
    const newRef = push(ref(db, PROJECTS_PATH));
    const newProject: Project = {
      id: newRef.key!,
      ...data,
    };

    await set(newRef, newProject);
    return newProject;
  },

  async update(id, data) {
    await fbUpdate(ref(db, `${PROJECTS_PATH}/${id}`), data);

    const snapshot = await get(child(ref(db), `${PROJECTS_PATH}/${id}`));
    return {
      id,
      ...(snapshot.val() as Omit<Project, "id">),
    };
  },

  async delete(id) {
    await remove(ref(db, `${PROJECTS_PATH}/${id}`));
  },
};
