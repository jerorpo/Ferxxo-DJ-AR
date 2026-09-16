import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'BotonEmpezar',

  schema: {
    mensaje: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {

        const {mensaje} = schemaAttribute.get(eid)

        ecs.Scale.set(world, mensaje, {
          x: 0,
          y: 0,
          z: 0,
        })

        ecs.Scale.set(world, eid, {
          x: 0,
          y: 0,
          z: 0,
        })

        console.log('EMPEZAR FUNCIONÓ')
      })
  },
})