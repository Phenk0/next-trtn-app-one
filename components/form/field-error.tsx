import { ActionState } from "@/components/form/utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  fieldName: string;
};

function FieldError({ actionState, fieldName }: FieldErrorProps) {
  const message = actionState.fieldErrors[fieldName]?.[0];

  if (!message) return null;

  return <span className="text-xs text-destructive">{message}</span>;
}
export { FieldError };
