"use client";

import { useProjectModal } from "@/context/ProjectModalContext";
import { ProjectModal } from "@/components/core/ProjectModal";
import { CorruptedTransition } from "@/components/core/CorruptedTransition";

export function ModalOrchestrator() {
  const { isTransitioning, isClosing, onTransitionComplete, onCloseTransitionComplete } = useProjectModal();

  return (
    <>
      {/* Open transition */}
      <CorruptedTransition
        isPlaying={isTransitioning}
        mode="open"
        onComplete={onTransitionComplete}
      />
      {/* Close transition */}
      <CorruptedTransition
        isPlaying={isClosing}
        mode="close"
        onComplete={onCloseTransitionComplete}
      />
      <ProjectModal />
    </>
  );
}
