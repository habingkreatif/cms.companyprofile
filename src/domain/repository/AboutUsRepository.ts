import { AboutUs } from "../entities/aboutUs";

export interface AboutUsRepository {
  get(): Promise<AboutUs | null>;
  update(data: AboutUs): Promise<AboutUs>;
}
