import ThemeRegistry from "@/theme/themeRegistry";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";	// ← Для Next.js 16 пока используем v15
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const mode = cookieStore.get("theme-mode")?.value || "light";

  return (
    <html lang="ru">
      <body>
      	<AppRouterCacheProvider>
      		
        <ThemeRegistry initialMode={mode}>
          {children}
        </ThemeRegistry>
      	</AppRouterCacheProvider>
      </body>
    </html>
  );
}