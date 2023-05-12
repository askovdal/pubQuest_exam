/// <reference types="react-scripts" />

declare module 'dawa-autocomplete2' {
  export function dawaAutocomplete(
    element: unknown,
    options?: {
      select?: () => void;
      adgangsadresserOnly?: boolean;
      minLength?: number;
    }
  ): void;
}
