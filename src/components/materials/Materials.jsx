import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../api/axios";
import MaterialCard from "./MaterialCard";

const Materials = () => {
	const { auth } = useAuth();
	const [materials, setMaterials] = useState([]);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const limit = 20;

	// Fetches materials from the API and updates the state
	const fetchData = useCallback(
		async () => {
			try {
				// The filter is a base64 encoded JSON string
				// that contains the skip and limit parameters
				// and the material type (1 for images)
				const filter = btoa(
					JSON.stringify({ Skip: skip, Limit: limit, Types: [1] })
				);

				const res = await api.get(`/Materials/GetAll/?filter=${filter}`, {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});

				const newMaterials = res.data.Materials || [];
				// console.log(newMaterials)
				setMaterials((prev) => [...prev, ...newMaterials]);
				setSkip((prev) => prev + limit);
				if (newMaterials.length < limit) setHasMore(false);
			} catch (err) {
				console.error("Fetch failed", err);
				setHasMore(false);
			}
		},
		[auth.accessToken, skip]
	);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<InfiniteScroll
			dataLength={materials.length}
			next={fetchData}
			hasMore={hasMore}
			loader={<h4 className="text-center">Loading...</h4>}
			endMessage={
				<p className="text-center mt-4 font-semibold text-gray-500">
					<b>Yay! You have seen it all</b>
				</p>
			}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
				{materials.map((item) => (
					<MaterialCard key={item.Id} item={item} />
				))}
			</div>
		</InfiniteScroll>
	);
};

export default Materials;

