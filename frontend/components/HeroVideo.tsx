import { getYoutubeEmbedUrl } from '@/lib/utils';

interface HeroVideoProps {
  videoId: string;
  subtitle: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function HeroVideo({ videoId, subtitle, title, description, children }: HeroVideoProps) {
  return (
    <section className="hero">
      <iframe
        className="hero-background-yt"
        src={getYoutubeEmbedUrl(videoId)}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={`Hero video ${videoId}`}
      />
      <div className="hero-overlay" />
      <div className="hero-content fade-in-up">
        <p className="hero-subtitle">{subtitle}</p>
        <h1 className="hero-title">{title}</h1>
        {description && <p className="hero-description">{description}</p>}
        {children}
      </div>
    </section>
  );
}
