"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { trackProjectView } from "@/lib/analytics";
import projectsData from "@/data/projects.json";

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

  // Sync modal state with browser history / URL query parameter
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");
      
      if (projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
          setActiveProject((prev) => {
            if (!prev || prev.id !== project.id) {
              setIsTransitioning(true);
              document.body.style.overflow = "hidden";
              trackProjectView(project.id, project.title);
              return project as Project;
            }
            return prev;
          });
        } else {
          setActiveProject(null);
          document.body.style.overflow = "";
        }
      } else {
        setActiveProject((prev) => {
          if (prev) {
            setIsClosing(true);
          }
          return prev;
        });
      }
    };

    // Listen for back/forward buttons
    window.addEventListener("popstate", handleUrlChange);
    
    // Initial sync
    handleUrlChange();

    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const openProject = useCallback((project: Project) => {
    const newUrl = `${window.location.pathname}?project=${project.id}`;
    window.history.pushState({ project: project.id }, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  }, []);

  const closeProject = useCallback(() => {
    const newUrl = window.location.pathname;
    window.history.pushState(null, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  }, []);

  const onTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const onCloseTransitionComplete = useCallback(() => {
    setIsClosing(false);
    setActiveProject(null);
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