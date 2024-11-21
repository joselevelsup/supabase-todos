import axios from "axios";
import client from "./client";

const getAxiosClient = async () => {
  const currentSession = await client.auth.getSession();

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${currentSession.data.session.access_token}`,
    },
  });

  return instance;
};

export default getAxiosClient;
