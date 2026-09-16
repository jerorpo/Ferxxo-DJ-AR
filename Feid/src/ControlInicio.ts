import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'ControlInicio',

  schema: {
    boton: ecs.eid,
    mensaje: ecs.eid,
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
            const {mensaje} = schemaAttribute.get(eid)

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

            console.log('🔥 EMPEZAR PRESIONADO')
          }
        )
      })
  },
})
