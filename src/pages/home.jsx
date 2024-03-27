import HouseArticle from "../components/house-article";

export default function Home() {
  const images = [
    {
      imgPath:
        "https://arquitecturaviva.com/assets/uploads/articulos/71318/av_182045.webp?h=00ebdec0",
    },
    {
      imgPath:
        "https://s3.eu-west-1.amazonaws.com/blog.zazume.com/wp-content/uploads/2022/09/06111525/house-g6112fc1a3_640.jpg",
    },
    {
      imgPath:
        "https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg",
    },
    {
      imgPath:
        "https://st2.depositphotos.com/1041088/11595/i/450/depositphotos_115954550-stock-photo-home-exterior-with-garage-and.jpg",
    },
  ];
  return (
    <main className="w-full justify-center items-center overflow-hidden">
      <section className="grid grid-cols-1 gap-5 p-10 md:grid-cols-3 xl:grid-cols-5">
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} />
        <HouseArticle images={images} /> <HouseArticle images={images} />
        <HouseArticle images={images} /> <HouseArticle images={images} />
        <HouseArticle images={images} />
      </section>
    </main>
  );
}
