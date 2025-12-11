"use client";

import { useState } from "react";
import { useProjects } from "@/presentation/hooks/useProject";
import { Project } from "@/domain/entities/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  TrendingUp,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  FileText,
  ImageIcon,
  LayoutDashboard,
  MapPin,
  Save,
} from "lucide-react";
import Image from "next/image";

export default function AdminProjectsPage() {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "progress">("basic");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    start: "",
    end: "",
    year: "",
    status: "Perencanaan" as Project["status"],
    image: "",
    description: "",
    progress: [] as { task: string; percentage: number }[],
    updated_at: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function calculateTotalProgress(
    progress: { task: string; percentage: number }[]
  ) {
    if (progress.length === 0) return 0;
    const total = progress.reduce((sum, p) => sum + p.percentage, 0);
    return parseFloat((total / progress.length).toFixed(2));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      totalProgress: calculateTotalProgress(formData.progress),
      progress: formData.progress,
      updated_at: new Date().toISOString(),
    };
    console.log("oke :", projectData);

    try {
      if (selectedProject) {
        await updateProject(selectedProject.id, projectData);
      } else {
        await createProject(projectData);
      }

      setIsDialogOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);

    setFormData({
      title: project.title,
      location: project.location,
      start: project.start,
      end: project.end,
      year: project.year,
      status: project.status,
      image: project.image,
      description: project.description,
      progress: project.progress ?? [],
      updated_at: project.updated_at,
    });

    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      await deleteProject(projectToDelete);
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Selesai":
        return <Badge className="bg-green-500">Selesai</Badge>;
      case "Sedang Berjalan":
        return <Badge className="bg-blue-500">Sedang Berjalan</Badge>;
      default:
        return <Badge className="bg-yellow-500">Perencanaan</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Proyek</h1>
        <Button
          onClick={() => {
            setSelectedProject(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Proyek
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar Proyek</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Judul</TableHead>
                <TableHead className="text-center">Lokasi</TableHead>
                <TableHead className="text-center">Tahun</TableHead>
                <TableHead className="text-center">Dimulai</TableHead>
                <TableHead className="text-center">Berakhir</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Total Progress</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Belum ada proyek
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium text-center">
                      {project.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {project.location}
                    </TableCell>
                    <TableCell className="text-center">
                      {project.year}
                    </TableCell>
                    <TableCell className="text-center">
                      {project.start}
                    </TableCell>
                    <TableCell className="text-center">{project.end}</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(project.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      {project.totalProgress} %
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteClick(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedProject ? "Edit Proyek" : "Tambah Proyek Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi data proyek di bawah ini. Semua kolom wajib diisi.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === "basic"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 inline-block mr-2" />
                  Informasi Dasar
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("progress")}
                  className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === "progress"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline-block mr-2" />
                  Progress
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {activeTab === "basic" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-gray-400" />
                          Judul Proyek
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Contoh: Pembangunan Gedung A"
                          className="h-10"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          Lokasi
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Contoh: Jl. Sudirman No. 123, Jakarta"
                          className="h-10"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          Periode Proyek
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-500">
                              Mulai
                            </label>
                            <Input
                              type="date"
                              name="start"
                              value={formData.start}
                              onChange={handleInputChange}
                              className="h-10"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">
                              Selesai
                            </label>
                            <Input
                              type="date"
                              name="end"
                              value={formData.end}
                              onChange={handleInputChange}
                              className="h-10"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Tahun
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Input
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            placeholder="2024"
                            className="h-10"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Status
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                            required
                          >
                            <option value="">Pilih Status</option>
                            <option value="Perencanaan">🟡 Perencanaan</option>
                            <option value="Sedang Berjalan">
                              🔵 Sedang Berjalan
                            </option>
                            <option value="Selesai">🟢 Selesai</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
                          Gambar Proyek
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/project-image.jpg"
                          className="h-10"
                          required
                        />

                        {formData.image ? (
                          <div className="mt-2 border rounded-lg overflow-hidden">
                            <div className="relative aspect-video bg-gray-100">
                              <Image
                                src={formData.image}
                                alt="Preview"
                                className="object-cover"
                                fill
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.jpg";
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                Preview
                              </div>
                            </div>
                            <div className="p-2 bg-gray-50 text-xs text-gray-500">
                              Gambar akan ditampilkan di halaman publik
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Masukkan URL gambar untuk melihat preview
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <AlignLeft className="w-4 h-4 mr-2 text-gray-400" />
                      Deskripsi Proyek
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Jelaskan detail proyek, tujuan, dan informasi penting lainnya..."
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {formData.description.length}/2000 karakter
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Gunakan paragraf yang jelas untuk menjelaskan proyek
                      secara detail
                    </p>
                  </div>
                </>
              )}

              {activeTab === "progress" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Progress Pekerjaan
                      </h3>
                      <p className="text-sm text-gray-500">
                        Tambahkan task dan progress untuk memantau perkembangan
                        proyek
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          progress: [
                            ...prev.progress,
                            { task: "", percentage: 0 },
                          ],
                        }))
                      }
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Task
                    </Button>
                  </div>

                  {formData.progress.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-blue-500" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Belum ada task
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">
                        Tambahkan task untuk melacak progress proyek
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            progress: [
                              ...prev.progress,
                              { task: "", percentage: 0 },
                            ],
                          }))
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Task Pertama
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.progress.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-3 items-center bg-white border rounded-lg p-4 hover:border-blue-300 transition-colors"
                        >
                          <div className="col-span-1">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                          </div>

                          <div className="col-span-5">
                            <Input
                              type="text"
                              placeholder="Nama task (contoh: Pekerjaan Pondasi)"
                              value={item.task}
                              onChange={(e) => {
                                const updated = [...formData.progress];
                                updated[index].task = e.target.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  progress: updated,
                                }));
                              }}
                              className="h-10"
                            />
                          </div>

                          <div className="col-span-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-gray-500">
                                    Progress
                                  </span>
                                  <span className="text-xs font-medium">
                                    {item.percentage}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      item.percentage > 100
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${Math.min(
                                        item.percentage,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="w-16">
                                <Input
                                  type="number"
                                  min="0"
                                  max="1000"
                                  value={item.percentage}
                                  onChange={(e) => {
                                    const updated = [...formData.progress];
                                    updated[index].percentage = Math.min(
                                      1000,
                                      Math.max(0, Number(e.target.value))
                                    );
                                    setFormData((prev) => ({
                                      ...prev,
                                      progress: updated,
                                    }));
                                  }}
                                  className="h-10 text-center"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2 text-right">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                              onClick={() => {
                                const updated = formData.progress.filter(
                                  (_, i) => i !== index
                                );
                                setFormData((prev) => ({
                                  ...prev,
                                  progress: updated,
                                }));
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {formData.progress.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-blue-900">
                                Total Progress Proyek
                              </h4>
                              <p className="text-sm text-blue-700">
                                Rata-rata dari semua task
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-600">
                                {Math.round(
                                  formData.progress.reduce(
                                    (sum, task) => sum + task.percentage,
                                    0
                                  ) / Math.max(formData.progress.length, 1)
                                )}
                                %
                              </div>
                              <div className="text-xs text-blue-500">
                                dari {formData.progress.length} task
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between items-center pt-6 border-t">
              <div className="text-sm text-gray-500">
                {activeTab === "basic" ? (
                  <span>Isi informasi dasar proyek terlebih dahulu</span>
                ) : (
                  <span>Atur progress task sesuai perkembangan proyek</span>
                )}
              </div>

              <div className="flex gap-2">
                {activeTab === "progress" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("basic")}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Informasi
                  </Button>
                )}

                {activeTab === "basic" && formData.progress.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("progress")}
                    className="gap-2"
                  >
                    Lihat Progress
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSelectedProject(null);
                    setActiveTab("basic");
                  }}
                >
                  Batal
                </Button>

                <Button type="submit" className="gap-2">
                  {selectedProject ? (
                    <>
                      <Save className="w-4 h-4" />
                      Update Proyek
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Simpan Proyek
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Proyek?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Proyek akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
