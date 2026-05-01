import { Prisma } from "@prisma/client";

function toErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return `Prisma known error ${error.code}`;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Prisma validation error";
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Prisma initialization error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown server error";
}

export function logServerError(context: string, error: unknown): void {
  console.error(`[${context}] ${toErrorMessage(error)}`);
}
