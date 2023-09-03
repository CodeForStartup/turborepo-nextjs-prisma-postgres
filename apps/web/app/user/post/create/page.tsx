import { Button } from "@/components/ui/button";
import Editor from "@/molecules/Editor";
import InputTitle from "@/molecules/InputTitle";
import Image from "next/image";

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl lg:px-8">
      <div className="flex justify-between p-2">
        <div>
          <Image
            alt="codeforstartup.com"
            src="/assets/logo.png"
            width={40}
            height={40}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="link">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl lg:px-8 mt-8">
        <InputTitle placeholder="Title..." />
        <Editor placeholder="Content..." />
      </div>
    </div>
  );
}
