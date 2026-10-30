import { getRss } from "@/utils/getRss";
import config from "@/config";

export async function GET() {
  return getRss(config.site.lang);
}
