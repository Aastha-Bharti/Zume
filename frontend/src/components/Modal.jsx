import React from 'react'
import { modalStyles as Styles } from '../assets/dummystyle'
import { X } from 'lucide-react'

const Modal = ( { children, hideHeader, isOpen, onClose ,title, showActionBtn, actionBtnIcon = null, actionBtnText, onActionClick = () => {} }) => {

  if (!isOpen) return null 
  
  return (
    <div className={Styles.overlay}>
      <div className={Styles.container}>
        { !hideHeader && (
          <div className={Styles.header}>
            <h3 className={Styles.title}> {title} </h3>

            {showActionBtn && (
              <button className={Styles.actionButton} onClick={onActionClick}>
                  {actionBtnIcon}
                  {actionBtnText}
              </button>
            )}
          </div>
        )}

        <button type='button' className={Styles.closeButton} onClick={onClose}>
            <X size={20}/>
        </button>
        <div className= {Styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal