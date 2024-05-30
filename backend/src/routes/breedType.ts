import express from "express";
import breedType from "../models/breedType";
import Breed from "../models/breed";


const router = express.Router();


router.get("/api/breedTypes", async (req, res) => {
    try {
      // Lấy tất cả các breedType từ cơ sở dữ liệu
      const breedTypes = await breedType.find().lean();
  
      // Duyệt qua từng breedType để lấy danh sách các breed tương ứng
      const breedTypeList = await Promise.all(
        breedTypes.map(async (breedType) => {
          // Lấy danh sách các breed của breedType hiện tại
          const breeds = await Breed
            .find({ _id: { $in: breedType.array } })
            .select("name img")
            .lean();
          return { ...breedType, breeds };
        })
      );
  
      res.json(breedTypeList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });