import {CategoryStripBannerProps} from '../modules/types_file';

const CategoryStripBanner: React.FC<CategoryStripBannerProps> = ({
  categoryName,
}) => {
  return (
    <>
      <div className="w-full flex items-center justify-start py-4">
        <div className="text-sm sm:text-base flex items-center justify-center w-fit h-10 px-10 py-4 bg-gradient-to-r from-red-900 via-red-700 to-red-500 text-white">
          {categoryName}
        </div>
      </div>
    </>
  );
};

export default CategoryStripBanner;
