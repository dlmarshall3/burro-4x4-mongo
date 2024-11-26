import Link from "next/link";
import Image from "next/image";

interface VehicleDashboardCardProps {
  vehicleData: {
    _id: string;
    year: string;
    make: string;
    model: string;
    imageUrl: string;
    clientId: string;
    clientName: string;
  };
}

export default function VehicleDashboardCard({
  vehicleData,
}: VehicleDashboardCardProps) {
  const { imageUrl, year, make, model, clientName, _id } = vehicleData;
  return (
    <div className="mb-4 mr-12 flex h-full w-full flex-col rounded-lg border p-4 text-center shadow-lg hover:bg-white hover:bg-opacity-75 lg:w-1/2">
      <Image
        src={imageUrl}
        alt={`${make} ${model}`}
        height={100}
        width={400}
        className="mb-4 w-full"
      />
      <div className="mb-4">
        <h3 className="text-xl font-bold underline">
          {year} {make} {model}
        </h3>
      </div>
      <div className="mb-4 text-lg">{clientName}</div>
      <Link href={`/vehicle/${_id}`}>
        <button className="mb-4 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] lg:w-full">
          View
        </button>
      </Link>
      <Link href={`/admin/update-vehicle/${_id}`}>
        <button className="w-3/4 rounded-full bg-[#5d8075] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#5d8075] lg:w-full">
          Update
        </button>
      </Link>
    </div>
  );
}
