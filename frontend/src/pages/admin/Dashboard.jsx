import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Calendar,
  Award,
  Loader
} from 'lucide-react';
import useDashboardStats from '../../hooks/useDashboardStats';
import useProjectProgress from '../../hooks/useProjectProgress';
import useRecentActivity from '../../hooks/useRecentActivity';

const Dashboard = () => {
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { projectProgress, loading: progressLoading, error: progressError } = useProjectProgress();
  const { recentActivity, loading: activityLoading, error: activityError } = useRecentActivity();

  // ✅ SÉCURITÉ ABSOLUE
  const safeProjectProgress = Array.isArray(projectProgress) ? projectProgress : [];
  const safeRecentActivity = Array.isArray(recentActivity) ? recentActivity : [];

  const StatCard = ({ icon: Icon, title, value, trend, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#1E1E24] rounded-xl border border-white/5 hover:border-white/10 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">
            {statsLoading ? <Loader className="w-6 h-6 animate-spin" /> : value}
          </h3>
          {trend && !statsLoading && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="text-green-500">+{trend}%</span>
              <span className="text-gray-500 ml-1">ce mois</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );

  const ProgressBar = ({ phase, status, progress }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-300">{phase}</span>
        <span className={`text-xs px-2 py-1 rounded ${
          status === 'completed' ? 'bg-green-500/20 text-green-500' :
          status === 'active' ? 'bg-blue-500/20 text-blue-500' :
          'bg-gray-500/20 text-gray-500'
        }`}>
          {status === 'completed' ? 'Terminé' : 
           status === 'active' ? 'En cours' : 'À venir'}
        </span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${
            status === 'completed' ? 'bg-green-500' :
            status === 'active' ? 'bg-blue-500' :
            'bg-gray-500'
          }`}
        />
      </div>
    </div>
  );

  const ActivityItem = ({ type, message, time }) => {
    const getIcon = () => {
      switch(type) {
        case 'jury': return <Users className="w-4 h-4" />;
        case 'evaluation': return <CheckCircle className="w-4 h-4" />;
        case 'document': return <FileText className="w-4 h-4" />;
        default: return <AlertCircle className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-300">{message}</p>
          <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-400">Vue d'ensemble de l'activité du site</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Dernière mise à jour: {new Date().toLocaleString('fr-FR')}</span>
        </div>
      </div>

      {/* Afficher erreur si nécessaire */}
      {(statsError || progressError || activityError) && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-red-400">Erreur de chargement des données</p>
            <p className="text-xs text-red-400/70 mt-1">
              {statsError || progressError || activityError}
            </p>
          </div>
        </div>
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Jurés actifs"
          value={stats.activeJuries}
          trend={stats.thisMonthSubmissions > 0 ? 12 : null}
          color="bg-blue-500/20 text-blue-500"
        />
        <StatCard
          icon={FileText}
          title="Évaluations complétées"
          value={stats.completedJuries}
          color="bg-green-500/20 text-green-500"
        />
        <StatCard
          icon={Clock}
          title="Documents en attente"
          value={stats.pendingDocuments}
          color="bg-orange-500/20 text-orange-500"
        />
        <StatCard
          icon={Award}
          title="Participants totaux"
          value={stats.totalParticipants}
          trend={stats.thisMonthSubmissions > 0 ? 8 : null}
          color="bg-purple-500/20 text-purple-500"
        />
      </div>

      {/* Progression du projet et activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-[#1E1E24] rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Progression du Projet</h2>
            <span className="text-sm text-gray-400">4 étapes</span>
          </div>
          {progressLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : progressError ? (
            <div className="flex items-center justify-center py-8 text-red-400">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span>Erreur de chargement</span>
            </div>
          ) : safeProjectProgress.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <span>Aucune donnée disponible</span>
            </div>
          ) : (
            <div className="space-y-4">
              {safeProjectProgress.map((item, index) => (
                <ProgressBar key={index} {...item} />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-[#1E1E24] rounded-xl border border-white/5">
          <h2 className="text-xl font-bold mb-4">Activité Récente</h2>
          {activityLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : activityError ? (
            <div className="flex items-center justify-center py-8 text-red-400">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span>Erreur de chargement</span>
            </div>
          ) : safeRecentActivity.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <span>Aucune activité récente</span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {safeRecentActivity.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-500 hover:text-blue-400 transition-colors">
                Voir toute l'activité →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Vue d'ensemble des jurés */}
      <div className="p-6 bg-[#1E1E24] rounded-xl border border-white/5">
        <h2 className="text-xl font-bold mb-4">Vue d'ensemble des Jurés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Jurés inscrits</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">
              {statsLoading ? <Loader className="w-6 h-6 animate-spin" /> : stats.totalJuries}
            </p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Évaluations en cours</span>
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">
              {statsLoading ? <Loader className="w-6 h-6 animate-spin" /> : stats.activeJuries}
            </p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Évaluations terminées</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold">
              {statsLoading ? <Loader className="w-6 h-6 animate-spin" /> : stats.completedJuries}
            </p>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors text-left">
          <FileText className="w-6 h-6 mb-2" />
          <h3 className="font-semibold mb-1">Gérer les Jurés</h3>
          <p className="text-sm opacity-90">Ajouter ou modifier des jurés</p>
        </button>
        
        <button className="p-4 bg-green-500 hover:bg-green-600 rounded-xl transition-colors text-left">
          <CheckCircle className="w-6 h-6 mb-2" />
          <h3 className="font-semibold mb-1">Valider les Documents</h3>
          <p className="text-sm opacity-90">{stats.pendingDocuments} en attente</p>
        </button>
        
        <button className="p-4 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors text-left">
          <Award className="w-6 h-6 mb-2" />
          <h3 className="font-semibold mb-1">Voir les Résultats</h3>
          <p className="text-sm opacity-90">Consulter les évaluations</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;