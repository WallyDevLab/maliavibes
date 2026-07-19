import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-flare mb-4">404</p>
        <h1 className="font-display text-4xl text-parchment md:text-5xl">
          This page went off tour
        </h1>
        <p className="mt-4 text-parchment-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Back home</Button>
          <Button href="/music" variant="secondary">
            Browse music
          </Button>
        </div>
      </Container>
    </div>
  );
}
