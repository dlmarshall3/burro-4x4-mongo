import Image from "next/image";

export default function VehicleUpdateCard(update) {
  return (
    <div className="mb-4 mr-12 flex h-full w-full flex-col rounded-lg border shadow-lg lg:mb-6 lg:w-1/2">
      <div className="w-full rounded-t-lg bg-white py-2 pl-4">
        <h2>{update.update.date}</h2>
      </div>
      <div className="w-full p-4">{update.update.update}</div>
      <div className="w-full p-4">
        {update.update.imageUrls.map((image: string) => (
          <Image src={image} key={image} width={100} height={100} alt={image} />
        ))}
      </div>
    </div>
  );
}
