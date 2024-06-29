import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className=" h-[calc(100vh-80px)] flex-center w-full">
      <Card className="text-pink2blue_yellow2pink bg-transparent w-full max-w-[520px] border-none p-6">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-purple2blue">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
