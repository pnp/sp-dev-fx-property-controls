import { AppInsights } from "applicationinsights-js";
import { version } from './version';

AppInsights.downloadAndSetup({ instrumentationKey: "9f59b81e-d2ed-411e-a961-8bcf3f7f04d0" });

export function track(componentName: string, environment: string): void {
  AppInsights.trackEvent(componentName, {
    version,
    debug: DEBUG ? "true" : "false",
    environment
  });
}
