import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/add-vehicle">
        <button className="mb-2 w-1/4 rounded-full bg-green-500 p-2 shadow-lg hover:bg-green-300">
          Add vehicle
        </button>
      </Link>
      <Link href="/admin/vehicles">
        <button className="w-1/4 rounded-full bg-yellow-500 p-2 shadow-lg hover:bg-yellow-300">
          Update vehicle
        </button>
      </Link>
    </div>
  );
}
