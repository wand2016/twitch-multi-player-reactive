import { searchStreamsByUserId } from "@bff/gateways/channels";
import { searchUsersByLoginNames } from "@bff/gateways/users";
import { Streamer } from "@bff/domain/types";

export async function findStreamersByLoginNames(
  loginNames: string[]
): Promise<Streamer[]> {
  const users = await searchUsersByLoginNames(loginNames);
  const streams = await searchStreamsByUserId(users.data.map(({ id }) => id));

  return users.data.map((user) => {
    return {
      id: user.id,
      name: user.login,
      is_live: streams.data.some((stream) => stream.user_login === user.login),
    };
  });
}
