"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";
import { REGIONS } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  travelDates: z.string().optional(),
  destinations: z.array(z.string()).optional(),
  travelers: z.string().optional(),
  budget: z.string().min(1, "Please select a budget"),
  howDidYouHear: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your dream journey"),
});

type FormData = z.infer<typeof schema>;

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
        <h3 className="font-serif text-3xl text-forest mb-3">Thank You</h3>
        <p className="text-charcoal-soft leading-relaxed max-w-sm">
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
      <FormField
        label="Phone (optional)"
        error={errors.phone?.message}
        inputProps={{ ...register("phone"), type: "tel", placeholder: "+1 555 000 0000" }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Travel Dates (approximate)"
          error={errors.travelDates?.message}
          inputProps={{ ...register("travelDates"), placeholder: "July–August 2025" }}
        />
        <FormField
          label="Number of Travelers"
          error={errors.travelers?.message}
          inputProps={{ ...register("travelers"), placeholder: "2 adults" }}
        />
      </div>

      {/* Regions checkboxes */}
      <div>
        <p className="text-xs tracking-widest uppercase text-charcoal-soft mb-3">Regions of Interest</p>
        <div className="grid grid-cols-2 gap-2">
          {REGIONS.map((r) => (
            <label key={r.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={r.value}
                {...register("destinations")}
                className="accent-gold"
              />
              <span className="text-sm text-charcoal-soft">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <FormField
        label="Budget Per Person"
        type="select"
        error={errors.budget?.message}
        options={[
          { value: "under-10k", label: "Under $10,000" },
          { value: "10-25k", label: "$10,000 – $25,000" },
          { value: "25-50k", label: "$25,000 – $50,000" },
          { value: "50k-plus", label: "$50,000+" },
        ]}
        inputProps={{ ...register("budget") }}
      />

      <FormField
        label="How Did You Hear About Us?"
        error={errors.howDidYouHear?.message}
        inputProps={{ ...register("howDidYouHear"), placeholder: "Friend, social media, search..." }}
      />

      <FormField
        label="Tell Us About Your Dream Journey"
        type="textarea"
        error={errors.message?.message}
        inputProps={{
          ...register("message"),
          placeholder: "What kind of experience are you looking for? Any must-see destinations, wildlife, or activities?",
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
