"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        placeholder="Username"
        autoComplete="name"
        autoFocus
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} fieldName="username" />
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} fieldName="email" />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} fieldName="password" />
      <Label htmlFor="confirm-password">Confirm Password</Label>
      <Input
        id="confirm-password" // id for the label : kebab-case
        name="confirmPassword" // name for FormData : camelCase
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password" // for browser's autocomplete behavior -> not fill inputs
      />
      <FieldError
        actionState={actionState}
        fieldName="confirmPassword" // fieldName from FormData
      />
      <SubmitButton label="Sing UP" />
    </Form>
  );
};
export { SignUpForm };
