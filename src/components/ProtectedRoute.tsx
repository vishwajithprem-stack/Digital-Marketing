import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAppContext } from "../context/AppContext";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}
