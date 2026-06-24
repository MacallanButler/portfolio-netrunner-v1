"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { trackProjectView } from "@/lib/analytics";

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
  isTransitioning: boolean;
  isClosing: boolean;
  openProject: (project: Project) => void;
  closeProject: () => void;
  onTransitionComplete: () => void;
  onCloseTransitionComplete: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pendingProject = useRef<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    pendingProject.current = project;
    setIsTransitioning(true);
    document.body.style.overflow = "hidden";
    trackProjectView(project.id, project.title);
  }, []);

  const onTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
    setActiveProject(pendingProject.current);
  }, []);

  // Trigger the close bar — modal stays mounted until bar finishes
  const closeProject = useCallback(() => {
    setIsClosing(true);
  }, []);

  // Called by CorruptedTransition when close sequence finishes
  const onCloseTransitionComplete = useCallback(() => {
    setIsClosing(false);
    setActiveProject(null);
    pendingProject.current = null;
    document.body.style.overflow = "";
  }, []);

  return (
    <ProjectModalContext.Provider value={{
      activeProject,
      isTransitioning,
      isClosing,
      openProject,
      closeProject,
      onTransitionComplete,
      onCloseTransitionComplete,
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