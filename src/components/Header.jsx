import React from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

/**
 * Header component that displays the application title and a logout button
 */
const Header = () => {
	const { logout } = useAuth();
	return (
		<header className="bg-white sticky top-0 border-b border-neutral-200 z-50">
			<nav className="max-w-7xl mx-auto px-5 min-h-20 flex items-center justify-between">
				<h2 className="text-3xl font-bold">Dashboard</h2>
				<Button
					label="Logout"
					onClick={logout}
					className="bg-rose-500 hover:bg-rose-600 active:bg-rose-600 ring-rose-500/20"
				/>
			</nav>
		</header>
	);
};

export default Header;

