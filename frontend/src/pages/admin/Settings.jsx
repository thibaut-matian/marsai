import { Calendar, Info, Mail, MapPin, Phone, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';

export default function Settings() {
  const {
    settings,
    isLoading,
    isSaving,
    message,
    handleChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    handleFileChange,
    saveSettings,
  } = useSettings();

  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Upload },
    { id: 'about', label: 'À propos', icon: Info },
    { id: 'criteria', label: 'Critères', icon: Info },
    { id: 'rewards', label: 'Récompenses', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'festival', label: 'Festival', icon: Calendar },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Paramètres du site</h1>
          <p className="text-white mt-1">Gérez le contenu de la page d'accueil</p>
        </div>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="btn-custom-glass flex gap-2 justify-center items-center"
        >
          {isSaving ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Enregistrement...
            </>
          ) : (
            <>
              <Save size={18} />
              Enregistrer
            </>
          )}
        </button>
      </div>

      {/* Message de retour */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-6`}>
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs tabs-boxed rounded-lg card-admin border mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab gap-2 ${activeTab === tab.id ? 'tab-active text-white' : 'text-white/50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card-admin rounded-lg border p-6">
        
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Section Hero</h2>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Titre principal</span>
              </label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="Ex: Bienvenue au MARS AI Film Festival"
                className="input input-bordered bg-black/40 w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Sous-titre</span>
              </label>
              <textarea
                value={settings.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                placeholder="Ex: Le premier festival dédié aux films créés avec l'IA"
                className="textarea textarea-bordered bg-black/40 w-full h-24"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Texte bouton CTA</span>
              </label>
              <input
                type="text"
                value={settings.heroCTA}
                onChange={(e) => handleChange('heroCTA', e.target.value)}
                placeholder="Ex: Soumettre un film"
                className="input input-bordered bg-black/40 w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Vidéo de fond</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange('heroVideo', e.target.files[0])}
                className="file-input file-input-bordered file-input-neutral bg-black/40 w-full"
              />
              <label className="label">
                <span className="label-text-alt">Format MP4 recommandé, max 50MB</span>
              </label>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Section À propos</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Titre de section</span>
              </label>
              <input
                type="text"
                value={settings.aboutTitle}
                onChange={(e) => handleChange('aboutTitle', e.target.value)}
                placeholder="Ex: À propos du festival"
                className="input input-bordered bg-black/40 w-full"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Paragraphe 1</span>
                </label>
                <textarea
                  value={settings.aboutText1}
                  onChange={(e) => handleChange('aboutText1', e.target.value)}
                  className="textarea textarea-bordered bg-black/40 w-full h-32"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Paragraphe 2</span>
                </label>
                <textarea
                  value={settings.aboutText2}
                  onChange={(e) => handleChange('aboutText2', e.target.value)}
                  className="textarea textarea-bordered bg-black/40 w-full h-32"
                />
              </div>
            </div>
          </div>
        )}

        {/* CRITERIA SECTION */}
        {activeTab === 'criteria' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Critères de sélection</h2>
              <button
                onClick={() => addArrayItem('criteriaList')}
                className="btn btn-sm btn-outline gap-2"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Titre de section</span>
              </label>
              <input
                type="text"
                value={settings.criteriaTitle}
                onChange={(e) => handleChange('criteriaTitle', e.target.value)}
                placeholder="Ex: Critères de sélection"
                className="input input-bordered bg-black/40 w-full"
              />
            </div>

            <div className="space-y-3">
              {settings.criteriaList.map((criteria, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={criteria}
                    onChange={(e) => handleArrayChange('criteriaList', index, e.target.value)}
                    placeholder={`Critère ${index + 1}`}
                    className="input input-bordered bg-black/40 flex-1"
                  />
                  <button
                    onClick={() => removeArrayItem('criteriaList', index)}
                    className="btn btn-square btn-outline btn-error"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REWARDS SECTION */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Récompenses</h2>
              <button
                onClick={() => addArrayItem('rewardsList')}
                className="btn btn-sm btn-outline gap-2"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Titre de section</span>
              </label>
              <input
                type="text"
                value={settings.rewardsTitle}
                onChange={(e) => handleChange('rewardsTitle', e.target.value)}
                placeholder="Ex: Les récompenses"
                className="input input-bordered bg-black/40 w-full"
              />
            </div>

            <div className="space-y-3">
              {settings.rewardsList.map((reward, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={reward}
                    onChange={(e) => handleArrayChange('rewardsList', index, e.target.value)}
                    placeholder={`Récompense ${index + 1}`}
                    className="input input-bordered bg-black/40 flex-1"
                  />
                  <button
                    onClick={() => removeArrayItem('rewardsList', index)}
                    className="btn btn-square btn-outline btn-error"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT SECTION */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Informations de contact</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Phone size={16} />
                    Téléphone
                  </span>
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="contact@marsai.com"
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <MapPin size={16} />
                    Adresse
                  </span>
                </label>
                <input
                  type="text"
                  value={settings.contactAddress}
                  onChange={(e) => handleChange('contactAddress', e.target.value)}
                  placeholder="155 rue Peyssonnel"
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Ville</span>
                </label>
                <input
                  type="text"
                  value={settings.contactCity}
                  onChange={(e) => handleChange('contactCity', e.target.value)}
                  placeholder="Marseille"
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Code postal</span>
                </label>
                <input
                  type="text"
                  value={settings.contactZipcode}
                  onChange={(e) => handleChange('contactZipcode', e.target.value)}
                  placeholder="13002"
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">URL Google Maps</span>
                </label>
                <input
                  type="text"
                  value={settings.contactMapUrl}
                  onChange={(e) => handleChange('contactMapUrl', e.target.value)}
                  placeholder="https://www.google.com/maps?q=..."
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* FESTIVAL INFO */}
        {activeTab === 'festival' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Informations du festival</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Nom du festival</span>
                </label>
                <input
                  type="text"
                  value={settings.festivalName}
                  onChange={(e) => handleChange('festivalName', e.target.value)}
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Année</span>
                </label>
                <input
                  type="number"
                  value={settings.festivalYear}
                  onChange={(e) => handleChange('festivalYear', e.target.value)}
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Date de début</span>
                </label>
                <input
                  type="date"
                  value={settings.festivalDateStart}
                  onChange={(e) => handleChange('festivalDateStart', e.target.value)}
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Date de fin</span>
                </label>
                <input
                  type="date"
                  value={settings.festivalDateEnd}
                  onChange={(e) => handleChange('festivalDateEnd', e.target.value)}
                  className="input input-bordered bg-black/40 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}