import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET || "a23nzkrn"
    );
    const name = process.env.CLOUDINARY_CLOUD_NAME || "divjxkjoj";
    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${name}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
