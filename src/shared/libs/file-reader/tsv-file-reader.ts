import { readFileSync } from "node:fs";

import { FileReader } from "./file-reader.interface.js";
import {
  Offer,
  HouseTypeEnum,
  Amenity,
  OfferCityEnum,
  User,
  UserType,
} from "../../types/index.js";

export class TSVFileReader implements FileReader {
  private rawData = "";

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error("File was not read");
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split("\n")
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      userName,
      email,
      avatar,
      password,
      userType,
      commentsCount,
      latitude,
      longitude,
    ] = line.split("\t");

    return {
      title,
      description,
      postDate: new Date(createDate),
      city: city as OfferCityEnum,
      previewImage,
      photos: photos.split(","),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseNumber(rating),
      type: type as HouseTypeEnum,
      rooms: this.parseNumber(rooms),
      guests: this.parseNumber(guests),
      price: this.parseNumber(price),
      amenities: amenities.split(",") as Amenity[],
      user: this.parseUser(userName, email, avatar, password, userType),
      commentsCount: this.parseNumber(commentsCount),
      coordinates: this.parseCoordinates(latitude, longitude),
    };
  }

  parseUser(
    name: string,
    email: string,
    avatar: string,
    password: string,
    userType: string
  ): User {
    return {
      name,
      email,
      avatar,
      password,
      userType: userType as UserType,
    };
  }

  parseCoordinates(latitude: string, longitude: string) {
    return {
      latitude: this.parseNumber(latitude),
      longitude: this.parseNumber(longitude),
    };
  }

  parseNumber(value: string): number {
    return Number.parseInt(value, 10);
  }

  parseBoolean(value: string): boolean {
    return value === "true";
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: "utf-8" });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
