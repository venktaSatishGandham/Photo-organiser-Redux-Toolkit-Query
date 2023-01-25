import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users.fetch", async () => {
  const response = await axios.get("http://localhost:4000/users");
  await pasue(1000); // DEV ONLY
  return response.data;
});

//Dev ONLY
const pasue = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
