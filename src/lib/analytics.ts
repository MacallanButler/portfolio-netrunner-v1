// Google Analytics Event Tracking Helpers

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent("view_project", "engagement", `${projectId} (${projectTitle})`);
};

export const trackAudioToggle = (enabled: boolean) => {
  trackEvent("toggle_audio", "interface", enabled ? "unmute" : "mute");
};

export const trackContactSubmit = (method: string) => {
  trackEvent("submit_contact", "conversion", method);
};

export const trackTerminalCommand = (command: string) => {
  trackEvent("execute_command", "terminal", command);
};
