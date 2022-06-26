import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/UIElement/LoadingSpiner";
import { useHttpClient } from "../hooks/http-hook";
import CarPost from "./CarPost";

const CarsPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        // @ts-ignore
        const response = await sendRequest(`/api/posts`, "GET");
        // @ts-ignore
        setPosts(response.post);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserPlaces();
  }, [sendRequest]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      {posts.map((post, index) => {
        return (
          // @ts-ignore
          <CarPost
            key={`${post._id}`}
            id={post._id}
            title={post.title}
            description={post.description}
            minPrice={post.price}
            vin={post.vin}
            image={"/" + post.image}
            telNumber={post.telephoneNumber}
            endDate={post.date}
            bids={post.bids}
            myPost={false}
          />
        );
      })}
    </div>
  );
};

export default CarsPage;
