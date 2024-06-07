import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const title = 'Fight Result';
    const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
    bodyElement.textContent = `${fighter.name} is the winner!`;

    const imageElement = createElement({ tagName: 'img', attributes: { src: fighter.source } });
    bodyElement.append(imageElement);

    showModal({ title, bodyElement });

}
