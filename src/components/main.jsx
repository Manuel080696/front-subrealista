import { useParams } from "react-router-dom";

export function Main({ children }) {
  const { username } = useParams();
  return (
    <main
      className={`flex flex-col flex-grow p-8 ${
        username > 0 ? "justify-start md:h-screen" : "justify-center"
      } items-center`}
    >
      {children}
    </main>
  );
}
