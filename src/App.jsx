import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { NewUserPage } from "./pages/new-user";
import { NotFound } from "./pages/not-found";
import { LoginUserPage } from "./pages/login-page";
import { UserPage } from "./pages/user-page";
import { useState } from "react";
import RentCreateForm from "../src/forms/rent-create-form/rent-create-form";
import { PostPage } from "./pages/post-page";
import { Valoraciones } from "./pages/valoraciones";
import { EditUserPage } from "./pages/edit-user-page";
import { Validate } from "./pages/validate";

function App() {
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [success, setSuccess] = useState();

	const handleFilteredPosts = (posts) => {
		setFilteredPosts(posts);
	};

	return (
		<>
			<Header
				handleFilteredPosts={handleFilteredPosts}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<Routes>
				<Route
					index
					element={
						<Home
							filteredPosts={filteredPosts}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							success={success}
							setSuccess={setSuccess}
						/>
					}
				/>

				<Route path="/register" element={<NewUserPage />} />
				<Route path="/rent-create" element={<RentCreateForm />} />
				<Route path="/login" element={<LoginUserPage />} />
				<Route path="/validate" element={<Validate />} />
				<Route path="/users/">
					<Route path=":username" element={<UserPage />} />
					<Route path=":username/update" element={<EditUserPage />} />
				</Route>
				<Route
					path="/rent/:id"
					element={<PostPage setSuccess={setSuccess} success={success} />}
				/>
				<Route path="/valoraciones/" element={<Valoraciones />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
