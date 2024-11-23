import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <Link href="/admin/add-vehicle">
        <button className="w-1/4 p-2 bg-green-500 hover:bg-green-300 mb-2 rounded-full shadow-lg">
          Add vehicle
        </button>
      </Link>
      <Link href="/admin/update-vehicle">
        <button className="w-1/4 p-2 bg-yellow-500 hover:bg-yellow-300 rounded-full shadow-lg">
          Update vehicle
        </button>
      </Link>
    </div>
  );
}
