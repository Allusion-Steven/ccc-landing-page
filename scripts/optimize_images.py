from PIL import Image
import os
import sys
from pathlib import Path
import shutil

def optimize_images(source_dir, output_dir, quality=85):
    """
    Compress all images in source_dir and save to output_dir with the same structure
    """
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # Supported image formats
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    
    # Walk through all files in source directory
    for root, _, files in os.walk(source_dir):
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                # Get full file paths
                input_path = os.path.join(root, file)
                
                # Create relative path from source_dir
                rel_path = os.path.relpath(input_path, source_dir)
                output_path = os.path.join(output_dir, rel_path)
                
                # Create output subdirectories if needed
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                
                try:
                    with Image.open(input_path) as img:
                        # Convert RGBA to RGB if needed
                        if img.mode == 'RGBA':
                            img = img.convert('RGB')
                        
                        # Optimize and save
                        img.save(
                            output_path,
                            optimize=True,
                            quality=quality,
                            progressive=True
                        )
                        
                        # Calculate size reduction
                        original_size = os.path.getsize(input_path)
                        compressed_size = os.path.getsize(output_path)
                        reduction = (original_size - compressed_size) / original_size * 100
                        
                        print(f"Compressed {rel_path}")
                        print(f"Size reduced by {reduction:.1f}%")
                        print(f"({original_size / 1024:.1f}KB → {compressed_size / 1024:.1f}KB)\n")
                        
                except Exception as e:
                    print(f"Error processing {input_path}: {e}\n")

def transfer_smaller_images(optimized_dir, target_dir):
    """
    Transfer optimized images only if they're smaller than existing ones
    """
    for root, _, files in os.walk(optimized_dir):
        for file in files:
            optimized_path = os.path.join(root, file)
            # Get relative path from optimized directory
            rel_path = os.path.relpath(optimized_path, optimized_dir)
            target_path = os.path.join(target_dir, rel_path)
            
            if os.path.exists(target_path):
                optimized_size = os.path.getsize(optimized_path)
                original_size = os.path.getsize(target_path)
                
                if optimized_size < original_size:
                    # Create directories if needed
                    os.makedirs(os.path.dirname(target_path), exist_ok=True)
                    shutil.copy2(optimized_path, target_path)
                    reduction = (original_size - optimized_size) / original_size * 100
                    print(f"Transferred {rel_path}")
                    print(f"Size reduced by {reduction:.1f}%")
                    print(f"({original_size / 1024:.1f}KB → {optimized_size / 1024:.1f}KB)\n")
                else:
                    print(f"Skipped {rel_path} - not smaller than original\n")

if __name__ == "__main__":
    # Set source and output directories
    source_dir = "src"
    output_dir = "src/lib/assets/optimized"
    
    print("Starting image optimization...")
    optimize_images(source_dir, output_dir)
    print("Optimization complete!")

    optimized_dir = "src/lib/assets/optimized"
    target_dir = "src/lib/assets/images"
    
    print("Starting image transfer...")
    transfer_smaller_images(optimized_dir, target_dir)
    print("Transfer complete!") 