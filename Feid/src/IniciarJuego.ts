import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'IniciarJuego',

  schema: {
    mensaje: ecs.eid,
    boton: ecs.eid,
    escenario: ecs.eid,
    personaje: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {

    ecs.defineState('inicio')
      .initial()
      .onEnter(() => {

        const {escenario, personaje} = schemaAttribute.get(eid)

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
      .listen(eid, ecs.input.SCREEN_TOUCH_START, () => {

        const {mensaje, boton} = schemaAttribute.get(eid)

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

        console.log('¡EMPEZÓ EL MINI-JUEGO!')
      })
  },
})
