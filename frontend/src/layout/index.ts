export function calculateLayout(
  width: number,
  height: number,
  playerCount: number
) {
  const rows = Math.ceil(Math.sqrt(playerCount));
  const cols = rows;
  const unitWidth = Math.floor(width / cols);
  const unitHeight = Math.floor(height / rows);

  return {
    rows,
    cols,
    unitWidth,
    unitHeight,
  };
}
