import Image from "next/image";
import logoImage from "../../public/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center py-2">
          <div className="w-16">
            <Link href={process.env.NEXT_PUBLIC_WEB_URL}>
              <Image
                src={logoImage}
                width={48}
                height={48}
                alt="CODE FOR STARTUP"
              />
            </Link>
          </div>
          <div className="flex-1">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Top 10 ideas to build startup..."
                  className="input input-bordered w-full max-w-xs"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">LOGIN</Button>
            <Button variant="outline" size="md">
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
