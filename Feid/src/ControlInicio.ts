import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ControlInicio',

  schema: {
    boton: ecs.eid,
    mensaje: ecs.eid,
    escenario: ecs.eid,
    personaje: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .onEnter(() => {

        const {escenario, personaje, boton} = schemaAttribute.get(eid)

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

        // Escuchar el botón
        world.events.addListener(
          boton,
          ecs.input.UI_CLICK,
          () => {

            const {mensaje} = schemaAttribute.get(eid)

            // Ocultar el texto correctamente
            ecs.Ui.set(world, mensaje, {
              display: 'none',
            })

            // Ocultar el botón
            ecs.Scale.set(world, boton, {
              x: 0,
              y: 0,
              z: 0,
            })

            console.log('🔥 EMPEZÓ EL JUEGO')
          }
        )
      })
  },
})