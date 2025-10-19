# My Helper - מערכת כתיבה עם AI מתוחכם

מערכת מתקדמת לכתיבת טקסטים עם AI מתוחכם ולומד, המיועדת לכתיבת מסמכים משפטיים, עסקיים ואקדמיים בעברית תקנית.

## תכונות עיקריות

### 🤖 AI מתוחכם
- יצירת טקסטים מקצועיים בעברית
- שיפור טקסטים קיימים
- למידה מתמדת מהשימוש
- תמיכה בסוגי טקסטים שונים

### 📝 סוגי טקסטים נתמכים
- **מסמכים משפטיים**: חוזים, צוואות, הסכמים, כתבי תביעה
- **מסמכים עסקיים**: הצעות, דוחות, מכתבים רשמיים
- **טקסטים אקדמיים**: מאמרים, עבודות מחקר, סיכומים
- **כתיבה יצירתית**: סיפורים, שירים, מאמרים אישיים
- **טקסטים טכניים**: מדריכים, תיעוד, הוראות שימוש

### 🎨 עיצוב מתקדם
- ממשק משתמש מודרני עם Tailwind CSS
- תמיכה מלאה בעברית (RTL)
- עיצוב רספונסיבי
- אנימציות חלקות עם Framer Motion

### ☁️ אחסון בענן
- שילוב עם Supabase לאחסון נתונים
- שמירה אוטומטית של טקסטים
- מעקב אחר התקדמות ולמידה
- ניתוחים ותובנות

## טכנולוגיות

### Frontend
- **Next.js 14** - React framework עם App Router
- **TypeScript** - טיפוסים בטוחים
- **Tailwind CSS** - עיצוב מודרני ורספונסיבי
- **Framer Motion** - אנימציות חלקות
- **React Hook Form** - ניהול טפסים
- **Zod** - ולידציה של נתונים

### Backend
- **Next.js API Routes** - API endpoints
- **OpenAI GPT-4** - AI מתקדם לכתיבה
- **Supabase** - אחסון נתונים בענן
- **Axios** - בקשות HTTP

### DevOps
- **Vercel** - אחסון ו-deployment
- **GitHub** - ניהול קוד
- **ESLint & Prettier** - איכות קוד

## התקנה והפעלה

### דרישות מקדימות
- Node.js 18+ 
- npm או yarn
- מפתח API של OpenAI
- מפתח API של Superdata

### התקנה

1. **שכפול הפרויקט**
```bash
git clone https://github.com/your-username/my-helper.git
cd my-helper
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הגדרת משתני סביבה**
```bash
cp env.example .env.local
```

ערוך את הקובץ `.env.local` והוסף את המפתחות שלך:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

4. **הפעלת השרת**
```bash
npm run dev
```

5. **פתיחת הדפדפן**
```
http://localhost:3001
```

### 🚀 העלאה לייצור

#### Vercel (מומלץ)
1. התחבר ל-[Vercel](https://vercel.com)
2. ייבא את הפרויקט מ-GitHub
3. הוסף את משתני הסביבה ב-Vercel Dashboard:
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. הפרויקט יעלה אוטומטית!

#### Netlify
1. התחבר ל-[Netlify](https://netlify.com)
2. ייבא את הפרויקט מ-GitHub
3. הגדר build command: `npm run build`
4. הגדר publish directory: `out`
5. הוסף משתני סביבה ב-Netlify Dashboard
```

האפליקציה תהיה זמינה בכתובת: http://localhost:3000

## מבנה הפרויקט

```
my-helper/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── ai/           # AI endpoints
│   │   │   └── superdata/    # Superdata endpoints
│   │   ├── globals.css       # עיצוב גלובלי
│   │   ├── layout.tsx        # Layout ראשי
│   │   └── page.tsx          # דף הבית
│   ├── components/           # רכיבי React
│   │   ├── ui/              # רכיבי UI בסיסיים
│   │   ├── forms/           # רכיבי טפסים
│   │   └── text-editor/     # עורך טקסט
│   ├── lib/                 # ספריות ושירותים
│   │   ├── ai.ts           # שירות AI
│   │   ├── superdata.ts    # שירות Superdata
│   │   └── utils.ts        # פונקציות עזר
│   ├── hooks/              # Custom React hooks
│   ├── types/              # הגדרות TypeScript
│   └── utils/              # פונקציות עזר
├── public/                 # קבצים סטטיים
├── package.json           # תלויות הפרויקט
├── tailwind.config.js     # הגדרות Tailwind
├── tsconfig.json          # הגדרות TypeScript
└── vercel.json           # הגדרות Vercel
```

## שימוש

### יצירת טקסט חדש
1. בחר סוג טקסט (משפטי, עסקי, אקדמי וכו')
2. תאר מה אתה רוצה לכתוב
3. בחר סגנון ואורך
4. לחץ על "צור טקסט עם AI"

### שיפור טקסט קיים
1. הדבק את הטקסט שלך
2. בחר סוג שיפור (דקדוק, סגנון, בהירות וכו')
3. לחץ על "שפר טקסט"
4. בדוק את ההצעות וקבל או דחה

### שמירה וניהול
- כל הטקסטים נשמרים אוטומטית
- ניתן לחפש ולסנן טקסטים
- מעקב אחר התקדמות ולמידה
- ניתוחים ותובנות על הכתיבה

## API

### AI Endpoints
- `POST /api/ai/generate` - יצירת טקסט חדש
- `POST /api/ai/improve` - שיפור טקסט קיים

### Superdata Endpoints
- `GET /api/superdata/texts` - קבלת טקסטים
- `POST /api/superdata/texts` - יצירת טקסט חדש
- `GET /api/superdata/texts/[id]` - קבלת טקסט לפי ID
- `PATCH /api/superdata/texts/[id]` - עדכון טקסט
- `DELETE /api/superdata/texts/[id]` - מחיקת טקסט
- `POST /api/superdata/learning` - שמירת נתוני למידה

## תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## רישיון

הפרויקט מופץ תחת רישיון MIT. ראה את הקובץ `LICENSE` לפרטים נוספים.

## תמיכה

אם יש לך שאלות או בעיות, אנא פתח issue ב-GitHub או צור קשר איתנו.

## תודות

- OpenAI על ה-GPT-4 API
- Superdata על שירות האחסון
- Vercel על הפלטפורמה
- כל התורמים לפרויקט
