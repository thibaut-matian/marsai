import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

/**
 * Composant Toast réutilisable
 * @param {Object} props
 * @param {string} props.type - Type de toast: 'success', 'error', 'warning', 'info'
 * @param {string} props.message - Message à afficher
 * @param {boolean} props.show - Contrôle l'affichage du toast
 */
export default function Toast({ type = 'info', message, show }) {
  if (!show) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  };

  const alertClasses = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  return (
    <div className="toast toast-end toast-bottom z-50">
      <div className={`alert ${alertClasses[type]} shadow-lg`}>
        {icons[type]}
        <span>{message}</span>
      </div>
    </div>
  );
}
