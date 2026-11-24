#!/usr/bin/env bash
# Genera assets/video/huanuco.mp4: montaje con movimiento lento ("Ken Burns")
# a partir de las fotografías reales de assets/img. Requiere ffmpeg.
# Cada plano dura 5 s con fundido de 1 s => un plano nuevo cada 4 s.
# El video se recorta para que el último fotograma coincida con el primero
# y el bucle sea continuo.
set -euo pipefail
cd "$(dirname "$0")/.."
IMGS=(tingo bella2 kotosh pampa monzon plaza)
W=1600; H=800; FPS=30; D=5; X=1
TMP=$(mktemp -d)
i=0
for name in "${IMGS[@]}" "${IMGS[0]}"; do
  # dirección alterna del zoom para dar ritmo
  if (( i % 2 )); then Z="1.12-0.0008*on"; else Z="1+0.0008*on"; fi
  ffmpeg -loglevel error -y -loop 1 -t $D -i "assets/img/$name.jpg" -vf \
    "scale=${W}*2:${H}*2:force_original_aspect_ratio=increase,crop=${W}*2:${H}*2:(iw-ow)/2:(ih-oh)*0.35,zoompan=z='$Z':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=$((D*FPS)):s=${W}x${H}:fps=$FPS,format=yuv420p" \
    -frames:v $((D*FPS)) -c:v libx264 -preset veryfast -crf 12 "$TMP/c$i.mp4"
  i=$((i+1))
done
N=$i
# cadena de fundidos
inputs=""; filter=""; prev="[0:v]"
for ((k=1;k<N;k++)); do
  inputs+=" -i $TMP/c$k.mp4"
  off=$(( k*(D-X) ))
  out="[v$k]"
  filter+="${prev}[$k:v]xfade=transition=fade:duration=$X:offset=$off${out};"
  prev=$out
done
filter=${filter%;}
LOOP=$(( (N-1)*(D-X) ))
mkdir -p assets/video
ffmpeg -loglevel error -y -i "$TMP/c0.mp4" $inputs -filter_complex "$filter" -map "$prev" \
  -ss $X -t $LOOP -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  assets/video/huanuco.mp4
# póster = primer fotograma
ffmpeg -loglevel error -y -ss 0 -i assets/video/huanuco.mp4 -frames:v 1 -q:v 3 assets/img/hero-poster.jpg
rm -rf "$TMP"
ls -la assets/video/huanuco.mp4 assets/img/hero-poster.jpg
