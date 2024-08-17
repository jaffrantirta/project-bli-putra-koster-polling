"use client";

import { AuthContext } from "@/context/AuthContext";
import { useForm } from "@/helpers/form";
import { Button, Input } from "@nextui-org/react";
import React, { useContext } from "react";

export default function Form() {
  const { auth, login } = useContext(AuthContext);
  const { values, setValue } = useForm({
    email: "",
    password: "",
  });
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(values.email, values.password);
  };
  return (
    <form onSubmit={submit}>
      <div className="mb-4">
        <Input
          label="Email"
          required
          value={values.email}
          onValueChange={(e) => setValue("email", e)}
        />
      </div>
      <div className="mb-6">
        <Input
          label="Password"
          type="password"
          required
          value={values.password}
          onValueChange={(e) => setValue("password", e)}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button disabled={auth.loading} isLoading={auth.loading} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
