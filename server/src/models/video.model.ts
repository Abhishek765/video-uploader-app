import mongoose from 'mongoose';
import { DATA_MODEL_KEYS } from '../constants';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, // Cloudinary video url
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: DATA_MODEL_KEYS.User
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // can be obtained from cloudinary
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate); // For writing aggregation queries

export const VideoModel = mongoose.model(DATA_MODEL_KEYS.Video, videoSchema);
