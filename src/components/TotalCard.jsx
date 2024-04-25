/* eslint-disable react/prop-types */
function TotalCard({ total, description }) {
  return (
    <div className="flex rounded-lg p-2 bg-white pr-5 grow text-center items-center justify-center">
      <div>
        <p className="text-black bg-white text-2xl font-semibold ml-1">
          {description}
        </p>
        <h1 className="font-bold sm:text-9xl text-7xl bg-white ml-1">
          ${parseFloat(total)}
        </h1>
        <p className="text-neutral-500 bg-white ml-1">Whispering Wallet</p>
      </div>
    </div>
  );
}

export default TotalCard;
