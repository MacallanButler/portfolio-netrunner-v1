"use client";

import { useProjectModal } from "@/context/ProjectModalContext";
import { ProjectModal } from "@/components/core/ProjectModal";
import { CorruptedTransition } from "@/components/core/CorruptedTransition";

export function ModalOrchestrator() {
  const { isTransitioning, onTransitionComplete } = useProjectModal();

  return (
    <>
      <CorruptedTransition
        isPlaying={isTransitioning}
        onComplete={onTransitionComplete}
      />
      <ProjectModal />
    </>
  );
}
