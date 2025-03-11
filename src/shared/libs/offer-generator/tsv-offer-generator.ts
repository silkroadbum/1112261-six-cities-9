import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomPhotos } from '../../helpers/index.js';
import { Coordinates, HouseTypeEnum } from '../../types/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COUNT_OF_COMMENTS = 0;
const MAX_COUNT_OF_COMMENTS = 100;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomPhotos<string>(this.mockData.photos);
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const houseType = getRandomItem(Object.values(HouseTypeEnum.Apartment));
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenties = getRandomItems<string>(this.mockData.amenities);
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = generateRandomValue(100000, 999999).toString();
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const commentsCount = generateRandomValue(MIN_COUNT_OF_COMMENTS, MAX_COUNT_OF_COMMENTS);
    const latitude = getRandomItem<Coordinates>(this.mockData.coordinates).latitude;
    const longitude = getRandomItem<Coordinates>(this.mockData.coordinates).longitude;

    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();

    return [
      title,
      description,
      createdDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      houseType,
      rooms,
      guests,
      price,
      amenties,
      userName,
      email,
      avatar,
      password,
      userType,
      commentsCount,
      latitude,
      longitude,
    ].join('\t');
  }
}
