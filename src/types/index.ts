interface DiscogPagination {
  items: number;
  page: number;
  pages: number;
  per_page: number;
}

export interface DiscogRelease {
  cover_image: string;
  title: string;
  id: number;
  year: number;
  thumb: string;
  uri: string;
  user_data: {
    in_collection: boolean;
    in_wantlist: boolean;
  }
  images: Array<{ resource_url: string }>;
  tracklist: Array<{ position: number, title: string }>;
  styles: Array<string>;
  artists: Array<{ name: string, id: number}>;
}

export interface DiscogQueryResponse {
  pagination: DiscogPagination;
  results: DiscogRelease[]
}

interface DiscogFavored {
  basic_information: DiscogRelease
}

export interface DiscogMyCollectionResponse {
  pagination: DiscogPagination;
  releases: DiscogFavored[]
}