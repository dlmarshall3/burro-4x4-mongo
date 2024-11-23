import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/add-vehicle">
        <button className="mb-2 w-3/4 rounded-full bg-green-500 p-2 shadow-lg hover:bg-green-300 sm:w-1/2 lg:w-1/3">
          Add vehicle
        </button>
      </Link>
      <Link href="/admin/vehicles">
        <button className="w-3/4 rounded-full bg-yellow-500 p-2 shadow-lg hover:bg-yellow-300 sm:w-1/2 lg:w-1/3">
          Update vehicle
        </button>
      </Link>
    </div>
  );
}
