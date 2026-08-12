export type FieldErrors = Record<string, string[] | undefined>;

export type FormState<TValues extends Record<string, unknown> = Record<string, unknown>> = {
  message?: string;
  success?: string;
  errors?: FieldErrors;
  values?: TValues;
};

export const emptyState: FormState = {};

export function firstError(errors: FieldErrors | undefined, name: string) {
  return errors?.[name]?.[0];
}

export function formValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function formValues(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

export function checkboxValue(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export function flattenErrors(error: { flatten: () => { fieldErrors: FieldErrors } }) {
  return error.flatten().fieldErrors;
}
