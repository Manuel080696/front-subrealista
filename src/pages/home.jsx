import HouseArticle from "../components/house-article";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center max-w-full overflow-hidden">
      <section className="flex flex-row max-w-full"></section>
      <section className="flex flex-wrap p-10 gap-10 justify-center items-center max-w-full">
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
        <HouseArticle />
      </section>
    </main>
  );
}
