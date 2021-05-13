/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/streams": {
    get: {
      parameters: {
        query: {
          after?: string;
          before?: string;
          first?: number;
          game_id?: string[];
          language?: string[];
          user_id?: string[];
          user_login?: string[];
        };
      };
      responses: {
        /** successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["StreamPagination"];
          };
        };
      };
    };
  };
  "/users": {
    get: {
      parameters: {
        query: {
          id?: string[];
          login?: string[];
        };
      };
      responses: {
        /** successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["UserList"];
          };
        };
      };
    };
  };
  "/eventsub/subscriptions": {
    get: {
      responses: {
        /** successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["SubscriptionListWithCost"];
          };
        };
      };
    };
    post: {
      responses: {
        /** successful operation */
        200: {
          content: {
            "application/json": components["schemas"]["SubscriptionListWithCost"];
          };
        };
      };
      /** Subscription */
      requestBody: {
        content: {
          "application/json": components["schemas"]["SubscriptionToPost"];
        };
      };
    };
    delete: {
      parameters: {
        query: {
          id?: string;
        };
      };
      responses: {
        /** successful operation */
        200: {
          content: {
            "application/json": { [key: string]: any };
          };
        };
      };
    };
  };
  "/example/callback-handshake": {
    post: {
      responses: {
        /** Challenge Response */
        200: {
          headers: {};
          content: {
            "text/plain": components["schemas"]["VerificationResponseBody"];
          };
        };
      };
      /** Challenge */
      requestBody: {
        content: {
          "application/json": components["schemas"]["VerificationRequestBody"];
        };
      };
    };
  };
  "/example/callback-notification": {
    post: {
      responses: {
        /** successful operation */
        200: {
          headers: {};
          content: {
            "application/json": { [key: string]: any };
          };
        };
      };
      /** Notification */
      requestBody: {
        content: {
          "application/json": components["schemas"]["Notification"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    CallbackRequestBody: (Partial<
      components["schemas"]["VerificationRequestBody"]
    > &
      Partial<components["schemas"]["Notification"]>) & { [key: string]: any };
    Challenge: string;
    Condition: {
      broadcaster_user_id?: string;
    } & { [key: string]: any };
    Event: (Partial<components["schemas"]["EventChannelFollow"]> &
      Partial<components["schemas"]["EventStreamOffline"]> &
      Partial<components["schemas"]["EventStreamOnline"]>) & {
      [key: string]: any;
    };
    EventChannelFollow: {
      user_id: string;
      user_login: string;
      user_name: string;
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
      followed_at: string;
    } & { [key: string]: any };
    EventStreamOffline: {
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
    } & { [key: string]: any };
    EventStreamOnline: {
      /** the id of the stream */
      id: string;
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
      type: "live" | "playlist" | "watch_party" | "premiere" | "rerun";
      started_at: string;
    } & { [key: string]: any };
    ListWithCost: {
      total: number;
      total_cost: number;
      max_total_cost: number;
      limit: number;
    } & { [key: string]: any };
    Notification: {
      subscription: components["schemas"]["SubscriptionToGet"];
      event: components["schemas"]["Event"];
    } & { [key: string]: any };
    Pagination: {
      pagination: {
        cursor: string;
      } & { [key: string]: any };
    } & { [key: string]: any };
    Stream: {
      id: string;
      user_id: string;
      user_login: string;
      user_name: string;
      game_id: string;
      game_name: string;
      /** empty in case of error */
      type: "live" | "";
      title: string;
      viewer_count: number;
      started_at: string;
      language: string;
      thumbnail_url: string;
      tag_ids: string[];
      is_mature: boolean;
    } & { [key: string]: any };
    StreamPagination: components["schemas"]["Pagination"] &
      ({
        data: components["schemas"]["Stream"][];
      } & { [key: string]: any }) & { [key: string]: any };
    SubscriptionCommon: {
      type: components["schemas"]["SubscriptionType"];
      version: string;
      condition: components["schemas"]["Condition"];
    } & { [key: string]: any };
    SubscriptionListWithCost: components["schemas"]["ListWithCost"] &
      ({
        data: components["schemas"]["SubscriptionToGet"][];
      } & { [key: string]: any }) & { [key: string]: any };
    SubscriptionToPost: components["schemas"]["SubscriptionCommon"] &
      ({
        transport: components["schemas"]["TransportToPost"];
      } & { [key: string]: any }) & { [key: string]: any };
    SubscriptionToGet: components["schemas"]["SubscriptionCommon"] &
      ({
        id: string;
        status:
          | "enabled"
          | "webhook_callback_verification_pending"
          | "webhook_callback_verification_failed"
          | "notification_failures_exceeded"
          | "authorization_revoked"
          | "user_removed";
        cost: number;
        transport: components["schemas"]["TransportToGet"];
        created_at: string;
      } & { [key: string]: any }) & { [key: string]: any };
    SubscriptionType: "channel.follow" | "stream.online" | "stream.offline";
    TransportCommon: {
      method: "webhook";
      /** valid https URI */
      callback: string;
    } & { [key: string]: any };
    TransportToGet: components["schemas"]["TransportCommon"];
    TransportToPost: components["schemas"]["TransportCommon"] &
      ({
        /** shared secret for HMAC-SHA256 */
        secret: string;
      } & { [key: string]: any }) & { [key: string]: any };
    User: {
      id: string;
      login: string;
      display_name: string;
      type: "staff" | "admin" | "global_mod" | "";
      broadcaster_type: "partner" | "affiliate" | "";
      description: string;
      profile_image_url: string;
      offline_image_url: string;
      view_count: number;
      email: string;
      created_at: string;
    } & { [key: string]: any };
    UserList: {
      data: components["schemas"]["User"][];
    } & { [key: string]: any };
    VerificationRequestBody: {
      challenge: components["schemas"]["Challenge"];
      subscription: components["schemas"]["SubscriptionToGet"];
    } & { [key: string]: any };
    VerificationResponseBody: components["schemas"]["Challenge"];
  };
  headers: {
    "Twitch-Eventsub-Message-Id"?: string;
    "Twitch-Eventsub-Message-Timestamp"?: string;
    /** HMAC-SHA256 signature of Id + Timestamp + Body */
    "Twitch-Eventsub-Message-Signature"?: string;
  };
}

export interface operations {}
