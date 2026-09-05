import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";
import { toast } from "@/components/ui/toast";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
};
function Form({ action, actionState, children }: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          // title: `Ticket ${ticket ? "editing" : "creating"}`,
          type: "success",
          description: actionState.message,
        });
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.add({
          // title: `Ticket ${ticket ? "editing" : "creating"}`,
          type: "error",
          description: actionState.message,
        });
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export { Form };
