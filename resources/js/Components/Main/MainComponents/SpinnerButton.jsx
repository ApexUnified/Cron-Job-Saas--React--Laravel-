import React from 'react'

export default function SpinnerButton({ processing, CssClass, ButtonText, ButtonIcon, Type, Action }) {
    return (
        <>

            <button type={Type} className={"btn " + CssClass}
                disabled={processing}
                onClick={Action}
            >
                {processing && (
                    <span className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true">
                    </span>
                )}
                {!processing && ButtonIcon}
                {ButtonText}
            </button>
        </>
    )
}
