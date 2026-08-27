import Link from "next/link";
import Heading from "@/components/heading";
import { ticketsPath } from "@/lib/paths";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Home"
        description="Your journey to mastering Next.js begins here."
      />

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
