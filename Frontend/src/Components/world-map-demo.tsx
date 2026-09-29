import WorldMap from "./ui/world-map";

export default function WorldMapDemo() {
  return (
    <div className="relative flex h-full min-h-[380px] flex-col overflow-hidden bg-[#f8fafc] px-7 pb-9 pt-10 sm:px-10 lg:min-h-screen lg:px-14 lg:pb-14 lg:pt-16">
      <div className="absolute inset-x-0 top-[8%] px-2 sm:px-5 lg:top-[23%] lg:px-8">
        <WorldMap
          lineColor="#4f46e5"
          dots={[
            { start: { lat: 40.7128, lng: -74.006 }, end: { lat: 51.5074, lng: -0.1278 } },
            { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 19.076, lng: 72.8777 } },
            { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 37.7749, lng: -122.4194 } },
            { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 40.7128, lng: -74.006 } },
          ]}
        />
      </div>
      <div className="relative z-10 mt-auto pt-56 lg:pt-[32rem]">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
          One place for every platform
        </p>
        <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl">
          Make every post count.
        </h2>
        <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
          Plan, create, and keep your channels in sync from a calmer workspace.
        </p>
      </div>
    </div>
  );
}
