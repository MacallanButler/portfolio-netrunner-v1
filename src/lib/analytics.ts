// Google Analytics Event Tracking Helpers

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window !== "undefined" && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};

export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent("view_project", "engagement", `${projectId} (${projectTitle})`);
};

export const trackAudioToggle = (enabled: boolean) => {
  trackEvent("toggle_audio", "interface", enabled ? "unmute" : "mute");
};

export const trackContactSubmit = (method: string, packageInterest?: string) => {
  trackEvent("submit_contact", "conversion", method, undefined, {
    package_interest: packageInterest ?? "none",
  });
};

export const trackTerminalCommand = (command: string) => {
  trackEvent("execute_command", "terminal", command);
};

export const trackTierInquireClick = (tierName: string) => {
  trackEvent("inquire_tier", "conversion", tierName, undefined, {
    tier_name: tierName,
  });
};

export const trackPricingCtaClick = (ctaLocation: string) => {
  trackEvent("cta_click", "engagement", ctaLocation, undefined, {
    cta_location: ctaLocation,
  });
};

export const trackScrollDepth = (pagePath: string, depth: number) => {
  trackEvent("scroll_depth", "engagement", `${depth}%`, depth, {
    page_path: pagePath,
  });
};

export const trackNavClick = (navItem: string) => {
  trackEvent("nav_click", "navigation", navItem, undefined, {
    nav_item: navItem,
  });
};

export const trackExternalLinkClick = (destination: string) => {
  trackEvent("external_link_click", "engagement", destination, undefined, {
    destination,
  });
};

export const trackEmailClick = (linkLocation: string) => {
  trackEvent("email_click", "engagement", linkLocation, undefined, {
    link_location: linkLocation,
  });
};

