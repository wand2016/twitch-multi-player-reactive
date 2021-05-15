module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/twitch-multi-player-reactive/"
      : "/",
};
