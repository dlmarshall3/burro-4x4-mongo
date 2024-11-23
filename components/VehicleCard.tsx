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
    <div className="flex flex-col border rounded-lg shadow-lg mr-12 p-4 w-1/4 text-center hover:bg-white hover:bg-opacity-75 h-full">
      <img
        src={imageUrl}
        alt={`${make} ${model}`}
        height={100}
        width={100}
        className="w-full mb-4"
      />
      <div>
        <h3>
          {year} {make} {model}
        </h3>
      </div>
      <div>{clientName}</div>
      <Link href={`/vehicle/${_id}`}>View</Link>
      <Link href={`/admin/update-vehicle/${_id}`}>Update</Link>
    </div>
  );
}
