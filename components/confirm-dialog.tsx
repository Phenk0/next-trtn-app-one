import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { LucideTrash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useMemo } from "react";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  isDestructive?: boolean;
  confirmAction: (
    prevState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  trigger: React.ReactElement;
};

function useConfirmDialog({
  confirmAction,
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  isDestructive,
}: UseConfirmDialogProps) {
  const deleteDialog = useMemo(() => AlertDialogPrimitive.createHandle(), []);
  const router = useRouter();

  const dialogTrigger = (
    <AlertDialogTrigger
      handle={deleteDialog}
      render={trigger}
      nativeButton={false}
    />
  );
  const [actionState, action] = useActionState(
    confirmAction,
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = () => {
    deleteDialog.close();
    router.refresh();
  };

  const dialog = (
    <AlertDialog handle={deleteDialog}>
      <AlertDialogContent size={isDestructive ? "sm" : "default"}>
        <AlertDialogHeader>
          {isDestructive && (
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <LucideTrash2 />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form
            action={action}
            actionState={actionState}
            onSuccess={handleSuccess}
          >
            <SubmitButton label="Confirm" />
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog] as const;
}
export { useConfirmDialog };
