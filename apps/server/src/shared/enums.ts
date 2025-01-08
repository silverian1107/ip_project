export enum DIServiceEnum {
  CACHEABLE_SERVICE = 'CACHEABLE_SERVICE',
  WALLET_CLIENT = 'WALLET_CLIENT',
  PUBLIC_CLIENT = 'PUBLIC_CLIENT',
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export enum SwaggerOperationEnum {
  PUBLIC = `Public router`,
  SUPER_ADMIN = `Super admin's router`,
  ADMIN = `Admin's router`,
  USER = `User's router`,
}

export enum AdminStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AuthEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RarityEnum {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'legendary',
}

export enum TransactionActionType {
  BUY = 'buy',
  LISTING = 'listing',
  BID = 'bid',
  ENCRYPTED = 'encrypted',
  DECRYPTED = 'decrypted',
  MINT = 'mint',
}

export enum NftStatus {
  FOR_SALE = 'FOR_SALE',
  NOT_FOR_SALE = 'NOT_FOR_SALE',
  FOR_AUCTION = 'FOR_AUCTION',
}

export enum NotificationEnum {
  BID = 'bid',
  SELL = 'sell',
  WISH_LIST = 'wish_list',
}

export enum NFTStandardTypeEnum {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export enum TxStatusEnum {
  CONFIRMING = 'confirming',
  CONFIRMED = 'confirmed',
}

export enum LatestBlockKeyEnum {
  CollectionFactory = 'collection_factory',
  DOPSmartWallet = 'dop_smart_wallet',
}

export enum QueueEnum {
  Collection = 'collection',
  Mailer = 'mailer',
}

export enum JobName {
  CrawlCollection = 'crawl_collection',
  SendActiveAccount = 'send_active_account',
}

export enum BidStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ListingStatusEnum {
  ACTIVE = 'active',
  ON_SALE = 'on_sale',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
  PROCESSING = 'processing',
  ERROR = 'error',
}

export enum UserHistoryTypeEnum {
  BID = 'bid',
  BUY = 'buy',
  LISTING = 'listing',
  ENCRYPTED = 'encrypted',
  RATING = 'rating',
}

export enum TimeLineVolumeEnum {
  HOUR = 'one_hour',
  SIX_HOURS = 'six_hours',
  TWENTY_FOUR_HOURS = 'twenty_four_hours',
  SEVEN_DAYS = 'seven_days',
  ALL = 'all',
}

export enum VolumeQueryEnum {
  TRENDING = 'trending',
  TOP = 'top',
}

export enum CrawlStatusEnum {
  NEW = 'new',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
}

export enum SellTypeEnum {
  FIXED_PRICE = 'fixed_price',
  AUCTION = 'auction',
}

export enum SettingKeyEnum {
  LISTING_FEE = 'listing_fee',
  AUCTION_FEE = 'auction_fee',
}
