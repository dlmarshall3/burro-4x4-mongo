
interface VehicleDashboardCardProps {
    vehicleData: {
      _id: string;
      year: string;
      make: string;
      model: string;
      imageUrl: string;
      clientId: string;
    };
  }
  
  export default function VehicleDashboardCard({
    vehicleData,
  }: VehicleDashboardCardProps) {
    const { imageUrl, year, make, model } = vehicleData;
    return (
      <div className="flex flex-col">
        <img src={imageUrl} alt={`${make} ${model}`} />
        <h3>
          {year} {make} {model}
        </h3>
      </div>
    );
  }
  