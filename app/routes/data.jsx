import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = () => {
	return json({message: "hello there"});
}

export default function Data() {
	const loaderData = useLoaderData();


	return <div>{loaderData.message}</div>;
}
