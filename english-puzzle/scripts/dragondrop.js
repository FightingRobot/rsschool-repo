function setDragondrop() {
    let pieces = document.querySelectorAll('.puzzle-piece');

    for (let piece of pieces) {
        piece.onmousedown = function startDD(event) {
            let shiftX = event.clientX - piece.getBoundingClientRect().left;
            let shiftY = event.clientY - piece.getBoundingClientRect().top;

            piece.style.position = 'absolute';
            piece.style.zIndex = 1000;
            document.body.append(piece);

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                piece.style.left = pageX - shiftX + 'px';
                piece.style.top = pageY - shiftY + 'px';
            }

            // let currentDroppable = document.querySelector('.playboard__sentence_active');
            let currentDroppable = document.querySelector('.playboard__sentence_active');
            // this.currentDroppable = document.querySelector('.playboard__sentence_active');
            // let currentDroppable = none;

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);

                piece.style.display = 'none';
                let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                piece.style.display = 'flex';

                if (!elemBelow) return;

                let droppableBelow = elemBelow.closest('.playboard__sentence_active');

                if (currentDroppable != droppableBelow) {
                    if (currentDroppable) {
                        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
                        // leaveDroppable(currentDroppable);
                        currentDroppable.style.backgroundColor = '#C030C0';
                    }
                    currentDroppable = droppableBelow;
                    if (currentDroppable) {
                        // логика обработки процесса, когда мы "влетаем" в элемент droppable
                        // enterDroppable(currentDroppable);
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