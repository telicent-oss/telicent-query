const DATASET_PLACEHOLDER = '{dataset}';

// Endpoint URLs in env config carry a `{dataset}` placeholder. URLs without one
// are used verbatim so older deployments keep working.
export const buildEndpoint = (template: string, dataset: string): string =>
  template.replace(DATASET_PLACEHOLDER, encodeURIComponent(dataset));
