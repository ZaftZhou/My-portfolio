# 🚀 Quick Start: Update Your Portfolio

## ⚡ TL;DR - 3 Simple Steps

### 1️⃣ Update Your Info
Edit `src/data/config.json`:
```json
{
  "personalInfo": {
    "name": "Your Name",
    "email": "your@email.com",
    ...
  }
}
```

### 2️⃣ Add/Edit Projects
Edit `src/data/projects.json`:
```json
[
  {
    "id": 1,
    "title": "Your Project",
    "category": "Game Dev",
    "description": "What you built...",
    ...
  }
]
```

### 3️⃣ Add Images
```bash
# Create folder
mkdir public/projects/my-project

# Add images (jpg/png)
# Copy your images here

# Update projects.json
"images": ["/projects/my-project/image1.jpg"]
```

That's it! 🎉

## 📖 Need More Details?

👉 Read the full **[UPDATE_GUIDE.md](UPDATE_GUIDE.md)** for comprehensive instructions

## 🎯 What Can You Update?

- ✅ Name, title, bio
- ✅ Contact info & social links
- ✅ Education & work experience
- ✅ Projects (add/edit/delete)
- ✅ Project images
- ✅ Categories
- ✅ API keys (Gemini AI, Formspree)

## 🔥 Pro Tips

- Test JSON syntax at https://jsonlint.com/
- Keep images under 500KB
- Use 16:9 aspect ratio for images
- Make sure project IDs are unique
- Categories: `"Game Dev"`, `"Shaders"`, `"3D Art"`, `"Tools"`

---

**Questions?** Check [UPDATE_GUIDE.md](UPDATE_GUIDE.md) for troubleshooting!
