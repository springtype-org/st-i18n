export interface APIOptions {
  defaults: {
    namespace: string;
  };
  logger: {
    missingLanguage: boolean;
    missingNamespace: boolean;
    missingKey: boolean;

    missingOption: boolean;
    unknownOption: boolean;
  };
}
