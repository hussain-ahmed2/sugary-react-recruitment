import React, { memo } from "react";
import { BASE_IMAGE_URL } from "../../api/axios";

/**
 * Material card component.
 * @param {object} item Material object from the API.
 * @returns {JSX.Element} The material card JSX element.
 */
const MaterialCard = ({ item }) => {
	const { CoverPhoto, Title, VariantTitle, SalesPriceInUsd } = item;

	return (
		<div className="bg-white shadow hover:shadow-xl rounded-lg overflow-hidden border border-neutral-200 transition duration-300 hover:scale-[1.02]">
			<img
				src={`${BASE_IMAGE_URL}/${CoverPhoto}`}
				alt={Title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h2 className="text-lg font-bold mb-1">{Title}</h2>
				<p className="text-sm text-gray-600 mb-2">
					{VariantTitle || "No Subtitle"}
				</p>
				<p className="text-cyan-600 font-semibold">
					${SalesPriceInUsd.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default memo(MaterialCard);

