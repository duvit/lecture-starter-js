import createElement from '../helpers/domHelper';
import { getFighterInfo } from '../components/fighterSelector';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    getFighterInfo(fighter._id)
        .then(fighterInfo => {
            const { name, health, attack, defense, source } = fighterInfo;

            const previewElement = createElement({
                tagName: 'div',
                className: `fighter-preview___container`
            });

            const imgElement = createFighterImage(fighter);

            const nameElement = createElement({
                tagName: 'span',
                className: 'fighter-prewiev__name'
            });
            nameElement.textContent = `${name}`;

            const healthElement = createElement({
                tagName: 'span',
                className: 'fighter-prewiev__health'
            });
            healthElement.textContent = `Health: ${health}`;

            const attackElement = createElement({
                tagName: 'span',
                className: 'fighter-prewiev__attack',
                content: `Attack: ${attack}`
            });
            attackElement.textContent = `Attack: ${attack}`;

            const defenseElement = createElement({
                tagName: 'span',
                className: 'fighter-prewiev__defense',
                content: `Defense: ${defense}`
            });
            defenseElement.textContent = `Defense: ${defense}`;

            previewElement.prepend(nameElement);
            previewElement.append(imgElement, healthElement, attackElement, defenseElement);
            fighterElement.append(previewElement);
        })
        .catch(error => {
            throw error;
        });

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

// const fighterInfo = getFighterInfo(3);
// console.log(fighterInfo)
