import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="flex justify-between container max-w-6xl mx-auto p-4 sm:px-6 items-center lg:px-8">
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-4">
          <a href="/">
            <Image
              alt="codeforstartup.com"
              src="/assets/logo.png"
              width={40}
              height={40}
            />
          </a>
        </div>
        <div className="flex items-center">
          <div className="mx-2">About</div>
          <div className="mx-2">Contact</div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mx-2">
          <Button variant="link">Sign up</Button>
        </div>
        <div className="mx-2">
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
}
