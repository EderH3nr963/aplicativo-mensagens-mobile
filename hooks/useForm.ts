import { useState } from "react";

export default function useForm<T extends Record<string, any>>(
  initialState: T
) {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (key: keyof T, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setForm, handleChange };
}
