import {Triangle} from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-70 flex justify-center items-center">
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};

export default Loader;
