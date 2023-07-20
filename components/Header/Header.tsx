import Link from "next/link";
import style from "./Header.module.css";

const Header = () => {
	return (  
		<header className={style.header}>
			<Link className={style.link} href="/">Home</Link>
			<Link className={style.link} href="/blog">Blog</Link>
			<Link className={style.link} href="/about">About</Link>
		</header>
	);
}
 
export default Header;
<header>
	<h2>header</h2>
</header>