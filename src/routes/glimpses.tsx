import { createFileRoute } from "@tanstack/react-router";
import { GlimpsesPage } from "@/components/pages/GlimpsesPage";

export const Route = createFileRoute("/glimpses")({
	component: GlimpsesPage,
});
