import React from "react";

import Card from "../components/UIElement/Card";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";

import { useForm } from "../hooks/form-hook";
import { useNavigate } from "react-router";
import { useHttpClient } from "../hooks/http-hook";

import { calcBid } from "../util/bidCalculator";
import LoadingSpinner from "../components/UIElement/LoadingSpiner";

type CarPostType = {
  id: string;
  title: string;
  description: string;
  minPrice: number;
  vin: string;
  image: string;
  telNumber: string;
  endDate: string;
  myPost: boolean;
  bids: any[];
};

const CarPost: React.VFC<CarPostType> = ({
  id,
  title,
  description,
  minPrice,
  vin,
  image,
  telNumber,
  endDate,
  bids,
  myPost,
}) => {
  const [formState, InputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      pesel: {
        value: "",
        isValid: false,
      },
      bid: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const carBidSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendRequest(
        `/api/posts/${id}`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          peselBid: formState.inputs.pesel.value,
          bidValue: formState.inputs.bid.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate(0);
    } catch (e: any) {
      console.log(e);
    }
  };

  const carPostDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // @ts-ignore
      await sendRequest(`/api/posts/${id}`, "delete");
      navigate(0);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <Card
        style={{
          width: "60%",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <img src={`${image}`} alt={title} style={{ height: 300 }} />

          <div className="car-details">
            <h2 style={{ marginLeft: 20 }}>{title}</h2>
            <p>{"Price: " + calcBid(bids)}</p>
            <p>{"Telephone number: " + telNumber}</p>
            <p>{"Vin number: " + vin}</p>
            <p>{"Days left: " + endDate}</p>
            <p>{description}</p>
          </div>
          {!myPost && (
            <div className="bidForm">
              <p>{"Min price: " + minPrice}</p>
              <form onSubmit={carBidSubmitHandler}>
                <Input
                  id="name"
                  element="input"
                  type="text"
                  placeholder="Name"
                  errorText="Pleas enter a valid Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={InputHandler}
                />
                <Input
                  id="pesel"
                  element="input"
                  type="text"
                  placeholder="Pesel"
                  errorText="Pleas enter a valid pesel"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(11)]}
                  onInput={InputHandler}
                />
                <Input
                  id="bid"
                  element="input"
                  type="number"
                  placeholder=" Min. bid"
                  errorText="Pleas enter a bid."
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={InputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  Bid
                </Button>
              </form>
            </div>
          )}
          {myPost && (
            <button
              onClick={carPostDelete}
              className={"button"}
              style={{ height: "30%" }}
            >
              Delete
            </button>
          )}
        </div>
      </Card>
    </>
  );
};

export default CarPost;
