import { Amenity } from './amenity.type.js';
import { Coordinates } from './coordinates.type.js';
import { HouseTypeEnum } from './house-type.enum.js';
import { OfferCityEnum } from './offer-city.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: OfferCityEnum;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HouseTypeEnum;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  user: User;
  commentsCount: number;
  coordinates: Coordinates;
};
