// // Ce fichier simulera les appels API en attendant le backend.

// // Données de test
// let mockJuries = [
//   { id: 1, firstname: 'Jean', lastname: 'Dupont', email: 'jean.dupont@example.com', role: 'jury_president', isActive: true },
//   { id: 2, firstname: 'Marie', lastname: 'Curie', email: 'marie.curie@example.com', role: 'jury_senior', isActive: true },
//   { id: 3, firstname: 'Pierre', lastname: 'Martin', email: 'pierre.martin@example.com', role: 'jury', isActive: false },
// ];

// const simulateApiCall = (data) => new Promise(resolve => setTimeout(() => resolve(data), 500));

// export const juryService = {
//   getAll: async () => {
//     console.log("SERVICE: Récupération de tous les jurys");
//     return simulateApiCall([...mockJuries]);
//   },

//   invite: async (juryData) => {
//     console.log("SERVICE: Invitation d'un nouveau jury", juryData);
//     const newJury = {
//       id: Math.max(0, ...mockJuries.map(j => j.id)) + 1,
//       ...juryData,
//     };
//     mockJuries.push(newJury);
//     return simulateApiCall(newJury);
//   },

//   update: async (id, updatedData) => {
//     console.log(`SERVICE: Mise à jour du jury ${id}`, updatedData);
//     mockJuries = mockJuries.map(j => (j.id === id ? { ...j, ...updatedData } : j));
//     return simulateApiCall(mockJuries.find(j => j.id === id));
//   },

//   delete: async (id) => {
//     console.log(`SERVICE: Suppression du jury ${id}`);
//     mockJuries = mockJuries.filter(j => j.id !== id);
//     return simulateApiCall({ message: 'Jury supprimé' });
//   },
// };

//MON TEST

export const juryService = {
  getAll: async () => {
    console.log("SERVICE: Récupération de tous les jurys");
    // Utilise la route générale avec filtrage côté backend
    const response = await fetch('http://localhost:3000/api/users?role=jury');
    return response.json();
  },

  invite: async (juryData) => {
    console.log("SERVICE: Invitation d'un nouveau jury", juryData);
    // Utilise la route publique d'invitation
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(juryData)
    });
    return response.json();
  },

  update: async (id, updatedData) => {
    console.log(`SERVICE: Mise à jour du jury ${id}`, updatedData);
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    return response.json();
  },

  delete: async (id) => {
    console.log(`SERVICE: Suppression du jury ${id}`);
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },
};