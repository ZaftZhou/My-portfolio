# 📝 Portfolio Update Guide

This guide explains how to easily update your portfolio content without touching the React code!

## 🎯 Quick Start

Your portfolio data is now stored in **JSON files** for easy editing:

```
src/data/
├── config.json      # Your personal info, education, experience
└── projects.json    # All your projects

public/projects/     # Your project images
├── vince/
├── ai-enemy/
└── ...
```

---

## 👤 Updating Personal Information

**File:** `src/data/config.json`

### Change Your Name, Title, or Bio

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio description...",
    "location": "Your City, Country",
    "email": "your.email@example.com",
    "phone": "+123 456 7890",
    "socials": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "artstation": "https://yourname.artstation.com/"
    }
  }
}
```

### Update Education

```json
{
  "education": [
    {
      "school": "Your University",
      "degree": "B.Eng. Your Major",
      "year": "2020-2024"
    }
  ]
}
```

### Update Work Experience

```json
{
  "experience": [
    {
      "role": "Your Job Title",
      "company": "Company Name",
      "period": "2020 – Present",
      "description": "What you did at this job..."
    }
  ]
}
```

### Add API Keys (Optional)

```json
{
  "apiKeys": {
    "gemini": "your-gemini-api-key",
    "formspree": "your-formspree-endpoint"
  }
}
```

---

## 🎨 Adding or Editing Projects

**File:** `src/data/projects.json`

### Add a New Project

1. **Copy this template** and add it to the array in `projects.json`:

```json
{
  "id": 7,
  "title": "Your Project Name",
  "category": "Game Dev",
  "description": "A short description of your project (1-2 sentences)",
  "tags": ["Unity", "C#", "Your Tech"],
  "color": "from-cyan-500 to-blue-600",
  "images": [
    "/projects/your-project/image1.jpg",
    "/projects/your-project/image2.jpg"
  ],
  "details": {
    "role": "Your Role",
    "duration": "How long it took",
    "challenge": "What was the main problem you were solving?",
    "solution": "How did you solve it?",
    "features": [
      "Key feature 1",
      "Key feature 2",
      "Key feature 3"
    ],
    "links": {
      "demo": "https://your-demo-link.com",
      "github": "https://github.com/you/project",
      "video": "https://youtube.com/watch?v=..."
    }
  }
}
```

2. **Important Notes:**
   - `id`: Must be unique (use the next number)
   - `category`: Must be one of: `"Game Dev"`, `"Shaders"`, `"3D Art"`, or `"Tools"`
   - `color`: Choose from these gradient colors:
     - `"from-cyan-500 to-blue-600"` (blue)
     - `"from-purple-500 to-pink-500"` (purple)
     - `"from-emerald-500 to-teal-600"` (green)
     - `"from-indigo-500 to-purple-500"` (indigo)
     - `"from-blue-400 to-teal-400"` (teal)
     - `"from-orange-500 to-red-500"` (orange/red)

### Edit an Existing Project

Just find the project in `projects.json` and modify any field!

### Delete a Project

Simply remove the entire project object from the array.

---

## 🖼️ Adding Project Images

### Step 1: Create a Folder

```bash
mkdir public/projects/your-project-name
```

### Step 2: Add Your Images

Copy your images into that folder:
```
public/projects/your-project-name/
├── image1.jpg
├── image2.jpg
└── image3.jpg
```

**Recommendations:**
- Format: JPG or PNG
- Size: ~1920x1080 (or 16:9 aspect ratio)
- File size: Under 500KB each for fast loading

### Step 3: Update projects.json

```json
{
  "id": 1,
  "title": "Your Project",
  "images": [
    "/projects/your-project-name/image1.jpg",
    "/projects/your-project-name/image2.jpg",
    "/projects/your-project-name/image3.jpg"
  ]
}
```

---

## 🎭 Customizing Categories

**File:** `src/data/config.json`

You can add or remove project categories:

```json
{
  "categories": ["All", "Game Dev", "Shaders", "3D Art", "Tools", "VFX", "Animation"]
}
```

**Note:** The first item should always be `"All"` to show all projects.

---

## ✅ Testing Your Changes

After making changes:

1. **Save all files**
2. **Refresh your browser** (or restart dev server if needed)
3. **Check the console** for any errors

### Common Issues

**Images not showing?**
- Check the file path in `images` array
- Ensure images are in `public/projects/` folder
- Verify image file names match exactly (case-sensitive)

**Project not appearing?**
- Check JSON syntax (commas, brackets, quotes)
- Ensure `id` is unique
- Verify `category` matches one in your categories array

**Syntax errors?**
- Use a JSON validator: https://jsonlint.com/
- Check for missing commas between objects
- Ensure all strings are in "double quotes"

---

## 🚀 Deployment Checklist

Before deploying to production:

1. ✅ Update your real email in `config.json`
2. ✅ Add real project images
3. ✅ Add API keys if using AI chat or contact form
4. ✅ Test all links (GitHub, LinkedIn, etc.)
5. ✅ Verify all images load correctly
6. ✅ Check mobile responsiveness

---

## 💡 Pro Tips

### Organizing Your Workflow

1. **Keep a backup** of your JSON files
2. **Use descriptive image names** (e.g., `vince-avatar-system.jpg`)
3. **Compress images** before adding them (use TinyPNG or similar)
4. **Test JSON** in a validator before committing

### Adding External Links

You can add demo/GitHub/video links to projects:

```json
{
  "details": {
    "links": {
      "demo": "https://your-live-demo.com",
      "github": "https://github.com/you/repo",
      "video": "https://youtube.com/watch?v=xyz"
    }
  }
}
```

### Reordering Projects

Projects are displayed in the order they appear in `projects.json`. Just drag and move the project objects to reorder them!

---

## 🆘 Need Help?

- **JSON Syntax Error?** → Use https://jsonlint.com/
- **Image Not Loading?** → Check browser console (F12) for errors
- **Something Broken?** → Check git history and revert if needed

---

## 📄 Example: Adding a Complete New Project

Here's a full example workflow:

### 1. Create image folder
```bash
mkdir public/projects/my-game
```

### 2. Add images
Copy `screenshot1.jpg`, `screenshot2.jpg` to that folder

### 3. Edit projects.json
```json
{
  "id": 7,
  "title": "My Awesome Game",
  "category": "Game Dev",
  "description": "A 2D platformer built in Unity with procedural level generation.",
  "tags": ["Unity", "C#", "2D", "Procedural"],
  "color": "from-purple-500 to-pink-500",
  "images": [
    "/projects/my-game/screenshot1.jpg",
    "/projects/my-game/screenshot2.jpg"
  ],
  "details": {
    "role": "Solo Developer",
    "duration": "3 Months",
    "challenge": "Creating infinite replayability with procedural generation.",
    "solution": "Implemented a wave function collapse algorithm for level chunks.",
    "features": [
      "Procedural Level Generation",
      "Local Multiplayer Support",
      "Steam Achievements Integration"
    ],
    "links": {
      "demo": "",
      "github": "https://github.com/you/my-game",
      "video": ""
    }
  }
}
```

### 4. Save and test
Refresh browser → Your new project should appear!

---

**Happy updating! 🎉**
