import { Field, FieldGroup, FieldLabel, FieldSet, FieldError, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

export default function SettingsForm() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({
    organisation: "",
    domain: "",
    webhook: "",
    password: "",
    explanation: ""
  });

  async function handleCopy() {
    if (!text.trim()) {
      toast.error("متن خالی است!");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("کپی شد");
    } catch (err) {
      console.error("خطا در کپی:", err);
      toast.error("خطا در کپی");
    }
  }
  const generatePassword = (length = 12) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "organisation":
        if (!value.trim()) error = "نام سازمان الزامی است";
        else if (value.length < 2) error = "نام سازمان باید حداقل ۲ کاراکتر باشد";
        break;
      case "domain":
        if (!value.trim()) error = "دامنه الزامی است";
        else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) error = "فرمت دامنه صحیح نیست";
        break;
      case "webhook":
        if (!value.trim()) error = "Webhook الزامی است";
        else if (!/^https?:\/\/.+/.test(value)) error = "Webhook باید با http یا https شروع شود";
        break;
      case "password":
        if (!value.trim()) error = "API کلید الزامی است";
        else if (value.length < 8) error = "API کلید باید حداقل ۸ کاراکتر باشد";
        break;
      case "explanation":
        if (value.length > 500) error = "توضیحات نباید بیش از ۵۰۰ کاراکتر باشد";
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  function handleSubmite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    const isValid = Object.entries(data).every(([key, value]) => 
      validateField(key, value as string)
    );

    if (!isValid) {
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }

    console.log("🧾 داده‌های فرم:", data);
    toast.loading("در حال ارسال اطلاعات...");

    setTimeout(() => {
      toast.dismiss();
      toast.success("اطلاعات با موفقیت ثبت شد");
      console.log("Form Data:", JSON.stringify(data, null, 2));
    }, 1500);
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmite}>
      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Field>
              <FieldLabel htmlFor="organisation">نام سازمان</FieldLabel>
              <Input
                id="organisation"
                name="organisation"
                type="text"
                placeholder="Nimbus Labs"
                required
               
                className={errors.organisation ? "border-red-500" : ""}
              />
              {errors.organisation && (
                <FieldError>{errors.organisation}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="domain">دامنه سفارشی</FieldLabel>
              <Input
                id="domain"
                name="domain"
                type="text"
                placeholder="iot.example.com"
                required
                className={errors.domain ? "border-red-500" : ""}
              />
              {errors.domain && (
                <FieldError>{errors.domain}</FieldError>
              )}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="webhook">Webhook</FieldLabel>
            <Input
              id="webhook"
              type="text"
              name="webhook"
              placeholder="https://api.example.com/hooks/iot"
              required
              className={errors.webhook ? "border-red-500" : ""}
            />
            {errors.webhook && (
              <FieldError>{errors.webhook}</FieldError>
            )}
          </Field>
          <Field className="flex">
            <FieldLabel htmlFor="password">API کلید</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="password"
                value={text}
                name="password"
                onChange={(e) => {
                  setText(e.target.value);
                  validateField("password", e.target.value);
                }}
                required
                className={errors.password ? "border-red-500" : ""}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  className="mx-1"
                  variant="secondary"
                  onClick={handleCopy}
                >
                  کپی
                </InputGroupButton>
                <InputGroupButton
                  className="mx-1"
                  variant="default"
                  onClick={() => {
                    const newPassword = generatePassword();
                    setText(newPassword);
                    validateField("password", newPassword);
                  }}
                >
                  ساخت پسورد
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <FieldError>{errors.password}</FieldError>
            )}
             <FieldDescription>
              پسورد باید حداقل 8 کارکتر شمامل حروف بزرگ و کوچک عدد و کارکتر های ویژه باشد
                </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="explanation">توضیحات</FieldLabel>
            <Textarea
              id="explanation"
              name="explanation"
              placeholder="سیاست نگهداری داده، محدوده های هشدار و غیره"
              rows={4}
              className={errors.explanation ? "border-red-500" : ""}
            />
            {errors.explanation && (
              <FieldError>{errors.explanation}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <Toaster position="top-center" />
      <Button type="submit">ثبت</Button>
    </form>
  );
}
