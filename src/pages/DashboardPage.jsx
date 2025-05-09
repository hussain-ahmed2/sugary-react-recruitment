import React from "react";
import useAuth from "../hooks/useAuth";
import Materials from "../components/materials/Materials";
import Header from "../components/Header";

// Dashboard page component
const DashboardPage = () => {
	const { auth } = useAuth();

	// Render the dashboard page
	return (
		<section>
			<Header />
			<div className="py-5 bg-neutral-100 min-h-[calc(100vh-5rem)]">
				<div className="max-w-7xl mx-auto">
					{/* Greeting */}
					<h3 className="mb-5 mx-5">
						Welcome,{" "}
						<span className="font-medium">
							{/* Display user's full name */}
							{auth.user.FullName}
						</span>
					</h3>

					{/* Materials section */}
					<div>
						<h3 className="text-center font-bold text-2xl mb-5">
							Materials
						</h3>
						{/* Render the materials list */}
						<Materials />
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardPage;

