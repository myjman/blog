interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title = 'YouTube video' }: YouTubeEmbedProps) {
  return (
    <div className="relative my-8 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        loading="lazy"
      />
    </div>
  )
}
