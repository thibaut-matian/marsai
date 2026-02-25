import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor pour injecter le token d'authentification (utile pour useAuth)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptors pour gérer les erreurs globalement
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optionnel : redirection vers login si non autorisé
            // window.location.href = '/jury/login';
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const getAPI = {
    // ===== AUTHENTIFICATION (useAuth) =====
    login: (credentials) => api.post('auth/login', credentials),
    getProfile: () => api.get('auth/me'),
    validateInvitation: (invitationToken) => api.post('users/validate-invitation', { invitationToken }),

    // ===== FILMS & SOUMISSIONS (useListFilm, useSubmission) =====
    getAllMovies: (params) => api.get('movies', { params }),
    getMovieDetails: (id) => api.get(`movies/${id}`),
    submitMovie: (formData) => api.post('movies', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // ===== JURY & VOTES (useJuryVote, useRankingJury) =====
    getJuryMovies: () => api.get('jury/movies'),
    submitVote: (voteData) => api.post('jury/vote', voteData),
    getRankings: () => api.get('jury/rankings'),
    getJuryStats: () => api.get('jury/stats'),

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
    getAdminMovies: () => api.get('admin/movie'),
    deleteMovie: (id) => api.delete(`admin/movie/${id}`),
    moderateMovie: (id, status) => api.patch(`admin/movie/${id}`, { status }),
    
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
};

export default getAPI;