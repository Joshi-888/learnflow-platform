import type { Video } from "@/data/courses";

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-primary">
      <iframe
        key={video.id}
        src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
