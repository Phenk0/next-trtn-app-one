import { z, ZodError } from "zod";

type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[]> | undefined;
  timestamp: number;
};

type FromErrorToActionStateFn = (
  error: unknown,
  formData: FormData,
) => ActionState;

const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

const fromErrorToActionState: FromErrorToActionStateFn = (error, formData) => {
  if (error instanceof ZodError) {
    const flattened = z.flattenError(error); //the way to get errors object with field names
    return {
      status: "ERROR",
      message: "Validation failed",
      fieldErrors: flattened.fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

const toActionState = (
  status: ActionState["status"],
  message: string,
): ActionState => ({
  status,
  message,
  fieldErrors: {},
  timestamp: Date.now(),
});

export { EMPTY_ACTION_STATE, fromErrorToActionState, toActionState };
export type { ActionState };
