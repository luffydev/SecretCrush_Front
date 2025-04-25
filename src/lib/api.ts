/* eslint-disable @typescript-eslint/no-explicit-any */

class API {
    private baseUrl: string;
    private jwtToken: string | null;
    private csrfToken: string | null;
    
    constructor() {
      this.baseUrl = process.env.SC_API_URL || 'http://localhost:3001/api';
      this.jwtToken = null;
      this.csrfToken = null;
      
      // Initialiser le token CSRF au démarrage
      if (typeof window !== 'undefined') {
        this.fetchCsrfToken();
      }
    }
    
    // Récupérer le token CSRF du serveur
    async fetchCsrfToken() {
      try {
        const response = await fetch(`${this.baseUrl}/csrf-token`, {
          method: 'GET',
          credentials: 'include', // Important pour recevoir les cookies
          headers: {
            'x-api-key': process.env.SC_API_BASE_KEY ?? ''
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          this.setCsrfToken(data.token);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token CSRF:', error);
      }
    }
    
    // Méthode pour définir le CSRF Token
    setCsrfToken(token: string) {
      this.csrfToken = token;
      // Ne pas redéfinir le cookie, le serveur l'a déjà fait
    }
    
    // Méthode pour obtenir les en-têtes
    getHeaders(headers: Record<string, string> = {}): Record<string, string> {
      const authHeaders: Record<string, string> = {};
      
      if (this.jwtToken) {
        authHeaders['Authorization'] = `Bearer ${this.jwtToken}`;
      }
      
      // Utilisez le même nom d'en-tête
      if (this.csrfToken)
        authHeaders['csrf-token'] = this.csrfToken;
      
      authHeaders['x-api-key'] = process.env.SC_API_BASE_KEY ?? '';
      authHeaders['Content-Type'] = 'application/json';
      
      return { ...authHeaders, ...headers };
    }
  
    // Méthode pour effectuer une requête GET avec le JWT et CSRF
    async get(endpoint: string, headers: Record<string, string> = {}): Promise<any> {
      const res = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(headers),
      });
  
      if (!res.ok) {
        throw new Error(`Erreur lors de la récupération des données: ${res.statusText}`);
      }
  
      return await res.json();
    }
  
    // Méthode pour effectuer une requête POST avec le JWT et CSRF
    async post(endpoint: string, body: Record<string, any>, headers: Record<string, string> = {}): Promise<any> {
      const res = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(headers),
        body: JSON.stringify(body),
        credentials: 'include',
      });
  
      if (!res.ok) {
        throw new Error(`Erreur lors de la requête POST: ${res.statusText}`);
      }
  
      return await res.json();
    }
  
    // Autres méthodes (PUT, DELETE) avec CSRF et JWT comme précédemment
  }
  
  const api = new API();
  export default api;
  