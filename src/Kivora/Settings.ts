import "dotenv/config";
import crypto from "crypto";

class Settings {
  public readonly SERVER_HOST: string = process.env.SERVER_HOST as string;
  public readonly PORT: number = parseInt(process.env.PORT ?? "8000");
  public readonly API_V1_STR: string = "/api/v1";

  public readonly SECRET_KEY: string = crypto.randomBytes(32).toString("hex");
  public readonly ACCESS_TOKEN_EXPIRES_MINUTES: number = 60 * 5;
  public readonly ALGORITHM: string = "HS256";
}

const settings = new Settings();

export default settings;
