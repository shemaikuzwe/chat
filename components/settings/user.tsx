import { useSession } from "~/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Customization from "./customization";

export default function Personalization() {
  const { data } = useSession();
  return (
    <div className="h-full mb-4 mx-10">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex items-center space-x-4 space-y-2">
          <Avatar className="w-16 h-16 border-2 border-border">
            <AvatarImage src="/placeholder.svg" alt="user" />
            <AvatarFallback className="bg-muted text-xl font-bold">
              {data?.user?.name.split(" ")[0][0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{data?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
          </div>
        </div>
      </section>

      <Separator className="my-4" />

      <Customization />
    </div>
  );
}
