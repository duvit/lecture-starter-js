import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let fighterOneHealth = firstFighter.health;
        let fighterTwoHealth = secondFighter.health;

        const fighterOneCriticalHitKeys = new Set(controls.PlayerOneCriticalHitCombination);
        const fighterTwoCriticalHitKeys = new Set(controls.PlayerTwoCriticalHitCombination);

        let fighterOneCriticalHitTimeout = false;
        let fighterTwoCriticalHitTimeout = false;

        const keydownHandler = event => {
            if (event.code === controls.PlayerOneAttack && !firstFighter.block) {
                if (!secondFighter.block) {
                    const damage = getDamage(firstFighter, secondFighter);
                    fighterTwoHealth -= damage;
                    updateHealthBar('right', fighterTwoHealth, secondFighter.health);
                }
            }

            if (event.code === controls.PlayerTwoAttack && !secondFighter.block) {
                if (!firstFighter.block) {
                    const damage = getDamage(secondFighter, firstFighter);
                    fighterOneHealth -= damage;
                    updateHealthBar('left', fighterOneHealth, firstFighter.health);
                }
            }

            if (event.code === controls.PlayerOneBlock) {
                firstFighter.block = true;
            }

            if (event.code === controls.PlayerTwoBlock) {
                secondFighter.block = true;
            }

            if (fighterOneCriticalHitKeys.has(event.code)) {
                fighterOneCriticalHitKeys.delete(event.code);
                if (fighterOneCriticalHitKeys.size === 0 && !fighterOneCriticalHitTimeout) {
                    fighterTwoHealth -= firstFighter.attack * 2;
                    updateHealthBar('right', fighterTwoHealth, secondFighter.health);
                    fighterOneCriticalHitTimeout = true;
                    setTimeout(() => (fighterOneCriticalHitTimeout = false), 10000);
                }
            }

            if (fighterTwoCriticalHitKeys.has(event.code)) {
                fighterTwoCriticalHitKeys.delete(event.code);
                if (fighterTwoCriticalHitKeys.size === 0 && !fighterTwoCriticalHitTimeout) {
                    fighterOneHealth -= secondFighter.attack * 2;
                    updateHealthBar('left', fighterOneHealth, firstFighter.health);
                    fighterTwoCriticalHitTimeout = true;
                    setTimeout(() => (fighterTwoCriticalHitTimeout = false), 10000);
                }
            }

            if (fighterOneHealth <= 0 || fighterTwoHealth <= 0) {
                document.removeEventListener('keydown', keydownHandler);
                document.removeEventListener('keyup', keyupHandler);
                const winner = fighterOneHealth > 0 ? firstFighter : secondFighter;
                resolve(winner);
            }
        };

        const keyupHandler = event => {
            if (event.code === controls.PlayerOneBlock) {
                firstFighter.block = false;
            }

            if (event.code === controls.PlayerTwoBlock) {
                secondFighter.block = false;
            }

            if (fighterOneCriticalHitKeys.has(event.code)) {
                fighterOneCriticalHitKeys.add(event.code);
            }

            if (fighterTwoCriticalHitKeys.has(event.code)) {
                fighterTwoCriticalHitKeys.add(event.code);
            }
        };

        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
    });
}

export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    return Math.max(0, hitPower - blockPower);
}

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1; 
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1; 
    return fighter.defense * dodgeChance;
}

function updateHealthBar(position, currentHealth, initialHealth) {
    const healthBar = document.getElementById(`${position}-fighter-indicator`);
    if (healthBar) {
        const healthPercentage = (currentHealth / initialHealth) * 100;
        healthBar.style.width = `${healthPercentage}%`;
    }
}
