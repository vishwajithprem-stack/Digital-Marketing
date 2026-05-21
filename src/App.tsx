import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppProvider, useAppContext } from "./context/AppContext";
import { AuthPage } from "./pages/AuthPage";
import { BlogPage } from "./pages/BlogPage";
import { CapstonePage } from "./pages/CapstonePage";
import { CertificatesPage } from "./pages/CertificatesPage";
import { CoursesPage } from "./pages/CoursesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { IntroPage } from "./pages/IntroPage";
import { LessonsPage } from "./pages/LessonsPage";
import { PracticeLabsPage } from "./pages/PracticeLabsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QuizPage } from "./pages/QuizPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { RevisionPage } from "./pages/RevisionPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { SearchPage } from "./pages/SearchPage";

function RootRedirect() {
  const { user } = useAppContext();
  return <Navigate to={user ? "/welcome" : "/auth"} replace />;
}

function GuestOnlyRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppContext();
  if (user) {
    return <Navigate to="/welcome" replace />;
  }
  return children;
}

function AcademyRoutes() {
  return (
    <ProtectedRoute>
      <Layout>
        <Routes>
          <Route path="/welcome" element={<IntroPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/labs" element={<PracticeLabsPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/capstone" element={<CapstonePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/auth"
          element={
            <GuestOnlyRoute>
              <AuthPage />
            </GuestOnlyRoute>
          }
        />
        <Route path="*" element={<AcademyRoutes />} />
      </Routes>
    </AppProvider>
  );
}
