export interface IAddVehicleVehicleData {
  year: string;
  make: string;
  model: string;
  clientId: string;
  clientName: string;
  file: File | null;
}

export interface IAddVehicleUser {
  _id: string;
  name: string;
}
