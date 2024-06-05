import createElement from '../helpers/domHelper';
import { getFighterInfo } from '../components/fighterSelector';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    console.log(fighter._id);
    // todo: show fighter info (image, name, health, etc.)

    getFighterInfo(fighter._id)
        .then(fighterInfo => {
            const { name, health, attack, defense, source } = fighterInfo;

            const imgElement = createElement({
                tagName: 'img',
                className: 'fighter-image',
                src: source
            });

            const nameElement = createElement({
                tagName: 'span',
                className: 'fighter-name',
                content: `Name: ${name}`
            });

            const healthElement = createElement({
                tagName: 'span',
                className: 'fighter-health',
                content: `Health: ${health}`
            });

            const attackElement = createElement({
                tagName: 'span',
                className: 'fighter-attack',
                content: `Attack: ${attack}`
            });

            const defenseElement = createElement({
                tagName: 'span',
                className: 'fighter-defense',
                content: `Defense: ${defense}`
            });

            fighterElement.append(imgElement, nameElement, healthElement, attackElement, defenseElement);
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
