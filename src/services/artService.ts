import axios, {AxiosResponse} from 'axios';

/**
ids - A comma-separated list of resource ids to retrieve
limit - The number of resources to return per page
page - The page of resources to retrieve
fields - A comma-separated list of fields to return per resource
include - A comma-separated list of subresource to embed in the returned resources. Available options are:

 */

type baseOptions = 'ids' | 'limit' | 'page' | 'fields';
type artworksIncludes =
  | 'artist_pivots'
  | 'catalogue_pivots'
  | 'dates'
  | 'place_pivots'
  | 'sites';
type exhibitionsIncludes = 'artworks' | 'sites';

type allOptions = baseOptions;
type allIncludes = artworksIncludes & exhibitionsIncludes;

type endpointParams = {[key in allOptions]?: string} & {
  include?: allIncludes[];
};

export class ArtService {
  protected static BASE_URL = 'https://api.artic.edu/api/v1';
  protected static ENDPOINTS = {
    'collections/artworks': `${ArtService.BASE_URL}/artworks`,
    'collections/exhibitions': `${ArtService.BASE_URL}/exhibitions`,
  };

  private getEndpoint(
    address: keyof typeof ArtService.ENDPOINTS,
    params?: endpointParams,
  ): string | null {
    const url = ArtService.ENDPOINTS[address];
    if (!url) {
      console.error(
        `Provided address {${address}} doesn't exists. Aborting...`,
      );
      return null;
    }

    return this.parseParams(url, params);
  }

  private parseParams = (endpoint: string, params?: endpointParams) => {
    if (!params) {
      console.log('Returning endpoint :: ', endpoint);
      return endpoint;
    }

    const keys = Object.keys(params);
    const result = keys.reduce<string>(
      (prev, curr, idx) =>
        `${prev}${idx === 0 ? '?' : '&'}${curr}=${params[curr as allOptions]}`,
      endpoint,
    );

    console.log('Returning endpoint :: ', result);

    return result;
  };

  constructor({}) {}

  public fetch = async (
    address: keyof typeof ArtService.ENDPOINTS,
    params?: endpointParams,
  ): Promise<AxiosResponse<any> | unknown | null> => {
    const endpoint = this.getEndpoint(address, params);
    if (!endpoint) {
      return null;
    }

    try {
      const data = await axios.get(endpoint);
      return data?.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

export const artService = new ArtService({});
