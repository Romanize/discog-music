import { AxiosPromise } from "axios";
import CONFIG from "../config";
import { DiscogMyCollectionResponse, DiscogQueryResponse, DiscogRelease } from "../types";
import axiosService from "./axiosService";

export const getQueryResults = (
  params: {
    page?: number;
    per_page?: number;
    q: string;
  }
): AxiosPromise<DiscogQueryResponse> =>
  axiosService.get("database/search", { params: { per_page: 24, type: 'release', ...params } });

export const getReleaseInfo = (
  releaseId: number
): AxiosPromise<DiscogRelease> => axiosService.get("releases/" + releaseId)

export const createFolder = (): AxiosPromise => axiosService.post('https://api.discogs.com/users/romanize/collection/folders', { name: 'my favorites'})
export const getFolder = (): AxiosPromise => axiosService.get(CONFIG.DISCOGS_FOLDER_URL + '0')
export const getFolderReleases = (page: number): AxiosPromise<DiscogMyCollectionResponse> => axiosService.get(CONFIG.DISCOGS_FOLDER_URL + '0/releases', { params: { per_page: 24, page }})
export const addToFolder = (releaseId: number): AxiosPromise => axiosService.post(CONFIG.DISCOGS_FOLDER_URL + `4213822/releases/${releaseId}`)