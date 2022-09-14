
export interface MediaInterface {
  createMedia: { [key: string]: any }[];
  media: { [key: string]: any }[];
}

export interface MediaStateInterface {
  createMedia?: MediaInterface[];
  allMedia: MediaInterface[];
}

function state(): MediaStateInterface {
  return {
    allMedia: [],
    createMedia: [],
  };
}

export default state;
