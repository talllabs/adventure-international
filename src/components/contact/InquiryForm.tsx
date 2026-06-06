"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Valid email required"),
  country: z.string().optional(),
  phone: z.string().optional(),
  howDidYouHear: z.string().optional(),
  groupSize: z.string().optional(),
  travelDates: z.string().optional(),
  areas: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const AREAS = [
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia-pacific", label: "Asia and Pacific" },
  { value: "europe", label: "Europe" },
];

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle size={48} className="text-gold mb-4" />
        <h3 className="font-serif text-3xl text-white mb-3">Thank You</h3>
        <p className="text-white/60 leading-relaxed max-w-sm">
          We&apos;ve received your inquiry and one of our expedition specialists will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          error={errors.firstName?.message}
          inputProps={{ ...register("firstName"), placeholder: "James" }}
        />
        <FormField
          label="Last Name"
          error={errors.lastName?.message}
          inputProps={{ ...register("lastName"), placeholder: "Webb" }}
        />
      </div>

      <FormField
        label="Email"
        error={errors.email?.message}
        inputProps={{ ...register("email"), type: "email", placeholder: "james@example.com" }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Country"
          error={errors.country?.message}
          inputProps={{ ...register("country"), placeholder: "United States" }}
        />
        <FormField
          label="Phone"
          error={errors.phone?.message}
          inputProps={{ ...register("phone"), type: "tel", placeholder: "+1 555 000 0000" }}
        />
      </div>

      <FormField
        label="How did you hear about us?"
        error={errors.howDidYouHear?.message}
        inputProps={{ ...register("howDidYouHear"), placeholder: "Friend, social media, search engine..." }}
      />

      <FormField
        label="How many people are in your group (including yourself)?"
        error={errors.groupSize?.message}
        inputProps={{ ...register("groupSize"), placeholder: "e.g. 2 adults, 1 child" }}
      />

      <FormField
        label="When are you planning to travel and for how long?"
        error={errors.travelDates?.message}
        inputProps={{ ...register("travelDates"), placeholder: "e.g. July 2025, 2 weeks" }}
      />

      {/* Areas checkboxes */}
      <div>
        <p className="text-xs tracking-widest uppercase text-white/60 mb-3">What areas are you interested in visiting?</p>
        <div className="grid grid-cols-2 gap-3">
          {AREAS.map((area) => (
            <label key={area.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={area.value}
                {...register("areas")}
                className="accent-gold"
              />
              <span className="text-sm text-white/70">{area.label}</span>
            </label>
          ))}
        </div>
      </div>

      <FormField
        label="List any other specific info or details"
        type="textarea"
        error={errors.message?.message}
        inputProps={{
          ...register("message"),
          placeholder: "Special requirements, specific wildlife, accessibility needs, preferred travel style...",
        }}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full justify-center"
        disabled={submitting}
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
