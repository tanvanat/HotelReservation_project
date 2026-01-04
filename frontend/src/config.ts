
export const config = {
  // ใช้ import.meta.env สำหรับ Vite
  apiUrl: import.meta.env.VITE_API_URL,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  
  // ตัวอย่างการใช้งาน
  getApiEndpoint: (path: string) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    return `${baseUrl}${path}`;
  }
};