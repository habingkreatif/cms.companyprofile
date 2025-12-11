import { AboutUs } from "@/domain/entities/aboutUs";
import { AboutUsRepository } from "@/domain/repository/AboutUsRepository";
import { db } from "../api/firebase";
import { ref, get, child, update, set } from "firebase/database";

const ABOUT_US_PATH = "about_us";

export const AboutUsRepositoryImpl: AboutUsRepository = {
  async get(): Promise<AboutUs | null> {
    const snapshot = await get(child(ref(db), ABOUT_US_PATH));
    if (!snapshot.exists()) return null;
    return snapshot.val() as AboutUs;
  },

  async update(data: AboutUs): Promise<AboutUs> {
    await set(ref(db, ABOUT_US_PATH), data);
    return data;
  },
};
