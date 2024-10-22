export type UrlType = {
  id: number;
  encodedUrl: string;
  encodedLink: string;
  fullUrl: string;
  created_at: string;
  edit?: boolean;
};

export type URLContextType = {
  urls: UrlType[];
  setUrls: React.Dispatch<React.SetStateAction<UrlType[]>>;
};

export type ErrorType = {
  response: {
    data: {
      message: string;
    };
  };
};
