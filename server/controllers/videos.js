import Video from "../models/Video.js";

export const createVideo = async (req, res, next) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    res.status(400);
    return next(new Error("Video_url field is required"));
  }

  try {
    const video = await Video.create({
      videoUrl,
    });

    res.status(201).json({
      success: true,
      video,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};
