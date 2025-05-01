import React from 'react'

export default function SpinnerButton({ processing, CssClass, ButtonText, Type }) {
    return (
        <>

            <div className="text-center">
                <button type={Type} className={"btn " + CssClass}
                    disabled={processing}

                >
                    {processing && (
                        <span className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true">
                        </span>
                    )}
                    {ButtonText}
                </button>
            </div>
        </>
    )
}
