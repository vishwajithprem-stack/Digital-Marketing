import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { caseStudies, certificationPaths, courses, flashcards, learningTracks, lessons, quizQuestions, roadmapSteps, worksheets } from "../data/content";
import { createUser, verifyLogin } from "../utils/auth";
import { generateCertificatePdf } from "../utils/certificate";
import { awardBadges } from "../utils/gamification";
import { loadAppState, saveAppState } from "../utils/storage";
import {
  AppState,
  AccessibilityPreferences,
  Course,
  Lesson,
  Role,
  StudyPlan,
  UserProfile,
} from "../types";

interface AppContextValue {
  state: AppState;
  user: UserProfile | null;
  catalog: {
    courses: Course[];
    lessons: Lesson[];
    roadmap: typeof roadmapSteps;
    quiz: typeof quizQuestions;
    certificationPaths: typeof certificationPaths;
    tracks: typeof learningTracks;
    flashcards: typeof flashcards;
    worksheets: typeof worksheets;
    caseStudies: typeof caseStudies;
  };
  signUp: (name: string, email: string, password: string, role: Role) => { ok: boolean; message: string };
  login: (email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
  toggleLessonComplete: (lessonId: string) => void;
  saveNote: (lessonId: string, content: string, folder?: string, tags?: string[]) => void;
  toggleBookmark: (lessonId: string) => void;
  saveBookmarkToCollection: (collection: string, lessonId: string) => void;
  submitQuizScore: (quizId: string, score: number) => void;
  createCertificate: (courseName: string) => void;
  updateExternalCertificate: (pathId: string, status: "started" | "earned") => void;
  selectTrack: (trackId: string) => void;
  updateStudyPlan: (plan: Partial<StudyPlan>) => void;
  toggleStudyPlanLesson: (lessonId: string) => void;
  toggleFlashcardComplete: (flashcardId: string) => void;
  saveDailyCheckin: () => void;
  updateAccessibility: (updates: Partial<AccessibilityPreferences>) => void;
  updateReminderSettings: (days: string[], message: string, enabled: boolean) => void;
  updateCertificationPrep: (pathId: string, item: string) => void;
  saveCaseStudyResponse: (caseStudyId: string, response: string) => void;
  submitCapstone: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(() => loadAppState());

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const user = state.users.find((item) => item.id === state.currentUserId) || null;

  const updateState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      const completedLessons = Object.values(next.progress).filter(Boolean).length;
      const bestQuiz = Math.max(0, ...Object.values(next.quizScores));
      return {
        ...next,
        badges: awardBadges(completedLessons, bestQuiz, next.certificates.length),
      };
    });
  };

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      user,
      catalog: {
        courses: state.customCourses,
        lessons: state.customLessons,
        roadmap: roadmapSteps,
        quiz: quizQuestions,
        certificationPaths,
        tracks: learningTracks,
        flashcards,
        worksheets,
        caseStudies,
      },
      signUp: (name, email, password, role) => {
        if (state.users.some((item) => item.email === email.toLowerCase())) {
          return { ok: false, message: "An account with this email already exists locally." };
        }

        const newUser = createUser(name, email, password, role);
        updateState((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
          currentUserId: newUser.id,
          xp: prev.xp + 40,
        }));

        return { ok: true, message: "Local account created successfully." };
      },
      login: (email, password) => {
        const foundUser = verifyLogin(state.users, email, password);
        if (!foundUser) {
          return { ok: false, message: "Invalid local credentials. Create a demo account first." };
        }

        updateState((prev) => ({ ...prev, currentUserId: foundUser.id }));
        return { ok: true, message: "Welcome back. You are now logged in locally." };
      },
      logout: () => updateState((prev) => ({ ...prev, currentUserId: null })),
      toggleLessonComplete: (lessonId) =>
        updateState((prev) => {
          const lesson = prev.customLessons.find((item) => item.id === lessonId);
          const isBlocked = lesson?.prerequisiteIds?.some((id) => !prev.progress[id]);
          if (isBlocked) {
            return prev;
          }
          return {
            ...prev,
            progress: { ...prev.progress, [lessonId]: !prev.progress[lessonId] },
            xp: prev.progress[lessonId] ? Math.max(prev.xp - 25, 0) : prev.xp + 25,
            streak: prev.progress[lessonId] ? prev.streak : prev.streak + 1,
          };
        }),
      saveNote: (lessonId, content, folder = "General", tags = []) =>
        updateState((prev) => ({
          ...prev,
          notes: [...prev.notes, { id: crypto.randomUUID(), lessonId, content, createdAt: new Date().toISOString(), folder, tags }],
          xp: prev.xp + 10,
        })),
      toggleBookmark: (lessonId) =>
        updateState((prev) => ({
          ...prev,
          bookmarks: prev.bookmarks.includes(lessonId)
            ? prev.bookmarks.filter((item) => item !== lessonId)
            : [...prev.bookmarks, lessonId],
        })),
      saveBookmarkToCollection: (collection, lessonId) =>
        updateState((prev) => ({
          ...prev,
          bookmarkCollections: {
            ...prev.bookmarkCollections,
            [collection]: prev.bookmarkCollections[collection]?.includes(lessonId)
              ? prev.bookmarkCollections[collection]
              : [...(prev.bookmarkCollections[collection] || []), lessonId],
          },
        })),
      submitQuizScore: (quizId, score) =>
        updateState((prev) => ({
          ...prev,
          quizScores: { ...prev.quizScores, [quizId]: score },
          xp: prev.xp + Math.round(score / 2),
        })),
      createCertificate: (courseName) => {
        if (!user) return;
        const record = {
          id: `DMA-${Date.now()}`,
          courseName,
          studentName: user.name,
          completionDate: new Date().toLocaleDateString(),
        };
        generateCertificatePdf(record);
        updateState((prev) => ({
          ...prev,
          certificates: [...prev.certificates, record],
          xp: prev.xp + 80,
        }));
      },
      updateExternalCertificate: (pathId, status) =>
        updateState((prev) => {
          const existing = prev.externalCertificates.find((item) => item.pathId === pathId);
          const nextRecord = {
            pathId,
            status,
            completionDate: status === "earned" ? new Date().toLocaleDateString() : existing?.completionDate,
          };
          return {
            ...prev,
            externalCertificates: existing
              ? prev.externalCertificates.map((item) => (item.pathId === pathId ? nextRecord : item))
              : [...prev.externalCertificates, nextRecord],
            xp: prev.xp + (status === "earned" ? 60 : 15),
          };
        }),
      selectTrack: (trackId) => updateState((prev) => ({ ...prev, selectedTrackId: trackId, xp: prev.xp + 20 })),
      updateStudyPlan: (plan) =>
        updateState((prev) => ({
          ...prev,
          studyPlan: { ...prev.studyPlan, ...plan },
        })),
      toggleStudyPlanLesson: (lessonId) =>
        updateState((prev) => ({
          ...prev,
          studyPlan: {
            ...prev.studyPlan,
            lessonIds: prev.studyPlan.lessonIds.includes(lessonId)
              ? prev.studyPlan.lessonIds.filter((id) => id !== lessonId)
              : [...prev.studyPlan.lessonIds, lessonId],
          },
        })),
      toggleFlashcardComplete: (flashcardId) =>
        updateState((prev) => ({
          ...prev,
          completedFlashcards: prev.completedFlashcards.includes(flashcardId)
            ? prev.completedFlashcards.filter((id) => id !== flashcardId)
            : [...prev.completedFlashcards, flashcardId],
        })),
      saveDailyCheckin: () =>
        updateState((prev) => {
          const today = new Date().toISOString().slice(0, 10);
          if (prev.dailyCheckins.includes(today)) {
            return prev;
          }
          return {
            ...prev,
            dailyCheckins: [...prev.dailyCheckins, today],
            xp: prev.xp + 15,
            streak: prev.streak + 1,
          };
        }),
      updateAccessibility: (updates) =>
        updateState((prev) => ({
          ...prev,
          accessibility: { ...prev.accessibility, ...updates },
        })),
      updateReminderSettings: (days, message, enabled) =>
        updateState((prev) => ({
          ...prev,
          reminderSettings: { enabled, studyDays: days, message },
        })),
      updateCertificationPrep: (pathId, item) =>
        updateState((prev) => {
          const existing = prev.certificationPrep.find((entry) => entry.pathId === pathId);
          const nextChecklist = {
            ...(existing?.checklist || {}),
            [item]: !(existing?.checklist?.[item] || false),
          };
          const nextEntry = { pathId, checklist: nextChecklist };
          return {
            ...prev,
            certificationPrep: existing
              ? prev.certificationPrep.map((entry) => (entry.pathId === pathId ? nextEntry : entry))
              : [...prev.certificationPrep, nextEntry],
          };
        }),
      saveCaseStudyResponse: (caseStudyId, response) =>
        updateState((prev) => ({
          ...prev,
          caseStudyProgress: [
            ...prev.caseStudyProgress.filter((entry) => entry.caseStudyId !== caseStudyId),
            { caseStudyId, response, completedAt: new Date().toISOString() },
          ],
          xp: prev.xp + 25,
        })),
      submitCapstone: () =>
        updateState((prev) => ({
          ...prev,
          capstoneSubmitted: true,
          xp: prev.xp + 120,
        })),
      updateProfile: (updates) => {
        if (!user) return;
        updateState((prev) => ({
          ...prev,
          users: prev.users.map((item) => (item.id === user.id ? { ...item, ...updates } : item)),
        }));
      },
    }),
    [state, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
