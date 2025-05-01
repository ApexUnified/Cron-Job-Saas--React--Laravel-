import React from 'react'

export default function Modal({ modalBody, modalHeader, modalFooter, isHidden = null }) {
    return (
        <>

            <div className={`modal fade ${isHidden}`} id="dynamic_modal" tabindex="-1" aria-labelledby="dynamic_modal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="dynamic_modal">{modalHeader}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalBody}
                        </div>
                        <div className="modal-footer">
                            {modalFooter}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
