import { getRss } from "@/utils/getRss";

export async function GET() {
  return getRss("en");
}
