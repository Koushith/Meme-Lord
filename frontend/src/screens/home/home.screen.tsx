import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authSlice, { setCredientials } from "@/slices/authSlice";
import {
  useCreatePostMutation,
  useFetchAllPostQuery,
} from "@/slices/postApiSlice";
import { setPost } from "@/slices/postSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const HomeScreen = () => {
  const { isError, isLoading, data, refetch } = useFetchAllPostQuery("Post");
  const { mongoUserId } = useSelector((state) => state?.auth.userInfo);

  console.log("mongoUserId-----", mongoUserId);
  const [punchline, setPunchline] = useState("");
  const [postUrl, setPostUrl] = useState("");
  console.log(isLoading);
  const [createPost] = useCreatePostMutation();

  const submitHandler = async () => {
    //TODO: - submit only after reclaim verification
    //FIXME: - fix verification bug
    /**
       * {
    "user": "61502e44a06e94b3e89e2419", // Replace with a valid ObjectId
    "instagramPosts": [
      {
        "postUrl": "https://www.instagram.com/p/CUKhW3zred3/",
        "proof": "Proof details here",
        "isVerified": false,
        "originalPublishDate": "2023-08-19T00:00:00Z"
      }
    ]

  }
       */
    const res = await createPost({
      user: mongoUserId,
      instagramPosts: [
        {
          postUrl,
          proof: punchline, //TODO: fix this- allow only if proof is valid
          isVerified: false,
          //TODO: remove this hardcoded value.
          originalPublishDate: "2023-08-19T00:00:00Z",
        },
      ],
    }).unwrap();
    if (res) {
      refetch();
    }
    console.log("resss???", res);
  };

  return (
    <>
      <Input
        type="text"
        placeholder="enter the punchline"
        name="punchline"
        value={punchline}
        onChange={(e) => setPunchline(e.target.value)}
      />
      <Input
        type="text"
        placeholder="enter the post url"
        name="postUrl"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
      />
      <Button variant={"default"} size={"lg"} onClick={submitHandler}>
        Verify
      </Button>

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
      </div>
    </>
  );
};
