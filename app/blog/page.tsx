import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Blog',
}

async function getDataFromStrapi() {
	const response = await fetch('http://localhost:1337/api/blogs/', {
		headers: {
			authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
		},
		next: {
			revalidate: 60, //будет раз в минуту делать запрос на сервер для обновления данных, новая фича в next.js
		}
	});

	if (!response.ok) throw new Error("Unable to fetch posts")

	return response.json();
}

interface Post {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    article: string;
    date: string;
  };
}

const Blog = async () => {
	const posts = await getDataFromStrapi().then((data) => data.data);
	return (  
		<>
			<h1>Blog page</h1>
			<ul style={{padding: "20px 0"}}>
				{posts.map((post: Post) => (
					<li key={post.id}>
						<Link href={`/blog/${post.id}`}>{post.attributes.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
 
export default Blog;