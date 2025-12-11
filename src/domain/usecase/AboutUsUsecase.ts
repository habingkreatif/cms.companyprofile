import { AboutUs } from "../entities/aboutUs";
import { AboutUsRepository } from "../repository/AboutUsRepository";

export class GetAboutUs {
  constructor(private repository: AboutUsRepository) {}

  async execute(): Promise<AboutUs | null> {
    return this.repository.get();
  }
}

export class UpdateAboutUs {
  constructor(private repository: AboutUsRepository) {}

  async execute(data: AboutUs): Promise<AboutUs> {
    return this.repository.update(data);
  }
}
