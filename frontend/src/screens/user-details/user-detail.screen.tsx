import { PostCard } from "@/components/post-card/post-card.component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronDownIcon, Command } from "lucide-react";
import { useParams } from "react-router-dom";

export const UserDetailScreen = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchProfileByIdQuery(id);
  const { displayName, avatar, email } = data?.data || {};

  return (
    <>
      {/* {isLoading ? (
        <h1>Loadinh.....</h1>
      ) : (
        <>
          <div>
            <h1>{displayName}</h1>
            <img src={avatar} alt="avatar" />
          </div>
        </>
      )} */}

      <div>
        {isLoading ? (
          <div>
            {new Array(5).fill(5).map((_, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-background w-2/3">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>User Info</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      className="rounded-full"
                      style={{
                        borderRadius: "50%",
                        height: "80px",
                        width: "80px",
                      }}
                    >
                      <AvatarImage
                        src={avatar}
                        className="aspect-square h-full w-full"
                        style={{
                          borderRadius: "50%",
                          height: "80px",
                          width: "80px",
                        }}
                      />
                      <AvatarFallback
                        style={{
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                        }}
                      >
                        OM
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-large leading-none">
                    {displayName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{email}</p>
                </div>
              </CardContent>
            </Card>
            <div className="mt-10">
              <h2 className="font-semibold leading-none tracking-tight mb-4">
                Verified Posts
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
