import { useEffect, useState } from 'react'
import { Pokemon } from '../../logic/pokemon'
import '../styles/PokemonPanels.css'
import { imagePathsNew } from '../../utils/constants'
import { Game } from '../../logic/game'

const IMAGE_PATHS = imagePathsNew

export function PokemonAllyPanel( { game, pokemon }: { game: Game, pokemon: Pokemon } ) {

  const [name, setName] = useState<string>('')
  const [level, setLevel] = useState<number>(0)
  const [health, setHealth] = useState<number>(0)
  const [currentHealth, setCurrentHP] = useState<number>(0)
  const [healthPorcentage, setHealthPorcentage] = useState<number>(0)
  const [experiencePorcentage, setExperiencePorcentage] = useState<number>(0)

  game.interfaceManager.addSetters('level', setLevel)
  game.interfaceManager.addSetters('exp', setExperiencePorcentage) // FIXME: No funciona

  useEffect( () => { // Actualizaciones iniciales unicas
    setHealthPorcentage(pokemon.currentHp / pokemon.getStats().hp * 100)
    setExperiencePorcentage(pokemon.currentXp / pokemon.getNextLevelXp() * 100)
  }, [])

  useEffect( () => { // Actualizacion durante batalla - level up o daño
    setName(pokemon.name)
    setLevel(pokemon.level)
    setHealth(pokemon.getStats().hp)
    setCurrentHP(pokemon.currentHp)
    setExperiencePorcentage(pokemon.currentXp / pokemon.getNextLevelXp() * 100)
  }, [pokemon.name, pokemon.level, pokemon.currentHp, pokemon.currentXp])

  return (
    <div
    className='pokemon-panel'
    id='pokemon-ally-panel'>
      <img
        id="ally-panel"
        className="panel"
        src={IMAGE_PATHS.allyPokPanelImgPath}
        alt='Ally Panel'
      />

      <p id='name'>{name}</p>
      <p id='level'>Lv{level}</p>

      <div className="health-bar" id='health-bar'>
        <div className="default-health-bar"></div>
        <div className="current-health-bar" 
             id='ally-current-health-bar' style={{width: healthPorcentage + '%'}}></div>
      </div>
      <p id='health'>{currentHealth}/{health}</p>

      <div className='experience-bar'>
        <div className='current-experience-bar'
             id='ally-current-experience-bar' style={{width: experiencePorcentage + '%'}}></div>
      </div>

    </div>
  )
}