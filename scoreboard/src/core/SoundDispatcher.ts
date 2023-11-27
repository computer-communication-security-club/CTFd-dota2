export function playSound(id: string) {
  console.log(id);
  const audio = new Audio(`/assets/sounds/${id}.mp3`);
  audio.autoplay = true;
  return new Promise((resolve, reject) => {
    audio.onended = resolve as () => void;
    audio.play().catch(reject);
  });
}
