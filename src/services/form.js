import API from "./base";
const apiToken = import.meta.env.VITE_API_TOKEN || "b66f8b38-1476-47a5-9866-26fcbc7abc24";
export const sendFormData = async (formData) => {
  try {
    return await API.post(`/${apiToken}`, formData);
  } catch (error) {
    console.error({ error });
    throw error;
  }
};
