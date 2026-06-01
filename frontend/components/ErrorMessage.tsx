import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <p>{message}</p>
        {onRetry && (
          <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
