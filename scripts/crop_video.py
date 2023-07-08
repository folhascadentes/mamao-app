"""
Usage: python3 crop_video.py input_file end_time [--compress]

This script crops a video to a specified length. The cropped video will start
from the beginning of the input video and end at the time you specify.

Arguments:
- input_file: Path to the video you want to crop.
- end_time: The time you want the cropped video to end, in the format HH:MM:SS.sss.
  For example, if you want a 10-second video, you would enter 00:00:10.000.
- --compress (optional): Include this option if you want to compress the output video.
  If you want the output video to have the same quality as the input, omit this option.

Example:
python3 crop_video.py ../public/videos/LibrasAgosto.webm 00:00:10.000 --compress
"""

import sys
import subprocess


def crop_video(input_file, output_file, end_time, compress):
    command = ["ffmpeg", "-y",
               "-i", input_file,
               "-to", end_time,
               "-c:v", "libvpx-vp9" if compress else "copy",
               "-c:a", "libopus" if compress else "copy",
               output_file]
    subprocess.run(command, stdout=None, stderr=None)


if __name__ == "__main__":
    input_file = sys.argv[1]
    end_time = sys.argv[2]
    output_file = input_file.replace(".webm", "_cropped.webm")
    compress = len(sys.argv) > 3 and sys.argv[3] == '--compress'
    crop_video(input_file, output_file, end_time, compress)
