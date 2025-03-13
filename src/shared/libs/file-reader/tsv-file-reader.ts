import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, HouseTypeEnum, Amenity, OfferCityEnum, User, UserType } from '../../types/index.js';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
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
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createDate),
      city: city as OfferCityEnum,
      previewImage,
      photos: photos.split(','),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseNumber(rating),
      type: type as HouseTypeEnum,
      rooms: this.parseNumber(rooms),
      guests: this.parseNumber(guests),
      price: this.parseNumber(price),
      amenities: amenities.split(',') as Amenity[],
      user: this.parseUser(userName, email, avatar, password, userType),
      commentsCount: this.parseNumber(commentsCount),
      coordinates: this.parseCoordinates(latitude, longitude),
    };
  }

  parseUser(name: string, email: string, avatar: string, password: string, userType: string): User {
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
    return value === 'true';
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
