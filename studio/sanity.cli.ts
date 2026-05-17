import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Pin the Sanity-hosted Studio appId so `sanity deploy` doesn't reprompt.
  deployment: {
    appId: "x3h3mxhcjmmnvzgpetfhvhc4",
  },
});
