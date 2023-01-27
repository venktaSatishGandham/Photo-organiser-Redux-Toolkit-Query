import { createAsyncThunk } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import axios from "axios";

const addUser = createAsyncThunk("user/add", async () => {
  const response = await axios.post("http://localhost:4000/users", {
    name: faker.name.fullName(),
  });

  await pasue(1000); //DEV only

  return response.data;
});

//DEV only

const pasue = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { addUser };
