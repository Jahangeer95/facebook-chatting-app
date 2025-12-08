import { Api } from "../config";

//create campaign
export const createCampaign = async (name, objective, ad_category, status, buyingType) => {
  try {
    const body = {
      name: name,
      objective: objective,
      ad_category: ad_category,
      status: status,
      buying_type:buyingType,
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
    // return { data: [], paging: null };
    throw new Error(error?.response?.data?.message);
  }
};

//create adset
export const createAdset = async (
body
) => {
  try {
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

//delete updateCampaign
export const updateCampaign = async (campaign_id,name, objective, ad_category, status) => {
  try {
    const body = {
      name: name,
      objective: objective,
      special_ad_categories: ad_category,
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

//delete campaign
export const deleteCampaign = async (campaign_id) => {
  try {
    const res = await Api.delete(`fb-ad/campaigns/${campaign_id}`);
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


//delete adset
export const deleteAdset = async (adset_id) => {
  try {
    const res = await Api.delete(`fb-ad/adsets/${adset_id}`);
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

// fetch adsets
export const getAdsets = async (id) => {
  try {
    const res = await Api.get(`fb-ad/adsets/${id}`);
    if (res.status === 200) {
      console.log({ res });
      const {data,paging}=res.data;
      console.log("Adset data:", data);
      console.log("Paging:", paging);
      return {data,paging};
    }
  } catch (error) {
    console.error("Error :", error);
    // return { data: [], paging: null };
    throw new Error(error?.response?.data?.message);
  }
};


//upload image for adcreative
export const uploadAdImage=async(imageFile)=>{
  try {
    if (!imageFile) throw new Error("No image file selected");
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await Api.post(`fb-ad/ad-images`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log({ res });
    return res.data.data;
  } catch (error) {
    console.error("Error in uploading image :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
}
//create adcreative
export const createAdCreatives = async (name, page_id, message, link, headline, call_to_action_type,image_hash ) => {
  try {
    const body = {
      name, page_id, message, link, headline, call_to_action_type,image_hash
    };
    const res = await Api.post(`fb-ad/adcreatives`, body);
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

//to fetch adcreatives
export const getAdCreatives = async () => {
  try {
    const res = await Api.get(`fb-ad/adcreatives`);
    if (res.status === 200) {
      console.log({ res });
      const {data,paging}=res.data;
      console.log("Campaign data:", data);
      console.log("Paging:", paging);
      return {data,paging};
    }
  } catch (error) {
    console.error("Error :", error);
    // return { data: [], paging: null };
    throw new Error(error?.response?.data?.message);
  }
};

//update adset
export const updateAdset = async (adsetId,
body
) => {
  try {
    const res = await Api.post(`fb-ad/adsets/${adsetId}`, body);
    console.log({ res });
    console.log("Adset updated sucessfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in updating adset:", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};

//delete adset
export const deleteAdcreative = async (adcreativeId) => {
  try {
    const res = await Api.delete(`fb-ad/adcreatives/${adcreativeId}`);
    console.log({ res });
    console.log("Result of delete adcreative:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in deleting adcreative :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
}; 

//fetch all adsets
export const fetchAdset = async () => {
  try {
    const res = await Api.get(`fb-ad/adsets`);
    console.log({ res });
    if (res.status === 200) {
      console.log({ res });
      const {data,paging}=res.data;
      console.log("Adset data:", data);
      console.log("Paging:", paging);
      return {data,paging};
    }
  } catch (error) {
    console.error("Error :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};

//get preview
export const getAdCreativesPreview = async (adcreativeId,adFormat) => {
  try {
    const res = await Api.get(`fb-ad/adcreatives/${adcreativeId}/preview`, {
      params: { ad_format: adFormat },
    });
    console.log({ res });
    if (res.status === 200) {
      console.log("Adcreative preview:", res.data?.data);
      return res.data?.data?.[0]?.body;
    }
  } catch (error) {
    console.error("Error :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};

//create ad
export const createAd = async (name, adset_id, creative_id, status ) => {
  try {
    const body = {
      name, adset_id, creative_id, status
    };
    const res = await Api.post(`fb-ad/ads`, body);
    console.log({ res });
    console.log("Result of ads:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in creating an ads :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};

//to create prevview
export const createPreview = async (name, page_id, message, link, headline, call_to_action_type,image_hash) => {
  try {
    const body = {
      name, page_id, message, link, headline, call_to_action_type,image_hash
    };
    const res = await Api.post(`fb-ad/adcreatives/preview`, body);
    console.log({ res });
    console.log("Result of preview:", res.data);
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

//fetch insights
export const getInsight = async (level, preset) => {
  try {
    const res = await Api.get(`/fb-ad/insight`, {
      params: {level:level, data_preset: preset },
    });

    console.log("Fetched Insights:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    throw new Error(error?.response?.data?.message);
  }
};

//fetch all ads
export const fetchAds = async () => {
  try {
    const res = await Api.get(`fb-ad/ads`);
    console.log({ res });
    if (res.status === 200) {
      console.log({ res });
      const {data,paging}=res.data;
      console.log("Ads data:", data);
      console.log("Paging:", paging);
      return {data,paging};
    }
  } catch (error) {
    console.error("Error :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};

//delete ads
export const deleteAd = async (adId) => {
  try {
    const res = await Api.delete(`fb-ad/ads/${adId}`);
    console.log({ res });
    console.log("Result of delete ad:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error in deleting ad :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
}; 

//get preview
export const getAdPreview = async (adId,adFormat) => {
  try {
    const res = await Api.get(`fb-ad/ads/${adId}/preview`, {
      params: { ad_format: adFormat },
    });
    console.log({ res });
    if (res.status === 200) {
      console.log("Adcreative preview:", res.data?.data);
      return res.data?.data?.[0]?.body;
    }
  } catch (error) {
    console.error("Error :", error);
    throw new Error(
      error.response?.error?.message ||
        error.response?.data?.message ||
        error.message
    );
  }
};