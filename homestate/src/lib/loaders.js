import { apiRequest } from "./apiRequest";

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return {
    postResponse: await postPromise,
  };
};
