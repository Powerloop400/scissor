// src/services/urlService.ts

import Url, { UrlDocument } from '../models/urlModel';

// Create a new URL record
export const createUrl = async (longUrl: string, shortUrl: string, userId: string, customAlias?: string): Promise<UrlDocument> => {
 try {
    const url = new Url({
      longUrl,
      shortUrl,
      user: userId, 
      customAlias: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      clicks: 0,
    });
    return await url.save();
  } catch (error) {
    throw new Error(`Error creating URL: ${error.message}`);
  }
};


// Get URL by short URL
export const getUrlByShortUrl = async (shortUrl: string): Promise<UrlDocument | null> => {
  try {
    return await Url.findOne({ shortUrl });
  } catch (error) {
    throw new Error(`Error getting URL by short URL: ${error.message}`);
  }
};

// Increment click count for a URL
export const incrementClickCount = async (shortUrl: string): Promise<void> => {
  try {
    const url = await Url.findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } });
    if (!url) {
      throw new Error('URL not found');
    }
  } catch (error) {
    throw new Error(`Error incrementing click count: ${error.message}`);
  }
};

export const getAllUrls = async (userId: string): Promise<UrlDocument[]> => {
  try {
    return await Url.find({ user: userId });
  } catch (error) {
    throw new Error(`Error getting all URLs: ${error.message}`);
  }
};
