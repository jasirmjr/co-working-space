import cv2
import glob
import os

video_paths = glob.glob(r'C:\Users\mjrja\Downloads\*Architectural*mp4')
if not video_paths:
    print("Video not found!")
    exit(1)

video_path = video_paths[0]
print(f"Reading video: {video_path}")

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(f"Total frames: {total_frames}, FPS: {fps}, Dimensions: {width}x{height}")

out_dir = r'c:\Users\mjrja\OneDrive\Desktop\Project\coworking-space-animatedweb\public\frames'
os.makedirs(out_dir, exist_ok=True)

frame_idx = 1
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Save as frame_001.jpg, frame_002.jpg ...
    filename = os.path.join(out_dir, f"frame_{frame_idx:03d}.jpg")
    cv2.imwrite(filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
    
    # Also save 4-digit alias just in case
    filename_4 = os.path.join(out_dir, f"frame_{frame_idx:04d}.jpg")
    # Using hardlink or writing directly
    
    if frame_idx % 20 == 0 or frame_idx == total_frames:
        print(f"Extracted {frame_idx}/{total_frames} frames...")
    frame_idx += 1

cap.release()
print(f"Done! Extracted {frame_idx - 1} frames to {out_dir}")
