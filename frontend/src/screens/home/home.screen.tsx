import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authSlice, { setCredientials } from "@/slices/authSlice";
import {
  useCreatePostMutation,
  useFetchAllPostQuery,
} from "@/slices/postApiSlice";
import { setPost } from "@/slices/postSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeContainer } from "./home.styles";
import cheerio from "cheerio";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { PostCard } from "@/components/post-card/post-card.component";

export const HomeScreen = () => {
  const { isError, isLoading, data, refetch } = useFetchAllPostQuery("Post");
  const { mongoUserId } = useSelector((state) => state?.auth.userInfo);

  console.log("mongoUserId-----", mongoUserId);

  const [postUrl, setPostUrl] = useState("");

  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const submitHandler = async () => {
    //TODO: - submit only after reclaim verification
    //FIXME: - fix verification bug

    try {
      const res = await createPost({
        user: mongoUserId,
        instagramPosts: [
          {
            postUrl,
            proof: "punchline", //TODO: fix this- allow only if proof is valid
            isVerified: false,
            //TODO: remove this hardcoded value.
            originalPublishDate: "2023-08-19T00:00:00Z",
          },
        ],
      }).unwrap();
      if (res) {
        refetch();

        navigate("/verify", {
          state: {
            callbackId: res?.callbackId,
            reclaimUrl: res?.reclaimUrl,
          },
          replace: true,
        });
      }
    } catch (error) {
      console.log("somwthing went wronhg- error", error);
    } finally {
      //
    }
  };

  return (
    <HomeContainer className="flex gap-20 items-start justify-start w-1/2">
      <div className="left " style={{ minWidth: "800px" }}>
        <h1>What's Poppin??</h1>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="enter the post url"
            name="postUrl"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
          />
          <Button
            variant={"default"}
            size={"lg"}
            onClick={submitHandler}
            className="mt-4"
          >
            Verify
          </Button>

          <div className="mt-8">
            <h1>Trending 🔥</h1>
            <div className="grid grid-cols-2 gap-4 mt-4 ">
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </div>
        </div>

        {/* 
        <div>
          All Posts
          {isLoading ? (
            <>loading</>
          ) : (
            <>
              <div>
                {data?.posts?.map((post) => (
                  <>
                    <p>{post.displayName}</p>
                    <p>
                      {post.instagramPosts.map((p) => (
                        <>
                          <p>{p.postUrl}</p>
                          <p>{JSON.stringify(p.isVerified)}??</p>
                        </>
                      ))}
                    </p>
                  </>
                ))}
              </div>
            </>
          )}
        </div> */}
      </div>

      <div className="right w-full">
        <Card className="bg-background" style={{ minWidth: "300px" }}>
          <CardHeader>
            <CardTitle>Leader Board 🚀</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  className="bg-muted flex items-center rounded-full"
                  style={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <AvatarImage
                    // src={user?.avatar}
                    className="aspect-square h-full w-full"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">koushith</p>
                  <p className="text-sm text-muted-foreground">5 Posts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeContainer>
  );
};
