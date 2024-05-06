export function Main({ children }) {
  return (
    <main className={`flex flex-col flex-grow p-8 items-center justify-center`}>
      {children}
    </main>
  );
}
