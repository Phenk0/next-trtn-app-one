import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";
import { toast } from "@/components/ui/toast";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};
function Form({
  action,
  actionState,
  onSuccess,
  onError,
  children,
}: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          type: "success",
          title: actionState.message,
        });
      }
      onSuccess?.(actionState); // this is a conditional [fn] call
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          // title: `Ticket ${ticket ? "editing" : "creating"}`,
          type: "error",
          title: actionState.message,
        });
      }
      onError?.(actionState); // this is a conditional [fn] call
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export { Form };
