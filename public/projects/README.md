# 📁 Project Images Directory

This folder contains all images for your portfolio projects.

## 📂 Folder Structure

```
public/projects/
├── vince/           # VINCE project images
├── ai-enemy/        # AI Enemy System images
├── dialogue/        # Dialogue System images
├── clouds/          # Cloud Renderer images
├── water/           # Water Shader images
├── mecha/           # Mecha Model images
└── your-project/    # Add your own project folders
```

## 🖼️ Adding Images

1. **Create a folder** for your project (use lowercase with hyphens)
   ```bash
   mkdir public/projects/my-new-project
   ```

2. **Add your images** to that folder
   - Supported formats: `.jpg`, `.png`, `.gif`, `.webp`
   - Recommended size: 1920x1080 or similar aspect ratio
   - Name them descriptively: `image1.jpg`, `screenshot-1.png`, etc.

3. **Update** `src/data/projects.json` with the image paths:
   ```json
   "images": [
     "/projects/my-new-project/image1.jpg",
     "/projects/my-new-project/image2.jpg"
   ]
   ```

## 💡 Tips

- Keep image file sizes reasonable (< 500KB each) for fast loading
- Use consistent naming conventions
- Images will automatically resize to fit the gallery
- If an image fails to load, a placeholder will be shown
