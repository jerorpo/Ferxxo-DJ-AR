import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ControlMiniJuego',

  schema: {
    consola: ecs.eid,
    controles: ecs.eid,
    disco: ecs.eid,
    escenario: ecs.eid,
    personaje: ecs.eid,
    botonSpotify: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    let objetosCompletados = 0

    ecs.defineState('jugando')
      .initial()

      .onEnter(() => {

        const {
          escenario,
          personaje,
          botonSpotify,
        } = schemaAttribute.get(eid)

        // Ocultar escenario
        ecs.Scale.set(world, escenario, {
          x: 0,
          y: 0,
          z: 0,
        })

        // Ocultar personaje
        ecs.Scale.set(world, personaje, {
          x: 0,
          y: 0,
          z: 0,
        })

        // Ocultar botón de Spotify
        ecs.Scale.set(world, botonSpotify, {
          x: 0,
          y: 0,
          z: 0,
        })
      })

      .listen(
        eid,
        'OBJETO_DJ_TOCADO',
        (event) => {

          const data = event.data as {objeto: bigint}
          const objeto = data.objeto

          const {
            consola,
            controles,
            disco,
          } = schemaAttribute.get(eid)

          // Comprobar que sea uno de los 3 objetos
          if (
            objeto !== consola &&
            objeto !== controles &&
            objeto !== disco
          ) {
            return
          }

          // Ocultar objeto tocado
          ecs.Scale.set(world, objeto, {
            x: 0,
            y: 0,
            z: 0,
          })

          objetosCompletados++

          console.log(
            '🎧 Objeto arreglado:',
            objetosCompletados
          )

          // Cuando los 3 estén arreglados
          if (objetosCompletados >= 3) {

            console.log('🎉 ¡MESA ARREGLADA!')

            const {
              escenario,
              personaje,
              botonSpotify,
            } = schemaAttribute.get(eid)

            // Ocultar mini-juego
            ecs.Scale.set(world, eid, {
              x: 0,
              y: 0,
              z: 0,
            })

            // Mostrar escenario con su escala original
            ecs.Scale.set(world, escenario, {
              x: 0.04,
              y: 0.04,
              z: 0.04,
            })

            // Mostrar personaje con su escala original
            ecs.Scale.set(world, personaje, {
              x: 0.517,
              y: 0.517,
              z: 0.517,
            })

            // Mostrar botón de Spotify
            ecs.Scale.set(world, botonSpotify, {
              x: 2,
              y: 2,
              z: 2,
            })

            console.log('🎤 ESCENARIO Y FERXXO ACTIVADOS')
            console.log('🎵 BOTÓN SPOTIFY ACTIVADO')
          }
        }
      )
  },
})