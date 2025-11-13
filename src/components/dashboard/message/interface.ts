export type TMessage = {
  id: string;
  created_at: string;
  updated_at: string;
  chat_id: string;
  parent_id: string | null;
  user_id: string;
  text: string;
  media_urls: string[];
  isDeleted: boolean;
  seen_by: string[];
  isOwner: boolean;
};

export type TPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TMeta = {
  pagination: TPagination;
};

export type TMessagesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: TMeta;
  data: TMessage[];
};
