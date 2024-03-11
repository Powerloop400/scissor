// src/models/urlModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface UrlDocument extends Document {
  longUrl: string;
  shortUrl: string;
  customAlias?: string;
  createdAt: Date;
  user: mongoose.Types.ObjectId; // Add user reference
  clicks: number; // Add clicks property
}

const UrlSchema: Schema = new Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  customAlias: { type: String, sparse: true, unique:true}, 
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Define clicks property
});

export default mongoose.model<UrlDocument>('Url', UrlSchema);
