import React from "react";
import { PostCard } from "@/components/post-card/post-card.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";

export const ProfileScreen = () => {
  const { uid } = useSelector((state) => state?.auth.userInfo);

  const { isError, isLoading, data } = useFetchProfileByIdQuery(uid);
  const { displayName, avatar, email } = data?.data || {};

  return (
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
              <CardTitle>Profile</CardTitle>
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
                <Button variant="outline" className="ml-auto">
                  <Pencil1Icon className="mr-4 h-4 w-4 text-muted-foreground" />
                  Edit
                </Button>
              </div>
              <div>
                <p className="text-lg font-large leading-none">{displayName}</p>
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
  );
};
