import { Api } from "../config";

//create campaign
export const createCampaign = async (name, objective, ad_category, status) => {
  try {
    const body = {
      name: name,
      objective: objective,
      ad_category: ad_category,
      status: status,
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

//to fetch campaigns
export const getCampaigns = async () => {
  try {
    const res = await Api.get(`fb-ad/campaigns`);
    if (res.status === 200) {
      console.log({ res });
      const {data,paging}=res.data;
      console.log("Campaign data:", data);
      console.log("Paging:", paging);
      return {data,paging};
    }
  } catch (error) {
    console.error("Error :", error);
    return { data: [], paging: null };
  }
};

//create adset
export const createAdset = async (
  name,
  campaignId,
  dailyBudget,
  status,
  bidStrategy,
  optimizationGoal,
  billingEvent
) => {
  try {
    const body = {
      name: name,
      campaign_id: campaignId,
      daily_budget: dailyBudget,
      status: status,
      bid_strategy: bidStrategy,
      optimization_goal:optimizationGoal,
      billing_event:billingEvent,
    };
    const res = await Api.post(`fb-ad/adsets`, body);
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


export const updateCampaign = async (campaign_id,name, objective, ad_category, status) => {
  try {
    const body = {
      name: name,
      objective: objective,
      ad_category: ad_category,
      status: status,
    };
    const res = await Api.post(`fb-ad/campaigns/${campaign_id}`, body);
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