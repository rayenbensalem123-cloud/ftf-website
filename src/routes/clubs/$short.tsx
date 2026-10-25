import { createFileRoute, redirect } from "@tanstack/react-router";

// Club pages live on the league's own website; keep old links working.
export const Route = createFileRoute("/clubs/$short")({
  beforeLoad: () => {
    throw redirect({ to: "/equipe-nationale" });
  },
});
