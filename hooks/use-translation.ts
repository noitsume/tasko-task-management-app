"use client"

import { useLanguage } from "@/context/language-context"

const translations = {
  id: {
    // App
    appName: "Tasko",
    tagline: "Your Tasks, Under Control.",

    // Navigation
    addTask: "Tambah Tugas",
    toggleTheme: "Ganti Tema",
    language: "Bahasa",
    about: "Tentang",
    aboutUs: "Tentang Kami",
    aboutTasko: "Tentang Tasko",
    indonesian: "Bahasa Indonesia",
    english: "English",

    // Task Form
    addTaskTitle: "Tambah Tugas Baru",
    editTaskTitle: "Edit Tugas",
    title: "Judul",
    description: "Deskripsi",
    priority: "Prioritas",
    status: "Status",
    dueDate: "Tanggal Target",
    features: "Fitur Lanjutan",

    // Priority
    low: "Rendah",
    medium: "Sedang",
    high: "Tinggi",

    // Status
    toDo: "Belum Dikerjakan",
    inProgress: "Sedang Dikerjakan",
    done: "Selesai",
    all: "Semua",

    // Advanced Features
    automaticMode: "Mode Otomatis",
    automaticModeTooltip: "Tugas akan otomatis berubah status menjadi 'Sedang Dikerjakan' pada waktu yang ditentukan",
    automaticStart: "Mulai Otomatis",
    automaticDesc: "Tugas akan dimulai secara otomatis pada waktu ini",

    dailyTask: "Tugas Harian",
    dailyTaskTooltip: "Tugas akan dibuat ulang setiap hari setelah diselesaikan",
    dailyDesc: "Tugas ini akan berulang setiap hari",

    setDeadline: "Atur Deadline",
    deadlineTooltip: "Atur batas waktu untuk menyelesaikan tugas setelah dimulai",
    hours: "Jam",
    minutes: "Menit",

    // Actions
    save: "Simpan",
    update: "Perbarui",
    cancel: "Batal",

    // Task List
    noTasks: "Belum ada tugas. Tambahkan tugas pertama Anda!",
    holdInstruction: "Tahan untuk mengubah status",
    late: "Terlambat",
    onTime: "Tepat Waktu",

    // About Us Page
    teamTitle: "Tim Pengembang Tasko",
    teamIntro:
      "Kami adalah tim mahasiswa yang berdedikasi untuk menciptakan solusi produktivitas yang inovatif dan mudah digunakan.",
    leadDeveloper: "Lead Developer & Founder",
    uiuxDesigner: "UI/UX Designer & Co-Founder",
    backendEngineer: "Backend Engineer & Co-Founder",
    havidzDesc:
      "Visioner di balik Tasko dengan passion dalam pengembangan aplikasi web modern. Berpengalaman dalam React, Next.js, dan teknologi full-stack.",
    howardDesc:
      "Desainer kreatif yang bertanggung jawab atas pengalaman pengguna yang intuitif dan antarmuka yang menarik di Tasko.",
    kevinDesc: "Ahli backend yang memastikan performa aplikasi optimal dan arsitektur sistem yang robust untuk Tasko.",
    contactUs: "Hubungi Kami",
    email: "Email",
    website: "Website",
    address: "Alamat",
    addressValue: "Universitas Kristen Maranatha, Bandung, Indonesia",
    copyrightAboutUs: "© 2024 Tim Tasko. Dibuat dengan ❤️ di Indonesia.",

    // About Tasko Page
    aboutAppTitle: "Tentang Aplikasi Tasko",
    aboutApp: "Tentang Aplikasi",
    aboutDescription1:
      "Tasko adalah aplikasi manajemen tugas modern yang dirancang khusus untuk membantu Anda mengorganisir dan menyelesaikan tugas-tugas harian dengan lebih efisien dan terstruktur.",
    aboutDescription2:
      "Dengan fitur-fitur canggih seperti mode otomatis, tugas berulang harian, dan sistem deadline yang cerdas, Tasko memberikan pengalaman manajemen tugas yang belum pernah ada sebelumnya.",
    aboutDescription3:
      "Aplikasi ini dikembangkan dengan teknologi web terdepan dan dapat diakses dari berbagai perangkat, memastikan produktivitas Anda tidak terbatas oleh platform atau lokasi.",
    mainFeatures: "Fitur Utama",
    taskManagement: "Manajemen Tugas Lengkap",
    taskManagementDesc: "Buat, edit, dan kelola tugas dengan sistem prioritas dan status yang fleksibel.",
    filterCategory: "Filter & Kategori",
    filterCategoryDesc: "Organisir tugas berdasarkan status dan prioritas untuk fokus yang lebih baik.",
    darkLightMode: "Mode Gelap & Terang",
    darkLightModeDesc: "Antarmuka yang dapat disesuaikan dengan preferensi visual Anda.",
    advancedFeatures: "Fitur Lanjutan",
    advancedFeaturesDesc: "Mode otomatis, tugas harian, deadline tracking, dan notifikasi real-time.",
    version: "Versi Aplikasi",
    copyright: "© 2024 Tasko. Semua hak dilindungi undang-undang.",
  },
  en: {
    // App
    appName: "Tasko",
    tagline: "Your Tasks, Under Control.",

    // Navigation
    addTask: "Add Task",
    toggleTheme: "Toggle Theme",
    language: "Language",
    about: "About",
    aboutUs: "About Us",
    aboutTasko: "About Tasko",
    indonesian: "Bahasa Indonesia",
    english: "English",

    // Task Form
    addTaskTitle: "Add New Task",
    editTaskTitle: "Edit Task",
    title: "Title",
    description: "Description",
    priority: "Priority",
    status: "Status",
    dueDate: "Due Date",
    features: "Advanced Features",

    // Priority
    low: "Low",
    medium: "Medium",
    high: "High",

    // Status
    toDo: "To Do",
    inProgress: "In Progress",
    done: "Done",
    all: "All",

    // Advanced Features
    automaticMode: "Automatic Mode",
    automaticModeTooltip: "Task will automatically change status to 'In Progress' at the specified time",
    automaticStart: "Automatic Start",
    automaticDesc: "Task will start automatically at this time",

    dailyTask: "Daily Task",
    dailyTaskTooltip: "Task will be recreated every day after completion",
    dailyDesc: "This task will repeat daily",

    setDeadline: "Set Deadline",
    deadlineTooltip: "Set time limit to complete task after it starts",
    hours: "Hours",
    minutes: "Minutes",

    // Actions
    save: "Save",
    update: "Update",
    cancel: "Cancel",

    // Task List
    noTasks: "No tasks yet. Add your first task!",
    holdInstruction: "Hold to change status",
    late: "Late",
    onTime: "On Time",

    // About Us Page
    teamTitle: "Tasko Development Team",
    teamIntro:
      "We are a dedicated team of students committed to creating innovative and user-friendly productivity solutions.",
    leadDeveloper: "Lead Developer & Founder",
    uiuxDesigner: "UI/UX Designer & Co-Founder",
    backendEngineer: "Backend Engineer & Co-Founder",
    havidzDesc:
      "The visionary behind Tasko with a passion for modern web application development. Experienced in React, Next.js, and full-stack technologies.",
    howardDesc:
      "Creative designer responsible for the intuitive user experience and attractive interface design of Tasko.",
    kevinDesc: "Backend expert ensuring optimal application performance and robust system architecture for Tasko.",
    contactUs: "Contact Us",
    email: "Email",
    website: "Website",
    address: "Address",
    addressValue: "Maranatha Christian University, Bandung, Indonesia",
    copyrightAboutUs: "© 2024 Tasko Team. Made with ❤️ in Indonesia.",

    // About Tasko Page
    aboutAppTitle: "About Tasko Application",
    aboutApp: "About the Application",
    aboutDescription1:
      "Tasko is a modern task management application specifically designed to help you organize and complete daily tasks more efficiently and systematically.",
    aboutDescription2:
      "With advanced features like automatic mode, daily recurring tasks, and intelligent deadline system, Tasko provides an unprecedented task management experience.",
    aboutDescription3:
      "This application is built with cutting-edge web technology and can be accessed from various devices, ensuring your productivity is not limited by platform or location.",
    mainFeatures: "Main Features",
    taskManagement: "Complete Task Management",
    taskManagementDesc: "Create, edit, and manage tasks with flexible priority and status systems.",
    filterCategory: "Filter & Categories",
    filterCategoryDesc: "Organize tasks by status and priority for better focus.",
    darkLightMode: "Dark & Light Mode",
    darkLightModeDesc: "Customizable interface that adapts to your visual preferences.",
    advancedFeatures: "Advanced Features",
    advancedFeaturesDesc: "Automatic mode, daily tasks, deadline tracking, and real-time notifications.",
    version: "Application Version",
    copyright: "© 2024 Tasko. All rights reserved.",
  },
}

export function useTranslation() {
  const { language } = useLanguage()
  return { t: translations[language], language }
}
