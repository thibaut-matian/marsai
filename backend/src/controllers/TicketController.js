const { Op } = require("sequelize");
const crypto = require("crypto");
const { EventTicket, TicketType } = require("../models");

class TicketController {

  /**
   * GET /api/tickets/types
   * Retourne les types de billets avec le nombre de places restantes
   * Route publique
   */
  static async getTicketTypes(req, res) {
    try {
      const types = await TicketType.findAll();

      // Pour chaque type, on compte les réservations existantes
      const result = await Promise.all(
        types.map(async (type) => {
          const reserved = await EventTicket.count({
            where: { ticket_type_id: type.id },
          });

          return {
            id: type.id,
            name: type.name,
            capacity: type.capacity,
            reserved,
            remaining: type.capacity - reserved,
            available: type.capacity - reserved > 0,
          };
        })
      );

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des types de billets",
        error: error.message,
      });
    }
  }

  /**
   * POST /api/tickets
   * Réserver un billet
   * Route publique
   */
  static async createTicket(req, res) {
    try {
      const { ticket_type_id, email, firstname, lastname } = req.body;

      // 1. Vérifier les champs obligatoires
      if (!ticket_type_id || !email || !firstname || !lastname) {
        return res.status(400).json({
          success: false,
          message: "Tous les champs sont obligatoires (ticket_type_id, email, firstname, lastname)",
        });
      }

      // 2. Vérifier que le type de billet existe
      const ticketType = await TicketType.findByPk(ticket_type_id);
      if (!ticketType) {
        return res.status(404).json({
          success: false,
          message: "Type de billet introuvable",
        });
      }

      // 3. Vérifier qu'il reste des places
      const reserved = await EventTicket.count({
        where: { ticket_type_id },
      });
      if (reserved >= ticketType.capacity) {
        return res.status(409).json({
          success: false,
          message: `Plus de places disponibles pour le billet "${ticketType.name}"`,
        });
      }

      // 4. Vérifier que cet email n'a pas déjà réservé ce type de billet
      const alreadyBooked = await EventTicket.findOne({
        where: { ticket_type_id, email },
      });
      if (alreadyBooked) {
        return res.status(409).json({
          success: false,
          message: "Vous avez déjà réservé ce type de billet avec cette adresse email",
        });
      }

      // 5. Générer un QR token unique
      const qr_token = crypto.randomBytes(32).toString("hex");

      // 6. Créer la réservation
      const ticket = await EventTicket.create({
        ticket_type_id,
        email,
        firstname,
        lastname,
        qr_token,
      });

      res.status(201).json({
        success: true,
        message: "Réservation effectuée avec succès",
        data: {
          id: ticket.id,
          ticket_type: ticketType.name,
          firstname: ticket.firstname,
          lastname: ticket.lastname,
          email: ticket.email,
          qr_token: ticket.qr_token,
          reserved_at: ticket.reserved_at,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la réservation",
        error: error.message,
      });
    }
  }

  /**
   * GET /api/tickets
   * Liste toutes les réservations (admin uniquement)
   */
  static async getAllTickets(req, res) {
    try {
      const { ticket_type_id } = req.query;
      const where = ticket_type_id ? { ticket_type_id } : {};

      const tickets = await EventTicket.findAll({
        where,
        include: [{ model: TicketType, as: "ticketType", attributes: ["id", "name"] }],
        order: [["reserved_at", "DESC"]],
      });

      res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des réservations",
        error: error.message,
      });
    }
  }

  /**
   * PATCH /api/tickets/:id/scan
   * Scanner un billet via son QR code (admin uniquement)
   */
  static async scanTicket(req, res) {
    try {
      const { qr_token } = req.body;

      if (!qr_token) {
        return res.status(400).json({ success: false, message: "QR token manquant" });
      }

      const ticket = await EventTicket.findOne({ where: { qr_token } });

      if (!ticket) {
        return res.status(404).json({ success: false, message: "Billet introuvable" });
      }

      if (ticket.is_scanned) {
        return res.status(409).json({
          success: false,
          message: "Ce billet a déjà été scanné",
          data: { scanned_at: ticket.reserved_at },
        });
      }

      await ticket.update({ is_scanned: true });

      res.status(200).json({
        success: true,
        message: "Billet validé avec succès",
        data: {
          id: ticket.id,
          firstname: ticket.firstname,
          lastname: ticket.lastname,
          email: ticket.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors du scan",
        error: error.message,
      });
    }
  }

  /**
   * DELETE /api/tickets/:id
   * Annuler une réservation (admin uniquement)
   */
  static async deleteTicket(req, res) {
    try {
      const { id } = req.params;
      const ticket = await EventTicket.findByPk(id);

      if (!ticket) {
        return res.status(404).json({ success: false, message: "Réservation introuvable" });
      }

      await ticket.destroy();

      res.status(200).json({ success: true, message: "Réservation annulée avec succès" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'annulation",
        error: error.message,
      });
    }
  }
}

module.exports = TicketController;
