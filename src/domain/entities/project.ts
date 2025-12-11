export interface Project {
  id: string;
  title: string;
  location: string;
  start: string;
  end: string;
  year: string;
  status: "Selesai" | "Sedang Berjalan" | "Perencanaan";
  image: string;
  description: string;
  updated_at: string;
  progress: Array<{ task: string; percentage: number }>;
  totalProgress: number;
}
