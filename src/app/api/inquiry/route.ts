import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  travelDates: z.string().optional(),
  destinations: z.array(z.string()).optional(),
  travelers: z.string().optional(),
  budget: z.string().min(1),
  howDidYouHear: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    
    console.log("New inquiry received:", {
      from: `${data.firstName} ${data.lastName} <${data.email}>`,
      budget: data.budget,
      destinations: data.destinations,
      travelDates: data.travelDates,
      message: data.message,
    });

    return NextResponse.json(
      { success: true, message: "Inquiry received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid data" },
      { status: 400 }
    );
  }
}
