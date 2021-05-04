<template>
  <iframe
    v-for="channel in channels"
    :key="channel"
    :src="`https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=true`"
    :height="360"
    :width="640"
    :allowfullscreen="true"
    :frameborder="false"
  >
  </iframe>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, onMounted } from "vue";
import queryString from "query-string";
import Pusher from "pusher-js";
import axios from "axios";

type QueryParameters = {
  pusherKey: string;
  channels: string[];
};

function parseQueryString(): QueryParameters {
  const parsed = queryString.parse(location.search, {
    arrayFormat: "comma",
  });

  const pusherKey = parsed["pusher_key"];
  if (!pusherKey || typeof pusherKey !== "string") {
    throw new Error("query parameter pusher_key is not specified.");
  }

  const channels = ([] as string[])
    .concat(parsed["channels"] ?? [])
    .map((ch) => ch.toLowerCase());

  return {
    pusherKey,
    channels,
  };
}

// FIXME: 内部表現を暴露しててよくない
type ChannelVisibility = Record<string, boolean>;

function getChannelNamesFromQueryParameter(): string[] {
  const parsed = queryString.parse(location.search, {
    arrayFormat: "comma",
  });

  return ((parsed["channels"] ?? []) as string[]).map((ch) => ch.toLowerCase());
}

function usePusher(channelVisibility: ChannelVisibility): Pusher {
  type Notification = {
    type: "stream.online" | "stream.offline";
    channel: string;
  };
  type Data = {
    notification: Notification;
  };

  Pusher.logToConsole = true;

  const pusher = new Pusher(parseQueryString().pusherKey, {
    cluster: "ap3",
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", ({ notification }: Data) => {
    const channel = notification.channel.toLowerCase();

    if (notification.type === "stream.online") {
      channelVisibility[channel] = true;
    }
    if (notification.type === "stream.offline") {
      channelVisibility[channel] = false;
    }
    throw notification;
  });

  return pusher;
}

async function registerSubscriptions(): Promise<void> {
  const channelNames = parseQueryString().channels;

  await axios.post("http://localhost:3000/api/subscriptions", {
    channels: channelNames,
  });
}

type Channel = {
  name: string;
  isLive: boolean;
};
async function fetchChannels(): Promise<Channel[]> {
  const channelNames = parseQueryString().channels;

  type ResponseBody = {
    data: {
      name: string;
      isLive: boolean;
    }[];
  };

  const response = await axios.get<ResponseBody>(
    "http://localhost:3000/api/channels/search",
    {
      params: {
        names: channelNames,
      },
    }
  );

  return response.data.data.map((ch) => ({
    name: ch.name,
    isLive: ch.isLive,
  }));
}

export default defineComponent({
  name: "the-players",
  setup() {
    const channelVisibility: Record<string, boolean> = reactive({});

    const channels = computed((): string[] => {
      return parseQueryString().channels.filter(
        (name) => channelVisibility[name]
      );
    });

    usePusher(channelVisibility);

    onMounted(async () => {
      for (const channel of await fetchChannels()) {
        channelVisibility[channel.name] = channel.isLive;
      }

      await registerSubscriptions();
    });

    return {
      channelVisibility,
      channels,
    };
  },
});
</script>
