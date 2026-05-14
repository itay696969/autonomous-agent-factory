const { NodeSDK } = require('@opentelemetry/sdk-node');
const { LangfuseExporter } = require('langfuse');
const { GoogleGenAiInstrumentation } = require('openinference-instrumentation-google-genai');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

// Initialize Langfuse Exporter
const langfuseExporter = new LangfuseExporter({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST || "https://cloud.langfuse.com"
});

// Bootstrap OpenTelemetry Node SDK
const sdk = new NodeSDK({
  traceExporter: langfuseExporter,
  spanProcessor: new SimpleSpanProcessor(langfuseExporter),
  instrumentations: [new GoogleGenAiInstrumentation()],
});

sdk.start();

console.log("Langfuse Telemetry initialized and waiting for LLM calls...");
