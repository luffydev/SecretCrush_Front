interface WebpackProvidePluginOptions {
    [key: string]: string | string[];
  }
  
  interface WebpackConfig {
    plugins: {
      provide: WebpackProvidePluginOptions;
    };
  }
  
  declare module 'next-pwa' {
    import { NextConfig } from 'next';
    
    export default function withPWA(config?: any): (nextConfig: NextConfig) => NextConfig;
  }