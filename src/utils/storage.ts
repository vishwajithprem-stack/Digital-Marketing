import { AppState } from "../types";
import { blogPosts, courses, lessons } from "../data/content";

const STORAGE_KEY = "dmai-app-state";

export const defaultAppState: AppState = {
  users: [],
  currentUserId: null,
  progress: {},
  quizScores: {},
  badges: [],
  certificates: [],
  externalCertificates: [],
  notes: [],
  bookmarks: [],
  bookmarkCollections: {
    Revision: [],
    "Certification Prep": [],
    Favorites: [],
  },
  customCourses: courses,
  customLessons: lessons,
  customBlogs: blogPosts,
  selectedTrackId: null,
  studyPlan: {
    lessonIds: [],
    weeklyGoal: 3,
    sessionsPerWeek: 4,
  },
  completedFlashcards: [],
  dailyCheckins: [],
  reminderSettings: {
    enabled: true,
    studyDays: ["Monday", "Wednesday", "Saturday"],
    message: "Keep your learning streak alive with one focused study session today.",
  },
  accessibility: {
    fontScale: "default",
    highContrast: false,
    readingMode: false,
  },
  certificationPrep: [],
  caseStudyProgress: [],
  capstoneSubmitted: false,
  xp: 0,
  streak: 1,
};

export function loadAppState(): AppState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultAppState;
  }

  try {
    return { ...defaultAppState, ...(JSON.parse(raw) as AppState) };
  } catch {
    return defaultAppState;
  }
}

export function saveAppState(state: AppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetAppState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
