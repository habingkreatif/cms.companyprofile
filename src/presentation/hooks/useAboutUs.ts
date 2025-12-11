import { useState, useEffect, useCallback } from "react";
import { AboutUs } from "@/domain/entities/aboutUs";
import { GetAboutUs, UpdateAboutUs } from "@/domain/usecase/AboutUsUsecase";
import { AboutUsRepositoryImpl } from "@/data/repository/AboutUsRepositoryImpl";

const getAboutUsUC = new GetAboutUs(AboutUsRepositoryImpl);
const updateAboutUsUC = new UpdateAboutUs(AboutUsRepositoryImpl);

export const useAboutUs = () => {
  const [aboutUs, setAboutUs] = useState<AboutUs | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutUs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAboutUsUC.execute();
      setAboutUs(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAboutUs = async (data: AboutUs) => {
    setLoading(true);
    try {
      const updatedData = await updateAboutUsUC.execute(data);
      setAboutUs(updatedData);
      return updatedData;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, [fetchAboutUs]);

  return {
    aboutUs,
    loading,
    error,
    fetchAboutUs,
    updateAboutUs,
  };
};
