"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitOrder(formData: FormData) {
  const customer = formData.get("name") as string
  const email = formData.get("email") as string
  
  if (!customer || !email) {
    throw new Error("Missing required fields")
  }

  // Assuming an arbitrary fixed order for demo purposes
  await prisma.order.create({
    data: {
      customer,
      email,
      total: 100, // Mock total
      status: "PENDING",
      items: {
        create: [
          {
            productId: "1",
            name: "Checkout Item Placeholder",
            quantity: 1,
            price: 100,
          }
        ]
      }
    }
  })

  revalidatePath("/")
  redirect("/success")
}
