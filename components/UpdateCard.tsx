/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function VehicleUpdateCard(update: any) {
  function handleDownload(imageUrl: string) {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = imageUrl.split("/").pop()!;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className="mb-4 mr-12 flex h-full w-full flex-col rounded-lg border bg-white bg-opacity-30 shadow-lg lg:mb-6 lg:w-1/2">
      <div className="w-full rounded-t-lg bg-white py-2 pl-4">
        <h2>{update.update.date}</h2>
      </div>
      <div className="w-full p-4">{update.update.update}</div>
      <div className="w-full p-4">
        {update.update.imageUrls.map((image: string) => (
          <div key={image}>
            <img
              src={image}
              alt={image}
              className={update.update.imageUrls.length > 1 ? "mb-4" : ""}
            />

            <button
              onClick={() => handleDownload(image)}
              className="mb-4 mt-4 w-3/4 rounded-full bg-[#006b78] p-2 text-white shadow-lg hover:bg-transparent hover:text-black hover:outline hover:outline-[#006b78] sm:w-1/2 lg:w-1/3"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
