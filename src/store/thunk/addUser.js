import { createAsyncThunk } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import axios from "axios";
const addUser = createAsyncThunk("user/add", async () => {
  const response = await axios.post("http://localhost:4000/users", {
    user: faker.name.fullName(),
  });

  return response.data;
});

export { addUser };
