import PnPTelemetry from "@pnp/telemetry-js";
import { version } from './version';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

const CONTROL_TYPE = "property";

export function track(componentName: string, properties: any = {}): void { // eslint-disable-line @typescript-eslint/no-explicit-any
  const telemetry = PnPTelemetry.getInstance();
  telemetry.trackEvent(componentName, {
    version,
    controlType: CONTROL_TYPE,
    debug: DEBUG ? "true" : "false",
    environment: EnvironmentType[Environment.type],
    ...properties
  });
}
