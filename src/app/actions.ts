"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVehicle(formData: FormData) {
  const licensePlate = formData.get("licensePlate") as string;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = parseInt(formData.get("year") as string, 10);
  const vtvExpiration = new Date(formData.get("vtvExpiration") as string);
  const insuranceExpiration = new Date(formData.get("insuranceExpiration") as string);

  if (!licensePlate || !brand || !model || !year || !vtvExpiration || !insuranceExpiration) {
    throw new Error("Missing fields");
  }

  await prisma.vehicle.create({
    data: {
      licensePlate: licensePlate.toUpperCase(),
      brand,
      model,
      year,
      vtvExpiration,
      insuranceExpiration,
    },
  });

  revalidatePath("/");
  revalidatePath("/flota");
  redirect("/flota");
}
