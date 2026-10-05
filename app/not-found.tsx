import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-4xl md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That route doesn’t exist—or it moved. Let’s get you back to something
        useful.
      </p>
      <Button href="/" className="mt-8">
        Back home
      </Button>
    </Container>
  );
}
