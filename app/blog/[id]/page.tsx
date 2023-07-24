import { Metadata } from "next";

async function getData(id: string) {
	const response = await fetch(`http://localhost:1337/api/blogs/${id}`, {
		headers: {
			authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		},
		next: {
			revalidate: 60, //будет раз в минуту делать запрос на сервер для обновления данных, новая фича в next.js
		}
	});

	if (!response.ok) throw new Error("Unable to fetch posts")

	return response.json()
}

type Props = {
	params: {
		id: string;
	}
}

export async function generateMetadata({params: {id}} : Props): Promise<Metadata> {
	const post = await getData(id).then((data) => data.data);
	return {
		title: post.attributes.title
	}
}

const Post = async ({params: {id}} : Props) => {
  const post = await getData(id).then((data) => data.data);
	return (  
		<>
			<h1>{post.attributes.title}</h1>
			<p>{post.attributes.article}</p>
			<p>{post.attributes.date}</p>
		</>
	);
}
 
export default Post;