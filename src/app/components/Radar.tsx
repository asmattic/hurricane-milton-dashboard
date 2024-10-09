import Link from 'next/link';

export default function Page() {
  return (
    <iframe
      src="https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJ3ZWF0aGVyIiwiY2VudGVyIjpbLTgyLjQyMSwyNy40NzZdLCJsb2NhdGlvbiI6Wy04My44MDEsMjcuMjEyXSwiem9vbSI6Ny40NDQ5ODY5MDUxMTk0NTksImxheWVyIjoiYnJlZl9xY2QifSwiYW5pbWF0aW5nIjp0cnVlLCJiYXNlIjoic2F0ZWxsaXRlIiwiYXJ0Y2MiOnRydWUsImNvdW50eSI6dHJ1ZSwiY3dhIjp0cnVlLCJyZmMiOmZhbHNlLCJzdGF0ZSI6dHJ1ZSwibWVudSI6dHJ1ZSwic2hvcnRGdXNlZE9ubHkiOmZhbHNlLCJvcGFjaXR5Ijp7ImFsZXJ0cyI6MC44LCJsb2NhbCI6MC42LCJsb2NhbFN0YXRpb25zIjowLjgsIm5hdGlvbmFsIjowLjkxfX0%3D"
      allowFullScreen
      className="md:w-600 sm:w-screen flex flex-col justify-center"
    />
  )
}