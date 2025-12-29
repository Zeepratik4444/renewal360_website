import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/features", label: "Features" },
		{ to: "/pricing", label: "Pricing" },
		{ to: "/how-it-works", label: "How It Works" },
		{ to: "/about", label: "About" },
		{ to: "/faq", label: "FAQ" },
	];

	return (
		<nav className="bg-white border-b sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link to="/" className="text-2xl font-bold text-blue-600">
							Renewal360
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-gray-700 hover:text-blue-600 transition-colors"
								activeProps={{
									className: "text-blue-600 font-semibold",
								}}
							>
								{link.label}
							</Link>
						))}
						<Link to="/contact">
							<Button>Request Demo</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X /> : <Menu />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden border-t bg-white">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
								activeProps={{
									className: "bg-blue-50 text-blue-600 font-semibold",
								}}
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<Link to="/contact" onClick={() => setIsMenuOpen(false)}>
							<Button className="w-full mt-2">Request Demo</Button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
