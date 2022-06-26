import React, { useState, useEffect } from "react";

import Card from "../components/UIElement/Card";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import CarPost from "../Cars/CarPost";
import { useLocalStorage } from "../hooks/localStorage-hook";

import { useForm } from "../hooks/form-hook";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";
import { useHttpClient } from "../hooks/http-hook";

const UserDetailsPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [pesel, setPesel] = useLocalStorage("pesel", "");
  const [formState, InputHandler, setFormData] = useForm(
    {
      userPesel: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    setFormData(
      {
        userPesel: {
          value: pesel,
          isValid: true,
        },
      },
      true
    );
    const fetchPosts = async () => {
      try {
        // @ts-ignore
        const response = await sendRequest(`/api/posts/user/${pesel}`, "GET");
        // @ts-ignore
        setPosts(response.posts);
        // @ts-ignore
        setPostsWinning(response.winingPosts);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, [pesel, setFormData]);

  const [posts, setPosts] = useState<any[]>([]);
  const [postsWinning, setPostsWinning] = useState<any[]>([]);

  const findUserAuctions = async (event: React.FormEvent) => {
    event.preventDefault();
    setPesel(formState.inputs.userPesel.value);
    const fetchUserPlaces = async () => {
      try {
        // @ts-ignore
        const response = await sendRequest(
          `http://localhost:5000/api/posts/user/${
            formState.inputs.userPesel.value || pesel
          }`,
          "GET"
        );
        // @ts-ignore
        setPosts(response.posts);
        // @ts-ignore
        setPostsWinning(response.winingPosts);
        console.log(posts);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserPlaces();
  };

  return (
    <Card>
      <form onSubmit={findUserAuctions}>
        <Input
          id="userPesel"
          element="input"
          type="text"
          label="User Pesel"
          errorText="Pleas enter a User pesel."
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(11)]}
          onInput={InputHandler}
          value={formState.inputs.userPesel.value}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Search
        </Button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>My posts</h2>
        {posts.map((post) => {
          return (
            <CarPost
              key={`${post._id}`}
              id={post._id}
              title={post.title}
              description={post.description}
              minPrice={post.price}
              vin={post.vin}
              image={"http://localhost:5000/" + post.image}
              telNumber={post.telephoneNumber}
              endDate={post.date}
              bids={post.bids}
              myPost
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>My winning posts</h2>
        {postsWinning.map((post) => {
          return (
            <CarPost
              key={`${post._id}`}
              id={post._id}
              title={post.title}
              description={post.description}
              minPrice={post.price}
              vin={post.vin}
              image={"http://localhost:5000/" + post.image}
              telNumber={post.telephoneNumber}
              endDate={post.date}
              bids={post.bids}
              myPost={false}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default UserDetailsPage;
