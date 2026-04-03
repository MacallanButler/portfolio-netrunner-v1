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
  pendingProject: Project | null;
  isTransitioning: boolean;
  openProject: (project: Project) => void;
  closeProject: () => void;
  onTransitionComplete: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [pendingProject, setPendingProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openProject = useCallback((project: Project) => {
    setPendingProject(project);
    setIsTransitioning(true);
    document.body.style.overflow = "hidden";
  }, []);

  const onTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
    setActiveProject((prev) => pendingProject ?? prev);
  }, [pendingProject]);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    setPendingProject(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <ProjectModalContext.Provider value={{
      activeProject,
      pendingProject,
      isTransitioning,
      openProject,
      closeProject,
      onTransitionComplete,
    }}>
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) throw new Error("useProjectModal must be used within ProjectModalProvider");
  return ctx;
}
