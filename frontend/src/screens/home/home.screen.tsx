import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchAllPostQuery } from "@/slices/postApiSlice";
import { setPost } from "@/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";

export const HomeScreen = () => {
  const { isError, isLoading, data } = useFetchAllPostQuery("Post");
  // const post = useSelector((state) => state.post);
  console.log(isLoading);
  return (
    <>
      <Input type="text" />
      <Input type="text" />
      <Button>Verify</Button>

      <div>
        All Posts
        {isLoading ? (
          <>loading</>
        ) : (
          <>
            <div>
              {data.posts.map((post) => (
                <>
                  <p>{post.user}</p>
                  <p>
                    {post.instagramPosts.map((p) => (
                      <>
                        <p>{p.postUrl}</p>
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
