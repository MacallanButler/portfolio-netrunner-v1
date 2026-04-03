"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  techStack: string[];
  status: string;
  completionDate: string;
  repoUrl: string | null;
  liveUrl: string | null;
}

interface ProjectModalContextValue {
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <ProjectModalContext.Provider value={{ activeProject, openProject, closeProject }}>
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) throw new Error("useProjectModal must be used within ProjectModalProvider");
  return ctx;
}
