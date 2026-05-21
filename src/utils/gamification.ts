export function calculateLevel(xp: number) {
  if (xp >= 1600) return "Growth Architect";
  if (xp >= 1100) return "Performance Strategist";
  if (xp >= 700) return "Campaign Builder";
  if (xp >= 350) return "Marketing Explorer";
  return "Starter";
}

export function awardBadges(completedLessons: number, quizHighScore: number, certificateCount: number) {
  const badges: string[] = [];
  if (completedLessons >= 1) badges.push("First Lesson Complete");
  if (completedLessons >= 4) badges.push("Consistency Builder");
  if (quizHighScore >= 75) badges.push("Quiz Finisher");
  if (quizHighScore >= 100) badges.push("Perfect Score");
  if (certificateCount >= 1) badges.push("Certified Marketer");
  if (completedLessons >= 6 && certificateCount >= 1) badges.push("Academy Champion");
  return badges;
}

export function completionPercentage(completedLessons: number, totalLessons: number) {
  if (!totalLessons) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}
