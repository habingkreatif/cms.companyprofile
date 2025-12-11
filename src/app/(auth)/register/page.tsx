// src/pages/register.tsx
"use client";

import { useState } from "react";
import { useAuthViewModel } from "@/presentation/hooks/useAuthViewModel";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  MapPin,
  UserPlus,
  CheckCircle,
  User,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    address: "",
    position: "",
    department: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState(1); // 1: Account info, 2: Personal info

  const { register, loading, error } = useAuthViewModel();
  const router = useRouter();

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password minimal 8 karakter";
    if (!/(?=.*[a-z])/.test(password)) return "Harus mengandung huruf kecil";
    if (!/(?=.*[A-Z])/.test(password)) return "Harus mengandung huruf besar";
    if (!/(?=.*\d)/.test(password)) return "Harus mengandung angka";
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // if (error) clearError(); // useAuthViewModel doesn't have clearError, it clears on new action

    // Validasi password real-time
    if (name === "password") {
      const errorMsg = validatePassword(value);
      setPasswordError(errorMsg);
    }

    if (name === "confirmPassword" && formData.password !== value) {
      setPasswordError("Password tidak sama");
    } else if (name === "confirmPassword" && formData.password === value) {
      setPasswordError("");
    }
  };

  const handleNextStep = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.username
    ) {
      alert("Harap lengkapi semua field wajib di langkah ini");
      return;
    }

    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    const success = await register(
      formData.email,
      formData.password,
      formData.username,
      {
        phone: formData.phone,
        address: formData.address,
        position: formData.position,
        department: formData.department,
      }
    );

    if (success) {
      router.push("/");
    }
  };

  const passwordChecks = [
    { label: "Minimal 8 karakter", check: formData.password.length >= 8 },
    {
      label: "Mengandung huruf besar",
      check: /(?=.*[A-Z])/.test(formData.password),
    },
    {
      label: "Mengandung huruf kecil",
      check: /(?=.*[a-z])/.test(formData.password),
    },
    { label: "Mengandung angka", check: /(?=.*\d)/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-900/50 px-8 py-4 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span
                  className={`text-sm ${
                    step >= 1 ? "text-white" : "text-gray-400"
                  }`}
                >
                  Informasi Akun
                </span>
              </div>
              <div className="h-px flex-1 mx-4 bg-gray-700/50"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-sm ${
                    step === 2 ? "text-white" : "text-gray-400"
                  }`}
                >
                  Data Pribadi
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Illustration & Info */}
            <div className="hidden lg:block p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-r border-gray-700/50">
              <div className="h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Bergabung dengan Sistem
                    </h2>
                    <p className="text-gray-400">
                      Daftar akun untuk mengakses semua fitur manajemen proyek
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">
                        Akses dashboard real-time
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">
                        Kelola proyek konstruksi
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">
                        Monitor progress tim
                      </span>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/30"
                    >
                      <h4 className="font-medium text-white mb-3">
                        Persyaratan Password:
                      </h4>
                      <div className="space-y-2">
                        {passwordChecks.map((check, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                check.check ? "bg-emerald-500" : "bg-gray-600"
                              }`}
                            >
                              {check.check && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-sm ${
                                check.check
                                  ? "text-emerald-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {step === 1 ? "Buat Akun Baru" : "Data Pribadi"}
                  </h1>
                  <p className="text-gray-400">
                    {step === 1
                      ? "Isi informasi dasar untuk membuat akun"
                      : "Lengkapi data pribadi Anda (opsional)"}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {step === 1 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="username"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="nama@example.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="Buat password yang kuat"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {passwordError && (
                          <p className="mt-2 text-sm text-red-400">
                            {passwordError}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Konfirmasi Password{" "}
                          <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="Ulangi password Anda"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {formData.confirmPassword &&
                          formData.password !== formData.confirmPassword && (
                            <p className="mt-2 text-sm text-red-400">
                              Password tidak cocok
                            </p>
                          )}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
                      >
                        Lanjut ke Data Pribadi →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          No. HP
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="08xx-xxxx-xxxx"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Alamat
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                            placeholder="Alamat lengkap Anda"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                          <p className="text-red-300 text-sm">{error}</p>
                        </div>
                      )}

                      {/* Position */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Jabatan
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="Contoh: Project Manager"
                          />
                        </div>
                      </div>

                      {/* Department */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Departemen
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                            placeholder="Contoh: Konstruksi"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-gray-700 text-white py-3.5 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                        >
                          ← Kembali
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-emerald-600 text-white py-3.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loading ? "Mendaftarkan..." : "Selesai Pendaftaran"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>

                {/* Login Link */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <p className="text-center text-gray-400">
                    Sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Masuk di sini
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden p-4 bg-gray-900/50 border-t border-gray-700/50">
            <div className="flex justify-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  step >= 1 ? "bg-blue-600" : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step === 2 ? "bg-blue-600" : "bg-gray-700"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
