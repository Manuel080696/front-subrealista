export function Main({ children }) {
  return (
    <main className={"flex flex-col flex-grow p-8 justify-center items-center"}>
      {children}
    </main>
  );
}
