import Link from "next/link";

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
    <div className="flex flex-col border rounded-lg shadow-lg mr-12 p-4 w-full lg:w-1/3 text-center hover:bg-white hover:bg-opacity-75 h-full mb-4 lg:mb-0">
      <img
        src={imageUrl}
        alt={`${make} ${model}`}
        height={100}
        width={100}
        className="w-full mb-4"
      />
      <div className="mb-2">
        <h3>
          {year} {make} {model}
        </h3>
      </div>
      <div className="mb-2">{clientName}</div>
      <Link href={`/vehicle/${_id}`}>
        <button className="w-3/4 lg:w-full p-2 bg-yellow-500 hover:bg-yellow-300 rounded-full shadow-lg mb-5">
          View
        </button>
      </Link>
      <Link href={`/admin/update-vehicle/${_id}`}>
        <button className="w-3/4 lg:w-full p-2 bg-yellow-500 hover:bg-yellow-300 rounded-full shadow-lg">
          Update
        </button>
      </Link>
    </div>
  );
}
