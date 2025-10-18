import { Api } from "../config";

//create campaign
export const createCampaign = async (name, objective, ad_category,status) => {
  try {
    const body = {
      name: name,
      objective: objective,
      ad_category: ad_category,
      status:status
    };
    const res = await Api.post(`fb-ad/campaigns`, body);
    console.log({ res });
    console.log("Result:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};
