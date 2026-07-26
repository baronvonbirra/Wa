# 🏯 Japan Quest — Family Travel Language Adventure Game!

A highly gamified, interactive, and kid-friendly Japanese language learning application designed for families preparing for their travels to Japan.

Specifically styled for **James (5yo)** represented by 👱‍♂️, **Lily (9yo)** represented by 👱‍♀️, and **Mike (parent)** 👨‍👩‍👧‍👦, this game features:
* **6 Custom Destinations**: Kyoto, Tokyo, Osaka, Train Station, Okinawa, and Takayama (150+ vocabulary words/phrases + 18 dialogue scripts + 18 trivia facts).
* **5 Playable Game Modes**: Hiragana Match, Listen & Click (with native Japanese TTS), Read & Understand, Dialogue Completion, and Pronunciation Challenge.
* **Digital Passport Stamps**: Unlock new region stamps after achieving at least 50% mastery in the previous location, featuring retro stickers and a live trip countdown banner.
* **Parent Control Center**: Side-by-side stats comparison, weak items tracking, dynamic shared family challenges, and customizable trip date configurations.

---

## 🚀 Local Development

To run the application locally on your computer:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

To verify production bundle compilation:
```bash
npm run build
```

---

## 🌐 GitHub Pages Deployment Guide

If you are deploying your website to **GitHub Pages** (specifically to a sub-folder/repository sub-directory such as `https://baronvonbirra.github.io/wa/`), you need to make sure both the repository configuration and base paths are correctly aligned.

### **Step 1: Update the base path in `vite.config.ts`**
Open `vite.config.ts` and set the `base` configuration option to match your exact repository name (with trailing slashes).
For example, if your repository path is `/wa/`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wa/', // Must match your repository subdirectory name exactly
})
```

### **Step 2: Enable Workflow Permissions on GitHub**
For the automatic deployment workflow (`.github/workflows/deploy.yml`) to successfully write built assets to your `gh-pages` branch, you must give Actions read/write permissions:
1. Go to your GitHub repository webpage.
2. Click on the **Settings** tab.
3. On the left sidebar, click on **Actions** -> **General**.
4. Scroll down to the **Workflow permissions** section.
5. Select **"Read and write permissions"**.
6. Click **Save**.

### **Step 3: Configure GitHub Pages Source Branch**
Once the automatic deployment pipeline finishes building your code, it will push the built code to a new branch called `gh-pages`. You must tell GitHub to host the website from this specific branch:
1. Inside your repository **Settings** page, click on **Pages** in the left sidebar (under the "Code and automation" section).
2. Under the **Build and deployment** section -> **Source**, make sure it says **"Deploy from a branch"**.
3. Under **Branch**, select **`gh-pages`** from the dropdown menu (instead of `main` or `None`).
4. Set the folder dropdown next to it to **`/ (root)`**.
5. Click **Save**.

Within a couple of minutes, your site will be live and active at `https://baronvonbirra.github.io/wa/`!
