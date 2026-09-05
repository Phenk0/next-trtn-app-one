import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = { actionState: ActionState };

type UseActionFeedbackFn = (
  actionState: ActionState,
  options: {
    onSuccess?: (OnArgs: OnArgs) => void;
    onError?: (OnArgs: OnArgs) => void;
  },
) => void;

const useActionFeedback: UseActionFeedbackFn = (actionState, options) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isRepeatedRender = prevTimestamp.current === actionState.timestamp;

  useEffect(() => {
    if (isRepeatedRender) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
    prevTimestamp.current = actionState.timestamp;
  }, [options, actionState, isRepeatedRender]);
};

export { useActionFeedback };
