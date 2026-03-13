import { create } from "zustand";

interface VideoProgress {
  videoId: string;
  courseId: string;
  watchedSeconds: number;
  completed: boolean;
}

interface ProgressState {
  progress: Record<string, VideoProgress>;
  enrolledCourses: string[];
  enroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  updateProgress: (videoId: string, courseId: string, seconds: number) => void;
  markComplete: (videoId: string, courseId: string) => void;
  getVideoProgress: (videoId: string) => VideoProgress | undefined;
  getCourseProgress: (courseId: string, totalVideos: number) => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: {},
  enrolledCourses: [],
  enroll: (courseId) =>
    set((state) => ({
      enrolledCourses: state.enrolledCourses.includes(courseId)
        ? state.enrolledCourses
        : [...state.enrolledCourses, courseId],
    })),
  isEnrolled: (courseId) => get().enrolledCourses.includes(courseId),
  updateProgress: (videoId, courseId, seconds) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [videoId]: {
          videoId,
          courseId,
          watchedSeconds: seconds,
          completed: state.progress[videoId]?.completed || false,
        },
      },
    })),
  markComplete: (videoId, courseId) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [videoId]: {
          videoId,
          courseId,
          watchedSeconds: state.progress[videoId]?.watchedSeconds || 0,
          completed: true,
        },
      },
    })),
  getVideoProgress: (videoId) => get().progress[videoId],
  getCourseProgress: (courseId, totalVideos) => {
    const completed = Object.values(get().progress).filter(
      (p) => p.courseId === courseId && p.completed
    ).length;
    return totalVideos > 0 ? Math.round((completed / totalVideos) * 100) : 0;
  },
}));
