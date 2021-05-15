<template>
  <div style="white-space: nowrap">
    <template v-if="streamerNames.length === 0">
      <p>URIで配信者の名前を指定してください。</p>
      <p>例: {{ origin }}/?streamer=streamerA,streamerB,streamerC</p>
    </template>
    <template v-else>
      <template v-for="(streamer, i) in liveStreamers" :key="streamer.id">
        <iframe
          :src="`https://player.twitch.tv/?channel=${streamer.name}&parent=${hostname}&autoplay=true`"
          :height="layout.unitHeight"
          :width="layout.unitWidth"
          :allowfullscreen="true"
          :frameborder="false"
        >
        </iframe>
        <br v-if="(i + 1) % layout.cols === 0" />
      </template>
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

    const origin = location.origin;
    const hostname = location.hostname;
    const streamerNames = queryParameters.streamer;

    const { streamers, reloadStreamers } = useStreamers(
      queryParameters.streamer
    );
    const liveStreamers = computed(() => {
      return streamers.value.filter((streamer) => streamer.isLive);
    });

    const layout = computed(() =>
      calculateLayout(
        queryParameters.width,
        queryParameters.height,
        liveStreamers.value.length
      )
    );

    onMounted(async () => {
      const config = await fetchConfig();

      useNotification(config.pusher, streamerNames, async () => {
        await reloadStreamers();
      });

      await reloadStreamers();

      await streamers.value.map((streamer) => {
        return monitorStreamer(streamer.id);
      });
    });

    return {
      origin,
      hostname,
      streamerNames,
      liveStreamers,
      layout,
    };
  },
});
</script>
