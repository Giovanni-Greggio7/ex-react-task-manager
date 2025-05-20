import { createPortal } from 'react-dom'

export default function Modal({ title, content, show, onClose, onConfirm }) {

    if(!show) return null

    return createPortal(

        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
                        <button className="btn btn-danger" onClick={onConfirm}>Conferma</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}