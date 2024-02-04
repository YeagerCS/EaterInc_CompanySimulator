import React, { useRef, useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, children }) {
    function dragDiv(elemId, mapContainerRef = null){
        const mapDiv = document.getElementById(elemId);
        
        let isDragging = false;
        let mouseX = 0;
        let mouseY = 0;
        let offsetX = 0;
        let offsetY = 0;
        
        const handleMouseDown = (e) => {
            isDragging = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            offsetX = parseInt(window.getComputedStyle(mapDiv).left, 10);
            offsetY = parseInt(window.getComputedStyle(mapDiv).top, 10);
        };
        
        const handleMouseMove = (e) => {
            if (isDragging && !isMouseOverMap(e)) {
                const deltaX = e.clientX - mouseX;
                const deltaY = e.clientY - mouseY;
                mapDiv.style.left = `${offsetX + deltaX}px`;
                mapDiv.style.top = `${offsetY + deltaY}px`;
            }
        };
        
        const handleMouseUp = () => {
            isDragging = false;
        };
        
        const isMouseOverMap = (e) => {
            let mapContainer;
            if(mapContainerRef){
                mapContainer = mapContainerRef.current;
            } else{
                return false
            }
            const rect = mapContainer.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            return (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            );
        };
    
      mapDiv.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    
      return () => {
        mapDiv.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
      

  useEffect(() => {
    dragDiv("drag-content")
  }, [])    
  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content" id='drag-content'>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
