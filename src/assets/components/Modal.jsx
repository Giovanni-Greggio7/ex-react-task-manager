// Importa createPortal per renderizzare il componente al di fuori del DOM gerarchico corrente
import { createPortal } from 'react-dom'

// Componente Modal che riceve props per titolo, contenuto, visibilità e callback
export default function Modal({ title, content, show, onClose, onConfirm }) {

    // Se la modale non deve essere visibile, non renderizza nulla
    if (!show) return null

    // Usa createPortal per montare la modale nel body del documento, indipendentemente dalla gerarchia dei componenti
    return createPortal(

        // Struttura Bootstrap per una modale centrata
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow">
                    {/* Intestazione della modale con titolo e pulsante di chiusura */}
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    {/* Corpo della modale, mostra il contenuto passato come prop */}
                    <div className="modal-body">
                        {content}
                    </div>
                    {/* Footer con pulsanti di annullamento e conferma */}
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Conferma</button>
                    </div>
                </div>
            </div>
        </div>,

        // Monta il contenuto direttamente nel body del documento
        document.body
    )
}