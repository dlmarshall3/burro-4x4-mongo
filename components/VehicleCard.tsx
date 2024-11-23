interface VehicleDashboardCardProps {
    vehicleData: {
      id: string;
      year: string;
      make: string;
      model: string;
      image_url: string;
      client: string;
    };
  }
  
  export default function VehicleDashboardCard({
    vehicleData,
  }: VehicleDashboardCardProps) {
    const { image_url, year, make, model } = vehicleData;
    return (
      <div className="flex flex-col">
        <img src={image_url} alt={`${make} ${model}`} />
        <h3>
          {year} {make} {model}
        </h3>
      </div>
    );
  }
  