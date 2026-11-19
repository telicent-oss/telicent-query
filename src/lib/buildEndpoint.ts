const DATASET_PLACEHOLDER = '{dataset}';

// Without the placeholder the endpoint is fixed, so a dataset picker would do nothing.
export const hasDatasetPlaceholder = (template: string): boolean =>
  template.includes(DATASET_PLACEHOLDER);

// Endpoint URLs in env config carry a `{dataset}` placeholder. URLs without one
// are used verbatim so older deployments keep working.
export const buildEndpoint = (template: string, dataset: string): string =>
  template.replace(DATASET_PLACEHOLDER, encodeURIComponent(dataset));
