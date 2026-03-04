import { useState } from 'react';
import { Upload, Info, List, Award, Users, Mail, Calendar, Save } from 'lucide-react';
import { useHomeContent } from '../../hooks/useHomeContent';
import VideoUpload from '../../components/admin/VideoUpload';
import ImageUpload from '../../components/admin/ImageUpload';

const tabs = [
  { id: 'hero', label: 'Hero', icon: Upload },
  { id: 'about', label: 'À propos', icon: Info },
  { id: 'criteria', label: 'Critères', icon: List },
  { id: 'rewards', label: 'Récompenses', icon: Award },
  { id: 'jury', label: 'Jury', icon: Users },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
];

export default function Settings() {
  const {
    content,
    isLoading,
    isSaving,
    message,
    updateField,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    updateJuryMember,
    addJuryMember,
    removeJuryMember,
    updateTimelinePhase,
    saveContent,
  } = useHomeContent();

  const [activeTab, setActiveTab] = useState('hero');
  const [activeLang, setActiveLang] = useState('fr');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Paramètres de la page Home</h1>
            <p className="text-gray-400">Gérez tout le contenu de la page d'accueil</p>
          </div>
          <button
            onClick={saveContent}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Onglets de navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sélecteur de langue */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveLang('fr')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeLang === 'fr'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🇫🇷 Français
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeLang === 'en'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🇬🇧 English
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Onglet Hero */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Vidéo Hero</label>
                <VideoUpload
                  currentVideoUrl={content.hero?.[activeLang]?.videoUrl || ''}
                  onUploadComplete={(url) => updateField('hero', activeLang, 'videoUrl', url)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Texte du bouton</label>
                <input
                  type="text"
                  value={content.hero?.[activeLang]?.buttonText || ''}
                  onChange={(e) => updateField('hero', activeLang, 'buttonText', e.target.value)}
                  placeholder="Soumettre votre film"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>
            </div>
          )}

          {/* Onglet À propos */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.about?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('about', activeLang, 'title', e.target.value)}
                  placeholder="À propos"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Paragraphe 1</label>
                  <span className="text-xs text-gray-400">
                    {content.about?.[activeLang]?.paragraph1?.length || 0} caractères
                  </span>
                </div>
                <textarea
                  value={content.about?.[activeLang]?.paragraph1 || ''}
                  onChange={(e) => updateField('about', activeLang, 'paragraph1', e.target.value)}
                  placeholder="Premier paragraphe..."
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Paragraphe 2</label>
                  <span className="text-xs text-gray-400">
                    {content.about?.[activeLang]?.paragraph2?.length || 0} caractères
                  </span>
                </div>
                <textarea
                  value={content.about?.[activeLang]?.paragraph2 || ''}
                  onChange={(e) => updateField('about', activeLang, 'paragraph2', e.target.value)}
                  placeholder="Deuxième paragraphe..."
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                />
              </div>

              <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  💡 <strong>Conseil :</strong> Gardez vos paragraphes concis et impactants. 
                  Visez 200-400 caractères par paragraphe pour une lecture optimale.
                </p>
              </div>
            </div>
          )}

          {/* Onglet Critères */}
          {activeTab === 'criteria' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.criteria?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('criteria', activeLang, 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Liste des critères</label>
                {(content.criteria?.[activeLang]?.items || []).map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('criteria', activeLang, index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-700 rounded"
                    />
                    <button
                      onClick={() => removeArrayItem('criteria', activeLang, index)}
                      className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('criteria', activeLang)}
                  className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 mt-2"
                >
                  + Ajouter un critère
                </button>
              </div>
            </div>
          )}

          {/* Onglet Récompenses */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.rewards?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('rewards', activeLang, 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Liste des récompenses</label>
                {(content.rewards?.[activeLang]?.items || []).map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('rewards', activeLang, index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-700 rounded"
                    />
                    <button
                      onClick={() => removeArrayItem('rewards', activeLang, index)}
                      className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('rewards', activeLang)}
                  className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 mt-2"
                >
                  + Ajouter une récompense
                </button>
              </div>
            </div>
          )}

          {/* Onglet Jury */}
          {activeTab === 'jury' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.jury?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('jury', activeLang, 'title', e.target.value)}
                  placeholder="Notre Jury"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Description</label>
                  <span className="text-xs text-gray-400">
                    {content.jury?.[activeLang]?.description?.length || 0} caractères
                  </span>
                </div>
                <textarea
                  value={content.jury?.[activeLang]?.description || ''}
                  onChange={(e) => updateField('jury', activeLang, 'description', e.target.value)}
                  placeholder="Description du jury..."
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                />
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Membres du Jury</h3>
                  <button
                    onClick={() => addJuryMember(activeLang)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                  >
                    + Ajouter un membre
                  </button>
                </div>

                <div className="space-y-6">
                  {(content.jury?.[activeLang]?.members || []).map((member, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Membre #{index + 1}</h4>
                        <button
                          onClick={() => removeJuryMember(activeLang, index)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom</label>
                          <input
                            type="text"
                            value={member.name || ''}
                            onChange={(e) => updateJuryMember(activeLang, index, 'name', e.target.value)}
                            placeholder="Philippe Etchebest"
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Titre/Profession</label>
                          <input
                            type="text"
                            value={member.title || ''}
                            onChange={(e) => updateJuryMember(activeLang, index, 'title', e.target.value)}
                            placeholder="Chef Cuisinier"
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                        </div>
                      </div>

                      <ImageUpload
                        currentImageUrl={member.image || ''}
                        onUploadComplete={(url) => updateJuryMember(activeLang, index, 'image', url)}
                        label="Photo du membre"
                      />
                    </div>
                  ))}

                  {(!content.jury?.[activeLang]?.members || content.jury[activeLang].members.length === 0) && (
                    <div className="text-center py-8 text-gray-400">
                      <Users size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Aucun membre ajouté</p>
                      <p className="text-sm">Cliquez sur "Ajouter un membre" pour commencer</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Onglet Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.contact?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('contact', activeLang, 'title', e.target.value)}
                  placeholder="Contact"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={content.contact?.[activeLang]?.phone || ''}
                    onChange={(e) => updateField('contact', activeLang, 'phone', e.target.value)}
                    placeholder="+06 36 65 65 65"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={content.contact?.[activeLang]?.email || ''}
                    onChange={(e) => updateField('contact', activeLang, 'email', e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <textarea
                  value={content.contact?.[activeLang]?.address || ''}
                  onChange={(e) => updateField('contact', activeLang, 'address', e.target.value)}
                  placeholder="155 rue Peyssonnel&#10;Marseille 13002"
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL Google Maps (embed)</label>
                <input
                  type="url"
                  value={content.contact?.[activeLang]?.mapUrl || ''}
                  onChange={(e) => updateField('contact', activeLang, 'mapUrl', e.target.value)}
                  placeholder="https://www.google.com/maps?q=..."
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>
            </div>
          )}

          {/* Onglet Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={content.timeline?.[activeLang]?.title || ''}
                  onChange={(e) => updateField('timeline', activeLang, 'title', e.target.value)}
                  placeholder="Chronologie"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                />
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Phases de la Timeline</h3>
                  <button
                    onClick={() => addArrayItem('timeline', activeLang)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                  >
                    + Ajouter une phase
                  </button>
                </div>

                <div className="space-y-6">
                  {(content.timeline?.[activeLang]?.phases || []).map((phase, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Phase #{index + 1}</h4>
                        <button
                          onClick={() => removeArrayItem('timeline', activeLang, index)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Clé (identifiant unique)</label>
                          <input
                            type="text"
                            value={phase.key || ''}
                            onChange={(e) => updateTimelinePhase(activeLang, index, 'key', e.target.value)}
                            placeholder="registrations"
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                          <p className="text-xs text-gray-400 mt-1">Ex: registrations, deliberation, festival</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Label</label>
                          <input
                            type="text"
                            value={phase.label || ''}
                            onChange={(e) => updateTimelinePhase(activeLang, index, 'label', e.target.value)}
                            placeholder="INSCRIPTIONS"
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Date de début</label>
                          <input
                            type="date"
                            value={phase.startDate || ''}
                            onChange={(e) => updateTimelinePhase(activeLang, index, 'startDate', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Date de fin</label>
                          <input
                            type="date"
                            value={phase.endDate || ''}
                            onChange={(e) => updateTimelinePhase(activeLang, index, 'endDate', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium">Description</label>
                          <span className="text-xs text-gray-400">
                            {phase.description?.length || 0} caractères
                          </span>
                        </div>
                        <textarea
                          value={phase.description || ''}
                          onChange={(e) => updateTimelinePhase(activeLang, index, 'description', e.target.value)}
                          placeholder="Description de cette phase..."
                          rows={3}
                          className="w-full px-4 py-2 bg-gray-600 text-white rounded resize-none"
                        />
                      </div>
                    </div>
                  ))}

                  {(!content.timeline?.[activeLang]?.phases || content.timeline[activeLang].phases.length === 0) && (
                    <div className="text-center py-8 text-gray-400">
                      <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Aucune phase ajoutée</p>
                      <p className="text-sm">Cliquez sur "Ajouter une phase" pour commencer</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  💡 <strong>Conseil :</strong> Les phases s'affichent dans l'ordre sur la page d'accueil. 
                  Utilisez des clés cohérentes (ex: registrations, deliberation, festival).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
