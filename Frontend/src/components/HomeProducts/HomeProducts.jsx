// HomeProducts.jsx
import LatestProductCard from "../../content/LatestProduct/LatestProductCard";
const HomeProducts = () => {
  return (
    <div className="min-h-screen bg-[#131313] p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex items-center overflow-hidden justify-center">
      <div className="w-full ">
        <LatestProductCard />
      </div>
    </div>
  );
};

export default HomeProducts;
