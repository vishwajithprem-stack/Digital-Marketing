export type Role = "student" | "mentor" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  bio: string;
  goal: string;
  joinedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  module: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  summary: string;
  content: string[];
  videoUrl?: string;
  watchUrl?: string;
  resourceTitle?: string;
  resourceUrl?: string;
  tags: string[];
  prerequisiteIds?: string[];
}

export interface Course {
  id: string;
  title: string;
  summary: string;
  level: string;
  duration: string;
  lessons: string[];
  outcomes: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  focus: string;
  skills: string[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
  publishedAt: string;
}

export interface ProjectBrief {
  id: string;
  title: string;
  difficulty: string;
  brief: string;
  deliverables: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  comments: CommunityComment[];
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface MentorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  lessonId: string;
  content: string;
  createdAt: string;
  folder: string;
  tags: string[];
}

export interface CertificateRecord {
  id: string;
  courseName: string;
  studentName: string;
  completionDate: string;
}

export interface CertificationPath {
  id: string;
  courseId: string;
  title: string;
  provider: string;
  summary: string;
  url: string;
  cost: "Free";
}

export interface ExternalCertificateProgress {
  pathId: string;
  status: "not-started" | "started" | "earned";
  completionDate?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  summary: string;
  status: "draft" | "submitted" | "approved";
  updatedAt: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  summary: string;
  targetRole: string;
  recommendedCourseIds: string[];
  recommendedCertificationIds: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  prompt: string;
  recommendedResponse: string[];
  category: string;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  template: string[];
  category: string;
}

export interface StudyPlan {
  lessonIds: string[];
  weeklyGoal: number;
  sessionsPerWeek: number;
}

export interface AccessibilityPreferences {
  fontScale: "default" | "large";
  highContrast: boolean;
  readingMode: boolean;
}

export interface ReminderSettings {
  enabled: boolean;
  studyDays: string[];
  message: string;
}

export interface CertificationPrepProgress {
  pathId: string;
  checklist: Record<string, boolean>;
}

export interface CaseStudyProgress {
  caseStudyId: string;
  response: string;
  completedAt: string;
}

export interface AppState {
  users: UserProfile[];
  currentUserId: string | null;
  progress: Record<string, boolean>;
  quizScores: Record<string, number>;
  badges: string[];
  certificates: CertificateRecord[];
  externalCertificates: ExternalCertificateProgress[];
  notes: NoteItem[];
  bookmarks: string[];
  bookmarkCollections: Record<string, string[]>;
  customCourses: Course[];
  customLessons: Lesson[];
  customBlogs: BlogPost[];
  selectedTrackId: string | null;
  studyPlan: StudyPlan;
  completedFlashcards: string[];
  dailyCheckins: string[];
  reminderSettings: ReminderSettings;
  accessibility: AccessibilityPreferences;
  certificationPrep: CertificationPrepProgress[];
  caseStudyProgress: CaseStudyProgress[];
  capstoneSubmitted: boolean;
  xp: number;
  streak: number;
}
