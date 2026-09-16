import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ControlMiniJuego',

  schema: {
    consola: ecs.eid,
    controles: ecs.eid,
    disco: ecs.eid,
    escenario: ecs.eid,
    personaje: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    let objetosCompletados = 0

    ecs.defineState('jugando')
      .initial()

      .onEnter(() => {

        const {
          escenario,
          personaje,
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

          // Comprobar que sea uno de nuestros objetos
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
            } = schemaAttribute.get(eid)

            // Ocultar mini-juego
            ecs.Scale.set(world, eid, {
              x: 0,
              y: 0,
              z: 0,
            })

            // Mostrar escenario
            ecs.Scale.set(world, escenario, {
              x: 1,
              y: 1,
              z: 1,
            })

            // Mostrar personaje
            ecs.Scale.set(world, personaje, {
              x: 1,
              y: 1,
              z: 1,
            })
          }
        }
      )
  },
})