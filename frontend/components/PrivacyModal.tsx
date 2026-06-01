'use client';

import Modal from './Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Tratamiento de Datos Personales" size="lg">
      <div className="privacy-modal-content">
        <div className="privacy-section">
          <h3>1. Responsable del Tratamiento</h3>
          <div className="privacy-info-card">
            <p><strong>Razón Social:</strong> Amargo Studios</p>
            <p><strong>Email:</strong> amargostudios@gmail.com</p>
            <p><strong>Ubicación:</strong> Medellín, Colombia</p>
          </div>
        </div>

        <div className="privacy-section">
          <h3>2. Finalidad del Tratamiento</h3>
          <p>
            Los datos personales recolectados a través de nuestros formularios de contacto serán utilizados
            exclusivamente para:
          </p>
          <ul>
            <li>Responder a solicitudes de cotización y consultas sobre nuestros servicios</li>
            <li>Gestionar la relación comercial con clientes potenciales y actuales</li>
            <li>Enviar información relevante sobre nuestros servicios audiovisuales</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h3>3. Derechos del Titular</h3>
          <p>
            Conforme a la Ley 1581 de 2012, usted tiene derecho a conocer, actualizar, rectificar y
            suprimir sus datos personales. Para ejercer estos derechos, contáctenos en amargostudios@gmail.com
          </p>
        </div>

        <div className="privacy-section mt-md">
          <p><small>Última actualización: Enero 2026</small></p>
        </div>
      </div>
    </Modal>
  );
}
