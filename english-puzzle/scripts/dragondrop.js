function setDragondrop() {
  const pieces = document.querySelectorAll('.puzzle-piece');
  const piecesArea = document.querySelectorAll('.game-screen__puzzle-pieces');

  for (const piece of pieces) {
    piece.onmousedown = function startDD(event) {
      const shiftX = event.clientX - piece.getBoundingClientRect().left;
      const shiftY = event.clientY - piece.getBoundingClientRect().top;

      piece.style.position = 'absolute';
      piece.style.zIndex = 1000;
      document.body.append(piece);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        piece.style.left = `${pageX - shiftX}px`;
        piece.style.top = `${pageY - shiftY}px`;
      }

      // let currentDroppable = document.querySelector('.playboard__sentence_active');
      let currentDroppable = document.querySelector('.playboard__sentence_active');
      // this.currentDroppable = document.querySelector('.playboard__sentence_active');
      // let currentDroppable = none;

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        piece.style.display = 'none';
        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        piece.style.display = 'flex';

        if (!elemBelow) return;

        const droppableBelow = elemBelow.closest('.playboard__sentence_active');

        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            currentDroppable.style.backgroundColor = '#C030C0';
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            currentDroppable.style.backgroundColor = '#C056C0';
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      piece.onmouseup = function endDD() {
        try {
          document.removeEventListener('mousemove', onMouseMove);
          piece.onmouseup = null;

          currentDroppable.append(piece);
          piece.style.position = 'static';
        } catch {

        }
      };
    };
  }
}

export default setDragondrop;
