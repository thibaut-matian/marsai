import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/';
const DEPLOYMENT_MODE = import.meta.env.VITE_DEVMODE === 'true';

// Routes toujours actives même en mode déploiement (authentification admin)
const DEPLOYMENT_ALLOWED = ['auth/login', 'auth/logout', 'auth/refresh-token', 'users/refresh-token', 'users/validate-invitation'];

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    withCredentials: true, // ⚠️ IMPORTANT : Envoie les cookies de session
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor pour injecter le token d'authentification (utile pour useAuth)
api.interceptors.request.use((config) => {
    // Le dashboard jury stocke le token sous 'accessToken'
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Mode déploiement vitrine : intercepte les écritures sans toucher au réseau
    if (DEPLOYMENT_MODE) {
        const method = (config.method || '').toUpperCase();
        const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
        const isAllowed = DEPLOYMENT_ALLOWED.some(path => config.url?.includes(path));
        if (isWrite && !isAllowed) {
            config.adapter = () => Promise.resolve({
                data: { success: true, demo: true },
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
                request: {},
            });
        }
    }

    return config;
});

// Interceptors pour gérer les erreurs globalement
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const errorCode = error.response?.data?.code;

        // Uniquement si c'est un TOKEN_EXPIRED (401) et qu'on n'a pas déjà tenté un refresh
        if (error.response?.status === 401 && errorCode === 'TOKEN_EXPIRED' && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.error('Session expirée, aucun refreshToken disponible');
                return Promise.reject(error);
            }

            try {
                // Appel direct axios pour éviter les boucles d'intercepteurs
                const { data } = await axios.post(
                    `${API_BASE_URL}users/refresh-token`,
                    { refreshToken }
                );

                const newAccessToken = data.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken); // ← mis à jour dans localStorage

                // Rejouer la requête originale avec le nouveau token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token invalide, session terminée');
                return Promise.reject(refreshError);
            }
        }

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const getAPI = {
    // ===== AUTHENTIFICATION (useAuth) =====
    login: (credentials) => api.post('auth/login', credentials),
    logout: () => api.post('auth/logout'),  // ← AJOUT
    register: (registrationData) => api.post('auth/register', registrationData),  // ← AJOUT
    checkAuth: () => api.get('auth/check'),  // ← AJOUT
    getProfile: () => api.get('auth/me'),
    validateInvitation: (invitationToken) => api.post('users/validate-invitation', { invitationToken }),
    getUserByToken: (token) => api.get(`users/by-token/${token}`),

    // ===== FILMS & SOUMISSIONS (useListFilm, useSubmission) =====
    getAllMovies: (params) => api.get('movies', { params }),
    getMovieDetails: (id) => api.get(`movies/id/${id}`),
    getMovieByUrl: (url) => api.get(`movies/url/${url}`),
    submitMovie: (formData) => api.post('movies', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000 // 5 minutes pour l'upload de fichiers volumineux
    }),
    
    // ===== JURY & VOTES (useJuryVote, useRankingJury) =====
    getJuryMovies: () => api.get('jury/movies'),
    getNextMovie: () => api.get('jury/next-movie'),
    submitVote: (voteData) => api.post('jury/vote', voteData),
    getMyVotes: () => api.get('jury/my-votes'),
    reportMovie: (reportData) => api.post('jury/report', reportData),
    getRankings: () => api.get('jury/rankings'),
    getJuryStats: () => api.get('jury/stats'),
    getJuryProgress: () => api.get('jury/progress'),

    // ===== BILLETTERIE & PLANNING (useTicketReservation, useEventPlanning) =====
    getTicketTypes: () => api.get('tickets/types'),
    getEvents: () => api.get('events/planning'),
    reserveTicket: (reservationData) => api.post('tickets', reservationData),
    getUserTickets: () => api.get('tickets/my-reservations'),

    // ===== ADMINISTRATION (useReport, useJuryManagement) =====
    getAdminDashboard: () => api.get('admin/dashboard'),
    getDashboardStats: () => api.get('admin/dashboard/stats'),
    getDashboardProgress: () => api.get('admin/dashboard/progress'),
    getDashboardActivity: () => api.get('admin/dashboard/activity'),
    getReports: () => api.get('admin/reports'),
    getAdminMovies: () => api.get('admin/movies'),
    deleteMovie: (id) => api.delete(`admin/movies/${id}`),
    moderateMovie: (id, status) => api.patch(`admin/movies/${id}`, { status }),
    AllMoviesReports: () => api.get('admin/movies/reports'),


    distributeMovies: () => api.post('admin/movies/distribute'),
    redistributeMovies: () => api.post('admin/movies/redistribute'),
    selectMovie: (id) => api.patch(`admin/movies/${id}/select`),
    
    // ===== GESTION DES JURYS (useJuryManagement) =====
    getAllJuries: () => api.get('users?role=jury'),
    inviteJury: (juryData) => api.post('users', juryData),
    updateJury: (id, juryData) => api.put(`users/${id}`, juryData),
    deleteJury: (id) => api.delete(`users/${id}`),
    deactivateJury: (id) => api.patch(`users/${id}`, { is_active: false }),
    reactivateJury: (id) => api.patch(`users/${id}`, { is_active: true }),
    
    // ===== EMAIL =====
    sendEmail: (payload) => api.post('admin/send-email', payload),

    // ===== RECHERCHE & FILTRES =====
    searchMovies: (query) => api.get('search', { params: { q: query } }),
    getGenres: () => api.get('genres'),

    // ===== HOME CONTENT =====
    getHomeContent: () => api.get('home-content'),
};

export default getAPI;