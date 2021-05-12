// TODO: swaggerとかから生成したい
export type ResponseSubscription = {
  id: string;
  status: string;
  type: string;
  version: string;
  cost: number;
  condition: {
    broadcaster_user_id: string;
  };
  transport: {
    method: "webhook";
    callback: string;
  };
  created_at: string;
};

export type ResponseSubscriptions = {
  data: ResponseSubscription[];
  total: number;
  total_cost: number;
  max_total_cost: number;
  limit: number;
  pagination: {};
};
