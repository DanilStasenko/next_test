import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Blog',
}

async function getData() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		next: {
			revalidate: 60, //будет раз в минуту делать запрос на сервер для обновления данных, новая фича в next.js
		}
	});

	if (!response.ok) throw new Error("Unable to fetch posts")

	return response.json()
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Blog = async () => {
	const posts = await getData();;
	return (  
		<>
			<h1>Blog page</h1>
			<ul style={{padding: "20px 0"}}>
				{posts.map((post: Post) => (
					<li key={post.id}>
						<Link href={`/blog/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
 
export default Blog;