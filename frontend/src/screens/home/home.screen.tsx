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
    <HomeContainer>
      <div className="left">
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
            className="mt-2"
          >
            Verify
          </Button>
        </div>
        {/* <div className="w-100 h-full">
          <iframe
            className="h-100"
            src="https://www.instagram.com/p/CwZzmPHoS9J/embed/"
          ></iframe>
        </div> */}
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
      <div className="right">
        <h1>Leader Board</h1>
      </div>
    </HomeContainer>
  );
};
