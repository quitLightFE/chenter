// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // Включает React Compiler (требует плагин)

  // Критически важно: заставляет Webpack правильно читать ES-модули MUI
  transpilePackages: [
    '@mui/material', 
    '@mui/system', 
    '@mui/icons-material',
    'pocketbase' // Добавляем PocketBase на случай конфликтов
  ],
};

export default nextConfig;
