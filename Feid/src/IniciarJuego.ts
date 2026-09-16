import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'IniciarJuego',

  schema: {
    mensaje: ecs.eid,
    boton: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .listen(eid, ecs.input.SCREEN_TOUCH_START, () => {

        const {mensaje, boton} = schemaAttribute.get(eid)

        ecs.Scale.set(world, mensaje, {
          x: 0,
          y: 0,
          z: 0,
        })

        ecs.Scale.set(world, boton, {
          x: 0,
          y: 0,
          z: 0,
        })

        console.log('BOTÓN FUNCIONÓ')
      })
  },
})