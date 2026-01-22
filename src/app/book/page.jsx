import { Suspense } from "react";
import BookYourPhysioClient from "./BookYourPhysioClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0D1117] text-[#E2E8F0] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BookYourPhysioClient />
    </Suspense>
  );
}
