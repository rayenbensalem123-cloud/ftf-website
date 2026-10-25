import { createFileRoute, redirect } from "@tanstack/react-router";

// The Ligue 1 table lives on the league's own website; keep old links working.
export const Route = createFileRoute("/classement")({
  beforeLoad: () => {
    throw redirect({ to: "/equipe-nationale" });
  },
});
