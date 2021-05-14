<template>
  <div style="white-space: nowrap">
    <template v-for="(streamer, i) in streamers" :key="streamer.id">
      <iframe
        :src="`https://player.twitch.tv/?channel=${streamer.name}&parent=localhost&autoplay=true`"
        :height="layout.unitHeight"
        :width="layout.unitWidth"
        :allowfullscreen="true"
        :frameborder="false"
      >
      </iframe>
      <br v-if="(i + 1) % layout.cols === 0" />
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  ref,
  Ref,
  onMounted,
} from "vue";
import queryString from "query-string";
import { components } from "@/types/schema-mine";
import { fetchConfig } from "@/gateways/config";
import { monitorStreamer } from "@/gateways/monitoring";
import { calculateLayout } from "@/layout";
import { useNotification } from "@/notification";
import { fetchStreamers } from "@/gateways/streamer";

type QueryParameters = {
  streamer: string[];
  width: number;
  height: number;
};

function parseQueryString(): QueryParameters {
  const parsed = queryString.parse(location.search, {
    arrayFormat: "comma",
  });

  const streamer = ([] as string[])
    .concat(parsed["streamer"] ?? [])
    .map((ch) => ch.toLowerCase());

  const width = Number(parsed["width"] || window.innerWidth);
  const height = Number(parsed["height"] || window.innerHeight);

  return {
    streamer,
    width,
    height,
  };
}

type Streamer = {
  id: string;
  name: string;
  isLive: boolean;
};

function useStreamers(streamerNames: string[]) {
  const response: Ref<components["schemas"]["StreamerList"]> = ref({
    data: [],
  });

  const streamers: ComputedRef<Streamer[]> = computed(() => {
    return response.value.data.map((streamer) => {
      return {
        id: streamer.id,
        name: streamer.name.toLowerCase(),
        isLive: streamer.is_live,
      };
    });
  });

  const reloadStreamers = async () => {
    response.value = await fetchStreamers(streamerNames);
  };

  return {
    streamers,
    reloadStreamers,
  };
}

export default defineComponent({
  name: "the-players",
  setup() {
    const queryParameters = parseQueryString();

    const { streamers, reloadStreamers } = useStreamers(
      queryParameters.streamer
    );

    const layout = computed(() =>
      calculateLayout(
        queryParameters.width,
        queryParameters.height,
        streamers.value.length
      )
    );

    onMounted(async () => {
      const config = await fetchConfig();

      useNotification(config.pusher, [], async () => {
        await reloadStreamers();
      });

      await reloadStreamers();

      await streamers.value.map((streamer) => {
        return monitorStreamer(streamer.id);
      });
    });

    return {
      streamers,
      layout,
    };
  },
});
</script>
