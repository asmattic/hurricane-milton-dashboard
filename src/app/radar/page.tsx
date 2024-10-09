
export default function Page() {
  return (
    <div className="grid items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start">
        <iframe
          className="flex h-screen w-screen"
          src="https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJ3ZWF0aGVyIiwiY2VudGVyIjpbLTgyLjQyMSwyNy40NzZdLCJsb2NhdGlvbiI6Wy04My44MDEsMjcuMjEyXSwiem9vbSI6Ny40NDQ5ODY5MDUxMTk0NTksImxheWVyIjoiYnJlZl9xY2QifSwiYW5pbWF0aW5nIjp0cnVlLCJiYXNlIjoic2F0ZWxsaXRlIiwiYXJ0Y2MiOnRydWUsImNvdW50eSI6dHJ1ZSwiY3dhIjp0cnVlLCJyZmMiOmZhbHNlLCJzdGF0ZSI6dHJ1ZSwibWVudSI6dHJ1ZSwic2hvcnRGdXNlZE9ubHkiOmZhbHNlLCJvcGFjaXR5Ijp7ImFsZXJ0cyI6MC44LCJsb2NhbCI6MC42LCJsb2NhbFN0YXRpb25zIjowLjgsIm5hdGlvbmFsIjowLjkxfX0%3D"
          allowFullScreen
        />
      </main>
    </div>
  );
}
