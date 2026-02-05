function switchBrush(newBrush) {
  // dont do anything if we are already on this brush
  if (activeBrush === newBrush) return;

  newBrush.color = activeBrush.color;
  newBrush.size = activeBrush.size;
  newBrush.isEraserMode = false;

  activeBrush = newBrush;

  myToolbar.setBrush(activeBrush);
}
