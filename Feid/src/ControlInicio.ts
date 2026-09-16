import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ControlInicio',

  schema: {
    boton: ecs.eid,
    mensaje: ecs.eid,
    miniJuego: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .onEnter(() => {

        const {boton} = schemaAttribute.get(eid)

        world.events.addListener(
          boton,
          ecs.input.UI_CLICK,
          () => {

            const {mensaje, miniJuego} = schemaAttribute.get(eid)

            // Ocultar mensaje
            ecs.Scale.set(world, mensaje, {
              x: 0,
              y: 0,
              z: 0,
            })

            // Ocultar botón
            ecs.Scale.set(world, boton, {
              x: 0,
              y: 0,
              z: 0,
            })

            // Mostrar mini-juego
            ecs.Scale.set(world, miniJuego, {
              x: 1,
              y: 1,
              z: 1,
            })

            console.log('🔥 MINI-JUEGO ACTIVADO')
          }
        )
      })
  },
})