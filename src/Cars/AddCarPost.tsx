import React, { VFC } from "react";

import Card from "../components/UIElement/Card";
import Input from "../components/Form/Input";
import Button from "../components/Form/Button";
import ImageUploadComponent from "../components/Form/ImageUpload";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../components/UIElement/LoadingSpiner";
import { useNavigate } from "react-router-dom";

const AddCarPost: VFC = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      ownerName: {
        value: "",
        isValid: false,
      },
      minPrice: {
        value: 0,
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      telNumber: {
        value: "",
        isValid: false,
      },
      pesel: {
        value: "",
        isValid: false,
      },
      vin: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const postSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("telephoneNumber", formState.inputs.telNumber.value);
      formData.append("vin", formState.inputs.vin.value);
      formData.append("date", formState.inputs.endDate.value);
      formData.append("pesel", formState.inputs.pesel.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("price", formState.inputs.minPrice.value);

      await sendRequest("/api/posts", "POST", formData, {});
      navigate("/");
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <Card style={{ width: "30%" }} className="add-car-post">
        <form onSubmit={postSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            placeholder="Title"
            errorText="Pleas enter a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
          />
          <Input
            id="telNumber"
            element="input"
            type="text"
            placeholder="Telephone Number"
            errorText="Pleas enter a Telephone Number."
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(9)]}
            onInput={InputHandler}
          />
          <Input
            id="minPrice"
            element="input"
            type="number"
            placeholder="min. Price"
            errorText="Pleas enter a min. price."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
          />
          <Input
            id="vin"
            element="input"
            type="text"
            placeholder="Vin"
            errorText="Pleas enter a vin."
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(17),
              VALIDATOR_MAXLENGTH(17),
            ]}
            onInput={InputHandler}
          />
          <Input
            id="pesel"
            element="input"
            type="text"
            placeholder="Pesel"
            errorText="Pleas enter a Pesel."
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(11),
              VALIDATOR_MAXLENGTH(11),
            ]}
            onInput={InputHandler}
          />
          <Input
            id="endDate"
            element="input"
            type="date"
            label="End Date"
            errorText="Pleas enter a end date."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            errorText="Pleas enter a valid description (at least 5 characters)."
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(5),
              VALIDATOR_MAXLENGTH(30),
            ]}
            onInput={InputHandler}
          />
          <ImageUploadComponent
            id="image"
            onInput={InputHandler}
            errorText="Pleas provide an image."
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD NEW POST
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddCarPost;
