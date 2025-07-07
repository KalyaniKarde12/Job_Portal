// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
Sentry.init({
  dsn: "https://1321da7f6408a9b9884a6a08da42062b@o4509622482042880.ingest.us.sentry.io/4509622487154688",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});